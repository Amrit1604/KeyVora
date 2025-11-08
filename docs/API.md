# API Documentation for KeyVora

## Overview
KeyVora provides a set of API endpoints that allow clients to interact with the application for creating, retrieving, and managing encrypted pads. This document outlines the available endpoints, their methods, and the expected request and response formats.

## Base URL
All API endpoints are prefixed with `/api`.

## Endpoints

### 1. Create a Pad
- **Endpoint:** `/api/pads`
- **Method:** `POST`
- **Description:** Creates a new pad with encrypted content.
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "passphrase": "string"
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "id": "string",
      "message": "Pad created successfully."
    }
    ```
  - **Error (400):**
    ```json
    {
      "error": "string"
    }
    ```

### 2. Retrieve a Pad
- **Endpoint:** `/api/pads/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific pad by its ID.
- **Response:**
  - **Success (200):**
    ```json
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "metadata": {
        "created_at": "string",
        "updated_at": "string"
      }
    }
    ```
  - **Error (404):**
    ```json
    {
      "error": "Pad not found."
    }
    ```

### 3. Update a Pad
- **Endpoint:** `/api/pads/:id`
- **Method:** `PUT`
- **Description:** Updates an existing pad's content.
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "passphrase": "string"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Pad updated successfully."
    }
    ```
  - **Error (400):**
    ```json
    {
      "error": "string"
    }
    ```

### 4. Delete a Pad
- **Endpoint:** `/api/pads/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific pad by its ID.
- **Response:**
  - **Success (204):**
    - No content returned.
  - **Error (404):**
    ```json
    {
      "error": "Pad not found."
    }
    ```

## Client-Side Encryption
All content sent to and from the API should be encrypted using the Web Crypto API. Ensure that the `passphrase` is used to derive a key for encryption and decryption of the pad content.

## Error Handling
All API responses should include appropriate HTTP status codes and error messages to help clients handle errors gracefully.

## Conclusion
This API documentation provides a comprehensive guide for developers to integrate with KeyVora. For further assistance, please refer to the project's README or contact the development team.