// takes an array of modules and returns a string of import statements
export function generateImportStatements(arrayOfModules) {
  for (const module of arrayOfModules) {
    return `import { ${module} } from '$generators/${module}.txt';\n`;
  }
}

