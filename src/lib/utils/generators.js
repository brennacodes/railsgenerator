export const generators = {
  "Rails": [
    "application_record",
    "benchmark",
    "channel",
    "controller",
    "generator",
    "integration_test",
    "job",
    "mailbox",
    "mailer",
    "migration",
    "model",
    "resource",
    "scaffold",
    "scaffold_controller",
    "system_test",
    "task"
  ],

  "ActiveRecord": [
    "active_record:application_record",
    "active_record:migration",
    "active_record:model",
    "active_record:multi_db"
  ],

  "Blueprinter": [
    "blueprinter:blueprint"
  ],

  "FactoryBot":[
    "factory_bot:model"
  ],

  "Rspec": [
    "rspec:channel",
    "rspec:controller",
    "rspec:feature",
    "rspec:generator",
    "rspec:helper",
    "rspec:install",
    "rspec:integration",
    "rspec:job",
    "rspec:mailbox",
    "rspec:mailer",
    "rspec:model",
    "rspec:request",
    "rspec:scaffold",
    "rspec:system",
    "rspec:view"
  ],

  "TestUnit": [
    "test_unit:channel",
    "test_unit:controller",
    "test_unit:generator",
    "test_unit:helper",
    "test_unit:install",
    "test_unit:integration",
    "test_unit:job",
    "test_unit:mailbox",
    "test_unit:mailer",
    "test_unit:model",
    "test_unit:plugin",
    "test_unit:scaffold",
    "test_unit:system"
  ]
};

// array of all generator info .txt files
export function generateFileArray() {
  const formattedArray = [];

  for (const key in generators) {
    if (Object.hasOwnProperty.call(generators, key)) {
      const elements = generators[key];
      const formattedElements = elements.map((element) => {
        if (element.includes(':')) { // Check if the element contains a colon
          const parts = element.split(':');
          const hashKey = parts[0].toLowerCase();
          const elementName = parts[1].toLowerCase().replace(/:/g, '_');
          return `${hashKey}_${elementName}`;
        } else {
          return element; // No colon found, don't modify the string
        }
      });
      formattedArray.push(...formattedElements);
    }
  }

  return formattedArray;
}


export const examples = {
  "dbdiagram.io": "postgresql",
  "Postico": "DDL"
}
