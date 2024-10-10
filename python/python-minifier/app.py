from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import python_minifier

app = Flask(__name__)
cors = CORS(app)

MAX_INPUT_SIZE_KB = 420


@app.route("/", methods=["GET"])
def index():
    if request.method == "GET":
        return render_template("index.html")


@app.route("/minify", methods=["POST"])
def minify_post():
    input_code = request.data.decode("utf-8")
    query_params = request.args
    options = extract_options(query_params)

    if len(input_code) > MAX_INPUT_SIZE_KB * 1024:
        return (
            jsonify(
                {"error": f"Size exceeds the maximum limit of {MAX_INPUT_SIZE_KB} KB"}
            ),
            400,
        )

    try:
        minified_code = minify_code(input_code, options)
        return jsonify({"minified_code": minified_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def extract_options(params):
    options = {}
    for key, value in params.items():
        if key in ["preserve_globals", "preserve_locals"]:
            options[key] = value.split(",")
        else:
            options[key] = value == "true"
    return options


def minify_code(input_code, options):
    try:
        minified_code = python_minifier.minify(input_code, **options)
        return minified_code
    except Exception as e:
        raise Exception("Minification failed, check the Python code")


if __name__ == "__main__":
    app.run(debug=False, port=5001)
