import { userText } from "$stores/text";
import clipboardy from "clipboardy";

function parseSQL(sql, type) {
  const commands = [];

  const lines = sql.split('\n');

  // Filter out lines that start with "COMMENT ON COLUMN" or "ALTER TABLE"
  const filteredLines = lines.filter(line => {
    return !(line.startsWith('COMMENT ON COLUMN') || line.startsWith('ALTER TABLE'));
  });


  // Split the SQL file into individual CREATE TABLE statements
  const createTableStatements = filteredLines.join('\n').split('CREATE TABLE ');

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
      debugger;
      userText.set(joined);
		} catch(error) {
			console.error("Failed to read clipboard contents: ", error);
		}
}
