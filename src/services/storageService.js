const fs = require('fs');
const path = require('path');

const padsFilePath = path.join(__dirname, '../../data/pads.json');
const sessionsFilePath = path.join(__dirname, '../../data/sessions.json');
const usersFilePath = path.join(__dirname, '../../data/users.json');

const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      // Create file with empty array if it doesn't exist
      fs.writeFileSync(filePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error writing to file ${filePath}:`, error);
  }
};

const getPads = () => {
  return readData(padsFilePath);
};

const savePad = (pad) => {
  const pads = getPads();
  pads.push(pad);
  writeData(padsFilePath, pads);
};

const getSessions = () => {
  return readData(sessionsFilePath);
};

const saveSession = (session) => {
  const sessions = getSessions();
  sessions.push(session);
  writeData(sessionsFilePath, sessions);
};

const getUsers = () => {
  return readData(usersFilePath);
};

const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  writeData(usersFilePath, users);
};

module.exports = {
  readData,
  writeData,
  getPads,
  savePad,
  getSessions,
  saveSession,
  getUsers,
  saveUser,
};