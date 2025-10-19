# CodedPad Pro

CodedPad Pro is an enhanced version of the classic CodedPad, designed with a professional hacker-themed UI and advanced functionalities. This application allows users to create, edit, and manage encrypted notes (pads) securely.

## Features

- **Client-Side Encryption**: All notes are encrypted on the client side using the Web Crypto API, ensuring that your data remains private and secure.
- **Hacker-Themed UI**: A sleek and modern interface designed for tech enthusiasts.
- **JSON Data Storage**: Data is stored in JSON files for easy access and manipulation during development.
- **No Account Required**: Users can create and manage pads without the need for an account, simplifying the user experience.

## Project Structure

```
codedpad-pro
├── src
│   ├── app.js
│   ├── server.js
│   ├── routes
│   │   ├── index.js
│   │   ├── pads.js
│   │   └── api.js
│   ├── controllers
│   │   ├── padController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── services
│   │   ├── encryptionService.js
│   │   ├── storageService.js
│   │   └── validationService.js
│   ├── models
│   │   ├── padModel.js
│   │   └── userModel.js
│   ├── utils
│   │   ├── logger.js
│   │   └── crypto.js
│   └── config
│       ├── index.js
│       └── env.js
├── views
│   ├── layouts
│   │   └── main.ejs
│   ├── partials
│   │   ├── head.ejs
│   │   ├── nav.ejs
│   │   └── footer.ejs
│   ├── pads
│   │   ├── list.ejs
│   │   ├── view.ejs
│   │   └── edit.ejs
│   ├── auth
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── index.ejs
│   └── error.ejs
├── public
│   ├── css
│   │   ├── main.css
│   │   └── theme-hacker.css
│   └── js
│       ├── main.js
│       ├── encryption.js
│       └── api.js
├── data
│   ├── pads.json
│   ├── users.json
│   └── sessions.json
├── scripts
│   ├── dev.sh
│   └── migrate.js
├── test
│   ├── unit
│   │   ├── encryptionService.test.js
│   │   └── storageService.test.js
│   └── integration
│       └── pads.test.js
├── docs
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── SECURITY.md
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

## Usage

- Navigate to the homepage to create and manage your pads.
- Use the navigation bar to access different sections of the application.
- All notes are encrypted for your security.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
