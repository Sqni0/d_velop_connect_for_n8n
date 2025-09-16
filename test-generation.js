const { DvelopActionsApiClient } = require('./dist/api/client.js');
const { NodeGenerator } = require('./dist/generator/NodeGenerator.js');
const config = require('./example.config.json');

async function testAndGenerate() {
  try {
    console.log('🚀 Testing corrected d.velop API integration...');

    // Test API Client
    const client = new DvelopActionsApiClient(config.dvelopConfig);
    const actions = await client.getActions();

    console.log(`\n✅ API Test successful!`);
    console.log(`📊 Found ${actions.length} actions in your d.velop platform:`);

    actions.slice(0, 5).forEach((action, index) => {
      console.log(`${index + 1}. ${action.display_name} (${action.volatile ? 'volatile' : 'stable'})`);
      console.log(`   - ID: ${action.id}`);
      console.log(`   - Type: ${action.execution_mode}`);
      console.log(`   - Properties: ${action.input_properties.length} inputs`);
      console.log('');
    });

    // Generate nodes
    console.log('🔧 Starting node generation...\n');
    const generator = new NodeGenerator(config);
    await generator.generateAllNodes();

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testAndGenerate();
