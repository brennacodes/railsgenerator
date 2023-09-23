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
  }

  function setFilters(tableType) {
    switch (tableType) {
      case "DDL":
        toFilter = ["--", "CREATE UNIQUE", "CREATE INDEX", "CREATE SEQUENCE", "ALTER SEQUENCE", "COMMENT ON COLUMN"];
        break;
      case "PostgreSQL":
        toFilter;
        break;
      default:
        toFilter;
    }
  }

  function filterLines(lines) {
    return lines.filter(line => {
      return !(toFilter.some(filter => line.startsWith(filter)));
    });
  }

  function createDirectives(filteredLines) {
    let directives = {};
    filteredLines.forEach((line) => {
      const id = /_id$/i;
      const ddlId = /\(id\)/i;
      let splitLine = line.split(' ').map(element => element.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, ''));

      if (splitLine[0] == 'CREATE' && splitLine[1] == 'TABLE') {
        directives["table"] = splitLine[2];
      } else if (splitLine[0] == 'id') {
        null
      } else if (splitLine[0] == " " || splitLine[0] == undefined || splitLine[0] == "created_at" || splitLine[0] == "updated_at") {
        null
      } else if (id.test(splitLine[0]) || ddlId.test(splitLine[splitLine.length - 1])) {
        directives[splitLine[0].replace(/_id$/i, '')] = "references";
      } else {
        directives[splitLine[0]] = mapping[splitLine[1]];
      }

    });
    return directives;
  }

  function parseSQL(sql, type, generator) {
    setFilters(type);

    const lines = sql.split('\n');

    // Filter out lines that start with "COMMENT ON COLUMN" or "ALTER TABLE"
    const filteredLines = filterLines(lines)
      .filter(element => element !== '')
      .map(element => element.trimLeft())
      .filter(element => /[a-zA-Z]/.test(element));

    let directives = createDirectives(filteredLines);

    // Split the SQL into individual CREATE TABLE statements
    const generatorCommands = []
    for (const key in directives) {
      if (key == 'table') {
        let beginning = `rails generate ${generator} ${directives[key].substring(0, directives[key].length - 1)}`;
        generatorCommands.push(beginning);
      } else {
        let ending = `${key}:${directives[key]}`;
        generatorCommands.push(ending);
      }
    };
    return generatorCommands.join(' ');
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
