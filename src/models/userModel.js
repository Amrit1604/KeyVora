const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');

class UserModel {
  constructor() {
    this.users = this.loadUsers();
  }

  loadUsers() {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath);
      return JSON.parse(data);
    }
    return [];
  }

  saveUsers() {
    fs.writeFileSync(usersFilePath, JSON.stringify(this.users, null, 2));
  }

  addUser(user) {
    this.users.push(user);
    this.saveUsers();
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  getAllUsers() {
    return this.users;
  }
}

module.exports = new UserModel();