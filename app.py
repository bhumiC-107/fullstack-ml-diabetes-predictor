from flask import Flask, request, jsonify  # ✅ Fix 1: import request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# --- Load the Trained Machine Learning Pipeline ---
pipeline_path = 'diabetes_pipeline.joblib'
loaded_pipeline = joblib.load(pipeline_path)
print(f"Model pipeline from '{pipeline_path}' loaded successfully.")

# --- Create the Flask App Instance ---
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# --- Home Endpoint ---
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Welcome to the Diabetes Prediction API!",
        "description": "This is a machine learning service to predict the likelihood of diabetes.",
        "endpoints": {
            "/predict": {
                "method": "POST",
                "description": "Send patient data in JSON format to get a prediction.",
                "example_payload": {
                    "Pregnancies": 6,
                    "Glucose": 148,
                    "BloodPressure": 72,
                    "SkinThickness": 35,
                    "Insulin": 0,
                    "BMI": 33.6,
                    "DiabetesPedigreeFunction": 0.627,
                    "Age": 50
                }
            }
        }
    })

# --- Predict Endpoint ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if data is None:
            return "No JSON received", 400
    except Exception as e:
        return f"Error parsing JSON: {e}", 400  #  Fix 2: was missing f-string prefix

    print(f"Received data: {data}")  #  Fix 3: was inside except block (wrong indentation)

    try:
        input_df = pd.DataFrame([data])
        print(f"Created DataFrame for prediction:\n{input_df}")

        prediction = loaded_pipeline.predict(input_df)
        prediction_probabilities = loaded_pipeline.predict_proba(input_df)

    except Exception as e:
        return f"Error creating DataFrame: {e}", 400

    final_prediction_class = int(prediction[0])
    probabilities = prediction_probabilities[0]

    print(f"Prediction: {final_prediction_class}")
    print(f"Probabilities [Non-Diabetic, Diabetic]: {probabilities}")

    prediction_label = "Diabetic" if final_prediction_class == 1 else "Non-Diabetic"  # ✅ Fix 4: was after return

    response_data = {
        "prediction_class": final_prediction_class,
        "prediction_label": prediction_label,
        "confidence_scores": {
            "Non-Diabetic": float(probabilities[0]),
            "Diabetic": float(probabilities[1])
        }
    }

    print(f"Sending response: {response_data}")
    return jsonify(response_data)  #  Fix 5: removed dead code that was after return


#  Fix 6: was indented inside predict() function
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)