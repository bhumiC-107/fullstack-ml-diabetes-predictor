console.log("Script loaded successfully!");

const predictionForm = document.getElementById('PredictionForm');
const predictBtn     = document.getElementById('predict-btn');
const loadingEl      = document.getElementById('loading-indicator');
const resultEl       = document.getElementById('result-container');

function showLoading() {
  predictBtn.disabled = true;
  predictBtn.textContent = 'Predicting…';
  loadingEl.classList.add('visible');
  resultEl.classList.remove('visible');
  resultEl.innerHTML = '';
}

function hideLoading() {
  predictBtn.disabled = false;
  predictBtn.textContent = 'Predict';
  loadingEl.classList.remove('visible');
}

function renderResult(data) {
  const label = data.prediction_label;
  const isdiabetic = label === 'Diabetic';

  const ndScore = (data.confidence_scores['Non-Diabetic'] * 100).toFixed(2);
  const dScore  = (data.confidence_scores['Diabetic'] * 100).toFixed(2);

  resultEl.innerHTML = `
    <div class="result-header">
      <h2>Prediction Result</h2>
      <span class="outcome-pill ${isdiabetic ? 'diabetic' : 'non-diabetic'}">
        ${isdiabetic ? '⚠ ' : '✓ '} ${label}
      </span>
    </div>

    <div class="confidence-section">
      <label>Confidence Scores</label>

      <div class="conf-row">
        <div class="conf-label-row">
          <span>Non-Diabetic</span>
          <span>${ndScore}%</span>
        </div>
        <div class="conf-bar-track">
          <div class="conf-bar-fill non-diabetic" data-width="${ndScore}"></div>
        </div>
      </div>

      <div class="conf-row">
        <div class="conf-label-row">
          <span>Diabetic</span>
          <span>${dScore}%</span>
        </div>
        <div class="conf-bar-track">
          <div class="conf-bar-fill diabetic" data-width="${dScore}"></div>
        </div>
      </div>
    </div>
  `;

  resultEl.classList.add('visible');

  // Animate bars after DOM paint
  requestAnimationFrame(() => {
    document.querySelectorAll('.conf-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  });
}

function renderError(message) {
  resultEl.innerHTML = `
    <div class="error-box">
      <span>✕</span>
      <span>${message}</span>
    </div>
  `;
  resultEl.classList.add('visible');
}

predictionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(predictionForm);
  const data = {};
  formData.forEach((val, key) => { data[key] = parseFloat(val); });

  console.log("Sending payload:", data);
  showLoading();

  fetch('https://fullstack-ml-diabetes-predictor.onrender.com/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return response.json();
    })
    .then(predictionData => {
      console.log("Prediction received:", predictionData);
      hideLoading();
      renderResult(predictionData);
    })
    .catch(error => {
      console.error("API error:", error);
      hideLoading();
      renderError("Could not get a prediction. Make sure the API server is running.");
    });
});
