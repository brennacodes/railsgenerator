import { typeMapping, trimWhitespace, parseLine, filterLines } from "./shared_utils";

let toFilter = ["Ref:"];
let lineBreak = "\n";

function createDBMLDirectives(filteredLines) {
  let directives = [];
  filteredLines.forEach((line) => { // line = ['Table users {']
    const parsedLine = parseLine(line); // parsedLine = ['table', 'users']
    debugger;
    parsedLine.forEach((element) => {
      if (element[1] == undefined) return;
      if (element[0] == "Table") {
        directives.push(`${element[1]}`);
      } else {
        directives.push(`${element[0]}:${element[1]}`);
      }
    })
  });

  return directives.join(" ");
}
