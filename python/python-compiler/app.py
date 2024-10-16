import subprocess
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from typing import Dict, Any

app = Flask(__name__)
cors = CORS(app)


@app.route("/")
def index() -> str:
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_code() -> Dict[str, Any]:
    code: str = request.data.decode("utf-8")
    try:
        if not code.strip():
            return jsonify({"output": "No code provided."})

        process = subprocess.Popen(
            ["python"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
        )

        try:
            stdout, stderr = process.communicate(input=code, timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            stdout, stderr = process.communicate()
            result = "Timeout: The code took too long to execute."
        else:
            if process.returncode == 0:
                result = stdout
            else:
                result = f"Error: {stderr}"

    except Exception as e:
        result = f"An unexpected error occurred: {str(e)}"

    return jsonify({"output": result})


if __name__ == "__main__":
    app.run(debug=False, port=5000)
