from flask import Flask, request, jsonify, render_template
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')

    # Call Ollama (Phi-3)
    result = subprocess.run(
        ['ollama', 'run', 'phi3', user_input],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # Return response
    if result.returncode == 0:
        return jsonify({'response': result.stdout})
    else:
        return jsonify({'response': 'Error: ' + result.stderr}), 500

if __name__ == '__main__':
    app.run(debug=True)
