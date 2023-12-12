import { userText } from "$stores/text";
// import { generator } from "$stores/generator";
import clipboardy from "clipboardy";

  let toFilter = ["ALTER TABLE", "COMMENT ON COLUMN"];

  let mapping = {
    "bigint": "integer",
    "character": "string",
    "uuid": "uuid",
    "timestamp": "timestamp",
    "boolean": "boolean",
    "text": "text",
    "integer": "integer",
    "jsonb": "jsonb",
    "float": "float",
    "date": "date",
    "datetime": "datetime",
    "decimal": "decimal",
    "binary": "binary",
    "time": "time",
    "string": "string",
    "array": "array",
  }

  let types = {
    "DBML": "\n",
    "DDL": ";",
    "PostgreSQL": ";",
  }

  function setFilters(tableType) {
    switch (tableType) {
      case "DDL":
        toFilter.push("--", "CREATE UNIQUE", "CREATE INDEX", "CREATE SEQUENCE", "ALTER SEQUENCE");
        break;
      case "PostgreSQL":
        toFilter;
        break;
      default:
        toFilter;
    }
  }

  function trimWhitespace(arr) {
    const trimmedArray = [];

    for (let i = 0; i < arr.length; i++) {
      trimmedArray.push(arr[i].trim());
    }

    return trimmedArray;
  }

  function filterLines(lines) {
    const noEmptyLines = lines.filter(line => line !== '\n');
    const filtered = noEmptyLines.map(line => {
      const noNewlines = line.replace(/\n/g, '');
      const splitLine = noNewlines.split(/[,()]/);
      const noEmptyStrings = splitLine.filter(element => element !== '');
      const trimmed = trimWhitespace(noEmptyStrings);
      if (!(toFilter.some(filter => trimmed[0].startsWith(filter)))) {
        return trimmed;
      }
    });

    const onlyTables = filtered.filter((element) => {
      return element !== undefined;
    });

    return onlyTables;
  }


  function parseLine(line) {
    let directive = [];
    line.forEach((string) => {
      const id = /_id$/i;
      const ddlId = /\(id\)/i;

      let noQuotes = string.replace(/"/g, '');
      let splitString = noQuotes.split(' ');

      if (splitString[0] == 'CREATE' && splitString[1] == 'TABLE') {
        directive.push(["table", splitString[2].replace(/s$/, '')]);
      } else if (splitString[0] == 'Table') {
        directive.push(["table", splitString[1].trim()]);
      } else if (splitString[0] == 'id') {
        null
      } else if (splitString[0] == " " || splitString[0] == undefined || splitString[0] == "created_at" || splitString[0] == "updated_at") {
        null
      } else if (id.test(splitString[0]) || ddlId.test(splitString[splitString.length - 1])) {
        directive.push([splitString[0].replace(/_id$/i, '').trim(), "references"]);
      } else {
        directive.push([splitString[0].trim(), mapping[splitString[1]]]);
      }
    });

    return directive;
  }

  function createDBMLDirectives(filteredLines) {
    let directives = [];
    filteredLines.forEach((line) => {
      const parsedLine = parseLine(line);
      parsedLine.forEach((element) => {
        if (element[1] == undefined) return;
        if (element[0] == "table") {
          directives.push(`Table ${element[1]}`);
        } else {
          directives.push(`${element[0]}:${element[1]}`);
        }
      })
    });

    return directives.join(" ");
  }

  function createDirectives(lines) {
    let directives = [];
    lines.forEach((line) => {
      const parsedLine = parseLine(line);
      let tableHash = {};
      parsedLine.forEach((element) => {
        if (element[1] == undefined) return;
        tableHash[element[0]] = element[1];
      })
      directives.push(tableHash);
    });

    return directives;
  }

  function createDirective(directive, generator) {
    let thisCommand = '';
    for (const key in directive) {
      if (key == 'table') {
        thisCommand += `rails generate ${generator} ${directive[key]}`;
      } else {
        thisCommand += ` ${key}:${directive[key]}`;
      }
    }
    return thisCommand;
  }

  function parseSQL(sql, type = "DBML", generator) {
    if (type !== "DBML") { setFilters(type); }

    const lines = sql.split(types[type]);

    // Filter out lines that start with "COMMENT ON COLUMN" or "ALTER TABLE"
    const filteredLines = filterLines(lines);

    // Split the SQL into individual CREATE TABLE statements
    const generatorCommands = []
    let directives;
    if (type == "DBML") {
      directives = createDBMLDirectives(filteredLines);
      generatorCommands.push(`rails generate ${generator} ${directives}`);
      console.log("Commands: ", generatorCommands)
      return generatorCommands;
    } else {
      directives = createDirectives(filteredLines);
      directives.forEach((directive) => {
        const thisCommand = createDirective(directive, generator);
        generatorCommands.push(thisCommand);
        return generatorCommands;
      });
    }
  }

  export function handleInput(pasted, generator) {
		try {
      let joined = parseSQL(pasted, "DBML", generator);
      userText.update(joined);
      console.log("joined: ", joined)
		} catch(error) {
      console.log("Text: ", pasted)
			console.error("Failed: ", error);
		}
  }

  export async function handleExamples(generator) {
      const text = '';
      let parsed = parseSQL(text, "DDL", generator)
      updateStores(parsed);
  }
