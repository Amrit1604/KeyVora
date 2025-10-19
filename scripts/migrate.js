const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const padsFilePath = path.join(dataDir, 'pads.json');
const usersFilePath = path.join(dataDir, 'users.json');
const sessionsFilePath = path.join(dataDir, 'sessions.json');

function migrateData() {
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        console.log('Created data directory');
    }

    // Check if pads.json exists
    if (!fs.existsSync(padsFilePath)) {
        fs.writeFileSync(padsFilePath, JSON.stringify([], null, 2));
        console.log('Initialized pads.json');
    }

    // Check if users.json exists
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
        console.log('Initialized users.json');
    }

    // Check if sessions.json exists
    if (!fs.existsSync(sessionsFilePath)) {
        fs.writeFileSync(sessionsFilePath, JSON.stringify([], null, 2));
        console.log('Initialized sessions.json');
    }

    console.log('Migration completed successfully!');
}

if (require.main === module) {
    migrateData();
}

module.exports = migrateData;