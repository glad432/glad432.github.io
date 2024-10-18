# Python Compiler

## Overview

This repository contains a Flask-based web API for compiling and running Python code snippets. It allows users to submit Python code and receive the output or error messages from the execution. The API is designed to handle Python code compilation, execution, and error handling in a secure and efficient manner.

## Setup

To set up the Python Compiler, follow these steps:

1. Install the required dependencies listed in `requirements.txt` using pip:
    ```
    pip install -r requirements.txt
    ```
2. Run the Flask application:
    ```
    python app.py
    ```
3. The application should now be running locally.

### Endpoints

The Python Compiler API provides a single endpoint:

- `POST /run`: Accepts Python code submitted in the request body and returns the output or error messages from its execution.

   Example usage with curl:

   ```bash
   curl -X POST -H "Content-Type: text/plain" -d "print('Hello, World!')" http://localhost:5000/run
   ```

### CORS Configuration:

CORS (Cross-Origin Resource Sharing) is configured to allow requests from specified origins, ensuring compatibility with cross-origin requests, such as those from https://example.com.

## Dependencies:

- Flask: A lightweight WSGI web application framework for Python.
- Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- Subprocess: The subprocess module in Python facilitates spawning new processes, managing their input/output, and handling return codes.
- Typing: A standard library module for type hints, enabling static type checking in Python.

## Contributing:

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
