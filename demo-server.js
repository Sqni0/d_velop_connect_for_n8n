// 🎪 Interactive Developer Conference Demo
// Real-time workflow execution with audience participation!

const express = require('express');
const app = express();
const PORT = 3000;

// Simulated d.velop platform states for demo
let demoState = {
  coffeeMachine: { status: 'full', level: 85 },
  developers: {
    'alice': { workingHours: 2, lastMeal: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    'bob': { workingHours: 5, lastMeal: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    'charlie': { workingHours: 1, lastMeal: new Date(Date.now() - 1 * 60 * 60 * 1000) }
  },
  deployments: 0,
  bugs: [],
  pizzaOrders: []
};

app.use(express.json());
app.use(express.static('public'));

// 🎭 Demo Control Panel
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>🎪 Developer Automation Circus - Control Panel</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f0f0f0; }
            .scenario { background: white; margin: 20px 0; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .button { background: #007acc; color: white; border: none; padding: 15px 30px; margin: 10px; border-radius: 5px; cursor: pointer; font-size: 16px; }
            .button:hover { background: #005a99; }
            .button.danger { background: #cc3300; }
            .button.success { background: #00cc33; }
            .status { margin: 10px 0; padding: 10px; background: #e8f4f8; border-radius: 5px; }
            .emoji { font-size: 24px; }
        </style>
    </head>
    <body>
        <h1>🎪 Developer Automation Circus - Live Demo Control</h1>
        <p><strong>Welcome to the most advanced developer experience automation ever built!</strong></p>
        
        <div class="scenario">
            <h2>☕ Coffee Crisis Scenario</h2>
            <div class="status">Coffee Level: <span id="coffeeLevel">${demoState.coffeeMachine.level}%</span></div>
            <button class="button danger" onclick="triggerCoffeeCrisis()">🚨 TRIGGER COFFEE CRISIS</button>
            <button class="button success" onclick="refillCoffee()">☕ Refill Coffee Machine</button>
        </div>
        
        <div class="scenario">
            <h2>🍕 Hangry Developer Protocol</h2>
            <div class="status">
                <div>Alice: ${demoState.developers.alice.workingHours}h working</div>
                <div>Bob: ${demoState.developers.bob.workingHours}h working</div>
                <div>Charlie: ${demoState.developers.charlie.workingHours}h working</div>
            </div>
            <button class="button" onclick="addWorkHour('bob')">⏰ Add Work Hour to Bob</button>
            <button class="button danger" onclick="triggerHangryProtocol()">🍕 TRIGGER HANGRY PROTOCOL</button>
        </div>
        
        <div class="scenario">
            <h2>🐛 Bug Apocalypse</h2>
            <div class="status">Active Bugs: <span id="bugCount">${demoState.bugs.length}</span></div>
            <button class="button danger" onclick="createCriticalBug()">🐛 Create Critical Bug</button>
            <button class="button" onclick="createRandomBug()">🪲 Add Random Bug</button>
        </div>
        
        <div class="scenario">
            <h2>🎉 Deployment Celebration</h2>
            <div class="status">Deployments Today: <span id="deployCount">${demoState.deployments}</span></div>
            <button class="button success" onclick="triggerDeployment()">🚀 SUCCESSFUL DEPLOYMENT</button>
        </div>
        
        <div class="scenario">
            <h2>📊 Live Demo Stats</h2>
            <div class="status">
                <div>Pizza Orders: <span id="pizzaOrders">${demoState.pizzaOrders.length}</span></div>
                <div>Coffee Refills: <span id="coffeeRefills">0</span></div>
                <div>Workflows Triggered: <span id="workflowsTriggered">0</span></div>
            </div>
        </div>
        
        <script>
            let workflowCount = 0;
            let coffeeRefills = 0;
            
            function updateDisplay() {
                fetch('/status').then(r => r.json()).then(data => {
                    document.getElementById('coffeeLevel').textContent = data.coffeeMachine.level + '%';
                    document.getElementById('bugCount').textContent = data.bugs.length;
                    document.getElementById('deployCount').textContent = data.deployments;
                    document.getElementById('pizzaOrders').textContent = data.pizzaOrders.length;
                });
            }
            
            function triggerCoffeeCrisis() {
                fetch('/trigger/coffee-crisis', {method: 'POST'})
                    .then(() => {
                        alert('🚨 COFFEE CRISIS ACTIVATED! Check your Slack for emergency alerts!');
                        workflowCount++;
                        document.getElementById('workflowsTriggered').textContent = workflowCount;
                        updateDisplay();
                    });
            }
            
            function refillCoffee() {
                fetch('/trigger/refill-coffee', {method: 'POST'})
                    .then(() => {
                        coffeeRefills++;
                        document.getElementById('coffeeRefills').textContent = coffeeRefills;
                        updateDisplay();
                    });
            }
            
            function triggerHangryProtocol() {
                fetch('/trigger/hangry-protocol', {method: 'POST'})
                    .then(() => {
                        alert('🍕 HANGRY PROTOCOL ACTIVATED! Pizza is on the way!');
                        workflowCount++;
                        document.getElementById('workflowsTriggered').textContent = workflowCount;
                        updateDisplay();
                    });
            }
            
            function createCriticalBug() {
                fetch('/trigger/critical-bug', {method: 'POST'})
                    .then(() => {
                        alert('🐛 CRITICAL BUG CREATED! Rubber duck and snacks dispatched!');
                        workflowCount++;
                        document.getElementById('workflowsTriggered').textContent = workflowCount;
                        updateDisplay();
                    });
            }
            
            function triggerDeployment() {
                fetch('/trigger/deployment', {method: 'POST'})
                    .then(() => {
                        alert('🎉 DEPLOYMENT SUCCESS! Victory music playing in office!');
                        workflowCount++;
                        document.getElementById('workflowsTriggered').textContent = workflowCount;
                        updateDisplay();
                    });
            }
            
            // Auto-refresh every 5 seconds
            setInterval(updateDisplay, 5000);
        </script>
    </body>
    </html>
  `);
});

// API endpoints for triggering demo scenarios
app.post('/trigger/coffee-crisis', (req, res) => {
  console.log('🚨 COFFEE CRISIS TRIGGERED!');
  demoState.coffeeMachine.status = 'empty';
  demoState.coffeeMachine.level = 0;

  // Simulate n8n workflow execution
  setTimeout(() => {
    console.log('  → Emergency Slack alert sent!');
    console.log('  → Coffee supplies ordered automatically!');
    console.log('  → Homeoffice permissions granted!');
  }, 1000);

  res.json({ success: true, message: 'Coffee crisis workflow activated!' });
});

app.post('/trigger/hangry-protocol', (req, res) => {
  console.log('🍕 HANGRY PROTOCOL ACTIVATED!');
  demoState.pizzaOrders.push({
    timestamp: new Date(),
    reason: 'hangry_developer',
    recipient: 'Bob (5+ hours without break)'
  });

  setTimeout(() => {
    console.log('  → Pizza ordered for emergency fuel!');
    console.log('  → Calendar blocked for mandatory lunch break!');
    console.log('  → Team notified of incoming pizza!');
  }, 1000);

  res.json({ success: true, message: 'Hangry protocol workflow activated!' });
});

app.post('/trigger/critical-bug', (req, res) => {
  console.log('🐛 CRITICAL BUG DETECTED!');
  demoState.bugs.push({
    id: 'BUG-' + Date.now(),
    severity: 'critical',
    title: 'Production is on fire! 🔥',
    timestamp: new Date()
  });

  setTimeout(() => {
    console.log('  → Rubber duck assigned for debugging!');
    console.log('  → Focus room booked automatically!');
    console.log('  → Debugging playlist started on Spotify!');
    console.log('  → Emergency snacks dispatched!');
  }, 1000);

  res.json({ success: true, message: 'Bug response workflow activated!' });
});

app.post('/trigger/deployment', (req, res) => {
  console.log('🎉 DEPLOYMENT SUCCESS!');
  demoState.deployments++;

  setTimeout(() => {
    console.log('  → Victory music playing in office!');
    console.log('  → Team celebration drinks ordered!');
    console.log('  → Success story generated for newsletter!');
    console.log('  → "Days since incident" counter updated!');
  }, 1000);

  res.json({ success: true, message: 'Deployment celebration workflow activated!' });
});

app.get('/status', (req, res) => {
  res.json(demoState);
});

app.listen(PORT, () => {
  console.log(`
🎪 Developer Automation Circus Demo Server Running!
🌐 Open http://localhost:${PORT} for the interactive control panel
  
Ready for your developer conference presentation! 🚀
  `);
});

module.exports = app;
