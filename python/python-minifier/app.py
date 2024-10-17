from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import python_minifier
from typing import Dict, Any

app = Flask(__name__)
cors = CORS(app)

MAX_INPUT_SIZE_KB = 420

@app.route("/", methods=["GET"])
def index() -> str:
    return render_template("index.html")

@app.route("/minify", methods=["POST"])
def minify_post() -> Any:
    input_code = request.data.decode("utf-8")
    query_params = request.args
    options = extract_options(query_params)

    if len(input_code) > MAX_INPUT_SIZE_KB * 1024:
        return jsonify({"message": "Input size exceeds the maximum limit."})

    try:
        minified_code = minify_code(input_code, options)
        return jsonify({"minified_code": minified_code})
    except ValueError:
        return jsonify({"message": "Invalid value provided for one or more options."})
    except TypeError:
        return jsonify({"message": "Type error in options. Please check your inputs."})
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"message": "An internal error occurred. Please try again later."})

def extract_options(params: Dict[str, str]) -> Dict[str, Any]:
    options: Dict[str, Any] = {
        'filename': None,
        'remove_annotations': python_minifier.RemoveAnnotationsOptions(
            remove_variable_annotations=False,
            remove_return_annotations=False,
            remove_argument_annotations=False,
            remove_class_attribute_annotations=False
        ),
        'remove_pass': True,
        'remove_literal_statements': True,
        'combine_imports': True,
        'hoist_literals': True,
        'rename_locals': True,
        'preserve_locals': None,
        'rename_globals': True,
        'preserve_globals': None,
        'remove_object_base': True,
        'convert_posargs_to_args': True,
        'preserve_shebang': True,
        'remove_asserts': True,
        'remove_debug': True,
        'remove_explicit_return_none': True,
        'remove_builtin_exception_brackets': True,
        'constant_folding': True
    }

    for key, value in params.items():
        if key in ['preserve_globals', 'preserve_locals']:
            options[key] = value.strip('[]').replace('"', '').split(',')
        elif key == 'remove_annotations':
            if value.lower() == 'true':
                options['remove_annotations'] = python_minifier.RemoveAnnotationsOptions(
                    remove_variable_annotations=True,
                    remove_return_annotations=True,
                    remove_argument_annotations=True,
                    remove_class_attribute_annotations=False
                )
            else:
                options['remove_annotations'] = python_minifier.RemoveAnnotationsOptions(
                    remove_variable_annotations=False,
                    remove_return_annotations=False,
                    remove_argument_annotations=False,
                    remove_class_attribute_annotations=False
                )
        else:
            options[key] = value.lower() == 'true'

    return options

def minify_code(input_code: str, options: Dict[str, Any]) -> str:
    try:
        return python_minifier.minify(input_code, **options)
    except (ValueError, TypeError) as e:
        app.logger.error(f"Minification error: {e}")
        raise

if __name__ == "__main__":
    app.run(debug=False, port=5001)
