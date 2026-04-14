# Interactive Diabetes Risk Predictor

This project delivers a complete, machine learning solution for predicting diabetes risk. Using the PIMA Indians Diabetes Database, this application was built from the ground up, starting with in-depth exploratory data analysis and culminating in a trained XGBoost model deployed as a REST API with Flask. To showcase the practical application, the project includes an interactive web interface built with HTML and JavaScript that allows users to get real-time predictions from the live model.
<!-- Optional: Add a GIF or Screenshot of your web app in action here! -->
<!-- ![Demo GIF](./demo.gif) -->

## Features

-   **Exploratory Data Analysis (EDA):** In-depth analysis and visualization of the PIMA Indians Diabetes Database.
-   **Data Preprocessing:** Handled missing values (imputation) and standardized features for optimal model performance.
-   **Multi-Model Training:** Trained and evaluated several classification algorithms, including Logistic Regression, K-Nearest Neighbors, Random Forest, and XGBoost.
-   **Hyperparameter Tuning:** Utilized `GridSearchCV` to find the optimal parameters for the best-performing model (XGBoost).
-   **Reusable ML Pipeline:** Encapsulated the entire preprocessing and prediction workflow into a single, robust `scikit-learn` Pipeline.
-   **REST API:** Deployed the trained pipeline as a RESTful API using **Flask**, making the model accessible for predictions via web requests.
-   **Interactive Web Interface:** Built a user-friendly front-end with **HTML, CSS, and JavaScript** that allows users to input patient data and receive real-time predictions from the API.

---

## Technology Stack

-   **Backend:** Python, Flask
-   **Machine Learning:** Scikit-learn, Pandas, NumPy, XGBoost
-   **Data Visualization:** Matplotlib, Seaborn
-   **Frontend:** HTML, CSS, JavaScript (with Fetch API)
-   **Development Environment:** Jupyter Notebook, Git

---

## Setup and Installation

Live Application

This project is now fully deployed and accessible online, eliminating the need for local setup or manual installation. It is hosted on Vercel, providing a fast and reliable platform for both the frontend interface and backend services.

Users can directly interact with the application through the live URL, input health parameters, and receive real-time diabetes risk predictions powered by the trained machine learning model.

The deployment reflects a production-ready workflow, showcasing not just model development but also seamless integration, scalability, and accessibility in a real-world environment.

---

---

## API Endpoint Details

The application's core prediction logic is exposed via a single RESTful API endpoint. This allows for easy integration with other services and applications.

-   **URL:** `/predict`
-   **Method:** `POST`
-   **Description:** Accepts a JSON object containing patient health data and returns a diabetes prediction along with confidence scores.

### Request Payload

The API expects a JSON object with the following eight keys, corresponding to the features the model was trained on. All values should be numerical.

**Example Request Body:**
```json
{
    "Pregnancies": 6,
    "Glucose": 148,
    "BloodPressure": 72,
    "SkinThickness": 35,
    "Insulin": 0,
    "BMI": 33.6,
    "DiabetesPedigreeFunction": 0.627,
    "Age": 50
}
