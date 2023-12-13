import { copyableText } from "$stores/copyable_text";

export let supportedTypes = [
  "DBML",
  "DDL",
  "PostgreSQL",
  "MySQL",
  "SQLite"
];

export let typeMapping = {
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

export function trimWhitespace(arr) {
  const trimmedArray = [];

  for (let i = 0; i < arr.length; i++) {
    trimmedArray.push(arr[i].trim());
  }

  return trimmedArray;
}

function removeEmptyStrings(lines) {
  return lines.filter(line => line !== "");
}

function removeNewlines(lines) {
  return lines.map(line => line.replace(/\n/g, ''));
}

function removeSpecialCharacters(string) {
  return string.replace(/[^a-zA-Z0-9]/g, '');
}



export function cleanUpLines(lines) {
  const filtered = lines.map(line => {
    const splitLine = noNewlines.split(/[,()]/);
    const trimmed = trimWhitespace(noEmptyStrings);

    if (trimmed.length > 0 && !(toFilter.some(filter => trimmed[0].startsWith(filter)))) {
      return trimmed;
    }
  });

  const onlyTables = filtered.filter((element) => {
    return element !== undefined;
  });

  return onlyTables;
}

export function parseLine(line) {
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

export function createDirective(directive, generator) {
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

export function parseSQL(sql, type = "DBML", generator) {
  if (type !== "DBML") { setFilters(type); }

  // Split the input into individual lines
  const lines = sql.split(breaks[type]);

  // Filter out lines that start with "COMMENT ON COLUMN" or "ALTER TABLE"
  const filteredLines = cleanUpLines(lines);

  // Split the input into separate directives
  const generatorCommands = []
  let directives;
  if (type == "DBML") {
    directives = createDBMLDirectives(filteredLines);
    debugger;
    generatorCommands.push(`rails generate ${generator} ${directives}`);
  } else {
    directives = createDirectives(filteredLines);
    directives.forEach((directive) => {
      const thisCommand = createDirective(directive, generator);
      generatorCommands.push(thisCommand);
    });
  }
  return generatorCommands;
}

export function handleInput(pasted, generator) {
  try {
    let joined = parseSQL(pasted, "DBML", generator);
    copyableText.update(joined);
  } catch(error) {
    console.error("Failed: ", error);
  }
}

export async function handleExamples(generator) {
    const text = '';
    let parsed = parseSQL(text, "DDL", generator)
    updateStores(parsed);
}
