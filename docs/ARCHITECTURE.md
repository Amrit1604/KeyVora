# CodedPad Architecture Documentation

## Overview
CodedPad is a web-based application designed for secure note-taking with a hacker-themed user interface. The application allows users to create, view, and edit encrypted notes, ensuring that sensitive information remains private. The architecture is built using Node.js and Express for the backend, with EJS as the templating engine for the frontend.

## Architecture Components

### 1. **Frontend**
- **EJS Templating**: The application uses EJS for rendering dynamic HTML pages. The views are organized into layouts and partials for better maintainability.
- **Client-Side Encryption**: The frontend includes JavaScript modules that handle encryption and decryption of notes using the Web Crypto API, ensuring that data is secure before being sent to the server.

### 2. **Backend**
- **Node.js and Express**: The server is built using Node.js with the Express framework, providing a robust environment for handling HTTP requests and routing.
- **Controllers**: The application follows the MVC pattern, with controllers managing the logic for pads and user actions.
  - `padController.js`: Manages operations related to pads, such as creating, retrieving, and updating notes.
  - `userController.js`: Handles user-related actions, although user accounts are not fully implemented.
  
### 3. **Routing**
- **API Routes**: The application exposes API endpoints for client-side interactions, allowing for saving and retrieving encrypted notes.
- **Main Routes**: The main application routes handle rendering of views for pads and authentication.

### 4. **Data Storage**
- **JSON Files**: Data is initially stored in JSON files for pads, users, and sessions. This approach simplifies data management during development and testing.
  - `pads.json`: Stores encrypted pads and their metadata.
  - `users.json`: Contains user-related data.
  - `sessions.json`: Manages session-related data.

### 5. **Middleware**
- **Authentication Middleware**: Minimal authentication middleware is implemented, reflecting the accountless design of the application.
- **Error Handling Middleware**: Centralized error handling to manage and respond to errors consistently across the application.

### 6. **Utilities and Services**
- **Logging**: Utility functions for logging application events and errors are included to aid in debugging and monitoring.
- **Encryption Service**: Functions for client-side encryption and decryption are provided to ensure data security.
- **Storage Service**: Functions for reading and writing JSON files facilitate data persistence.

## Security Considerations
- **Client-Side Encryption**: All sensitive data is encrypted on the client side before being sent to the server, minimizing exposure to potential attacks.
- **Data Validation**: Input validation is performed to ensure that user inputs meet security standards, such as passphrase strength.

## Conclusion
CodedPad is designed with a focus on security and usability, leveraging modern web technologies to provide a seamless experience for users looking to manage their notes securely. The architecture is modular, allowing for future enhancements and scalability.