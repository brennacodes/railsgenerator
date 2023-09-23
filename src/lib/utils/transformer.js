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
    const directive = [];
    line.forEach((string) => {
      const id = /_id$/i;
      const ddlId = /\(id\)/i;

      let noQuotes = string.replace(/"/g, '');
      let splitString = noQuotes.split(' ');

      if (splitString[0] == 'CREATE' && splitString[1] == 'TABLE') {
        directive.push(["table", splitString[2].replace(/s$/, '')]);
      } else if (splitString[0] == 'id') {
        null
      } else if (splitString[0] == " " || splitString[0] == undefined || splitString[0] == "created_at" || splitString[0] == "updated_at") {
        null
      } else if (id.test(splitString[0]) || ddlId.test(splitString[splitString.length - 1])) {
        directive.push([splitString[0].replace(/_id$/i, ''), "references"]);
      } else {
        directive.push([splitString[0], mapping[splitString[1]]]);
      }
    })

    return directive;
  }

  function createDirectives(filteredLines) {
    let directives = [];
    filteredLines.forEach((line) => {
      const parsedLine = parseLine(line);
      let tableHash = {};
      parsedLine.forEach((element) => {
        tableHash[element[0]] = element[1];
      })
      directives.push(tableHash);
    });

    return directives;
  }

  function parseSQL(sql, type, generator) {
    setFilters(type);

    const lines = sql.split(';');

    // Filter out lines that start with "COMMENT ON COLUMN" or "ALTER TABLE"
    const filteredLines = filterLines(lines);

    let directives = createDirectives(filteredLines);

    // Split the SQL into individual CREATE TABLE statements
    const generatorCommands = []
    directives.forEach((directive) => {
      let thisCommand = '';
      for (const key in directive) {
        if (key == 'table') {
          thisCommand += `rails generate ${generator} ${directive[key]}`;
        } else {
          thisCommand += ` ${key}:${directive[key]}`;
        }
      }
      generatorCommands.push(thisCommand);
    });

    return generatorCommands
  }

  function updateStores(text) {
    userText.update(text);
  }

  export async function handleSQL(generator) {
    try {
      const text = await clipboardy.read();
      let parsed = parseSQL(text, "DDL", generator)
      updateStores(parsed);
    } catch(error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  }

  export async function handleExamples(generator) {
      const text = '';
      let parsed = parseSQL(text, "DDL", generator)
      updateStores(parsed);
  }
