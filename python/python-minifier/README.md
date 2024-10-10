# Python Minifier

## Overview:

This repository contains a Flask-based web API for minifying Python code using the [python_minifier](https://pypi.org/project/python-minifier/) library. The API allows users to submit Python code snippets and receive the minified version in response. Additionally, it supports CORS to enable cross-origin requests from specified origins.

## Setup:

To set up the Python Minifier Web API, follow these steps:

1. Install the required dependencies listed in `requirements.txt` using pip:
    ```
    pip install -r requirements.txt
    ```
2. Run the Flask application:
    ```
    python app.py
    ```
3. The application should now be running locally.

### Endpoints:

- `POST /`: Accepts a Python code snippet via a form submission and returns the minified version of the code.
- `POST /minify`: Alternative endpoint for minification, accepting Python code snippet via form submission.
- `GET /`: Renders an HTML page.

### CORS Configuration:

CORS (Cross-Origin Resource Sharing) is configured to allow requests from specified origins, ensuring compatibility with cross-origin requests, such as those from https://example.com.

## Dependencies:

- Flask: A lightweight WSGI web application framework for Python.
- Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- Python_minifier: Minifies Python source code, reducing it to its smallest form.
