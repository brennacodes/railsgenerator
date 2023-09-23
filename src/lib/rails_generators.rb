generatorlist = {
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


generatorlist.each do |key, elements|
  elements.each do |element|
    # Replace ':' with '_' in the element name to create a valid filename
    filename = "#{key.downcase}_#{element.gsub(':', '_')}.txt"
    # Generate the command to execute
    command = "rails generate #{element} --help"
    # Execute the command and capture the output
    output = `#{command}`
    # Save the output to the file
    File.open(filename, 'w') { |file| file.write(output) }
  end
end
