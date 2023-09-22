<script>
  import FileLoader from "$lib/components/FileLoader.svelte";
  import clipboardy from "clipboardy";

  let tableType = "PostgreSQL";
  let toFilter = ["ALTER TABLE", "COMMENT ON COLUMN"];

  function setFilters() {
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
      let splitLine = line.split(' ');
      if (splitLine[0] === 'CREATE' && splitLine[1] === 'TABLE') {
        directives["table"] = line[splitLine.length - 1];
      } else if (splitLine[0] == 'id') {
        null
      } else if (splitLine[0] == " " || splitLine[0] == undefined) {
        null
      } else {
        directives[splitLine[0]] = splitLine[1];
      }
    });
    return directives;
  }

  function parseSQL(sql, type) {
    tableType = type;

    setFilters();

    const lines = sql.split('\n');

    // Filter out lines that start with "COMMENT ON COLUMN" or "ALTER TABLE"
    const filteredLines = filterLines(lines);

    let directives = createDirectives(filteredLines);

    // Split the SQL into individual CREATE TABLE statements
    const generatorCommands = directives.forEach((line) => {
      if (line.key == 'table') {
        return `rails generate ${type} ${line.value}`;
      } else {
        return ` ${line.key}:${line.value}`;
      }
    });

    createTableStatements.forEach((statement) => {
      if (statement.trim() !== '') {
        const lines = statement.split('\n');

        // Extract table name from the first line
        // Remove "s" to make it singular
        let tableName = lines[0].trim().replace(/"/g, '').replace(" (", "");
        tableName = tableName.substring(0, tableName.length - 1);

        // Initialize an array to store column definitions
        const columns = [];

        lines.slice(1, -1).forEach((line) => {
          // Extract column name and data type from each line
          const matches = line.trim().match(/"([^"]+)"\s+([^,]+)/);

          if (matches && matches.length === 3) {
            const columnName = matches[1];
            const dataType = matches[2];

            columns.push({ name: columnName, type: dataType });
          }
        });

        const beginningCommand = `rails generate ${type} ${tableName}`;

        // Generate the Rails command for the table
        const endingCommand = `${columns
          .map((column) => {
            if (column.name === 'id') {
              return '';
            } else if (column.name.match(/_id$/)) {
              let colName = column.name.replace(/_id$/, '');
              return `${colName}:references`;
            } else if (column.name.match(/_at$/)) {
              return '';
            } else if (column.name.match(/password/)) {
              return `${column.name}_digest:string`;
            } else {
              return `${column.name}:${column.type}`;
            }
          })
          .join(' ')}`;

        const railsCommand = `${beginningCommand}${endingCommand}`;

        commands.push(railsCommand);
      }
    });

    return commands;
  }


  export async function pasteToGenerate() {
      try {
        const text = await clipboardy.read();
        let joined = parseSQL(text, "resource").join("\n");
        userText.update(joined);
      } catch(error) {
        console.error("Failed to read clipboard contents: ", error);
      }
  }
  $: sampleData = '';

</script>

<FileLoader />

<div class="sample-data-container">
  <textarea class="sample-data" bind:value={sampleData} placeholder="Paste your SQL here" ></textarea>
</div>

<style>
.sample-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.sample-data {
  display: flex;
  align-self: stretch;
  font-size: .8rem;
  font-family: monospace;
  line-height: .9rem;
  height: calc(100svh * .6);
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  resize: vertical;
  background-color: var(--bg-color-secondary);
  color: var(--text-color-secondary);
}
</style>
