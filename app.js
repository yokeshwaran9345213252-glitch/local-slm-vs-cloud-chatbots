// Capstone 70: Interactive LLM Exploration Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initRadarChart();
  renderPrompts('all');
  initSimulator();
  initCalculator();
});

// 1. Navigation Tab Switching
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.view-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      if (targetId === 'tab-overview') {
        setTimeout(drawRadar, 50);
      }
    });
  });
}

// 2. HTML5 Canvas Radar Chart for Multi-Dimensional Trade-Offs
function initRadarChart() {
  window.addEventListener('resize', drawRadar);
  setTimeout(drawRadar, 100);
}

function drawRadar() {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // High DPI scaling
  const width = canvas.parentElement.clientWidth > 480 ? 460 : canvas.parentElement.clientWidth - 20;
  const height = 360;
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(2, 2);

  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 45;

  const categories = [
    'Data Privacy',
    'Offline Uptime',
    'Zero Marginal Cost',
    'Throughput Speed',
    'Deep Reasoning',
    'Context Window'
  ];

  const numSides = categories.length;
  const angleStep = (Math.PI * 2) / numSides;

  // Draw concentric polygon rings
  const levels = 5;
  for (let l = 1; l <= levels; l++) {
    const r = (radius / levels) * l;
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw axis lines and labels
  ctx.font = '11px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < numSides; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Label positioning
    const labelX = centerX + (radius + 24) * Math.cos(angle);
    const labelY = centerY + (radius + 18) * Math.sin(angle);
    ctx.fillText(categories[i], labelX, labelY);
  }

  // Datasets (Normalized 0 to 10)
  const models = [
    {
      name: 'Local SLM (Qwen2.5 0.5B)',
      color: '#38bdf8',
      fill: 'rgba(56, 189, 248, 0.25)',
      data: [10, 10, 10, 6, 7.5, 5]
    },
    {
      name: 'ChatGPT (GPT-4o mini)',
      color: '#a855f7',
      fill: 'rgba(168, 85, 247, 0.2)',
      data: [3, 1, 5, 9.5, 10, 9.5]
    },
    {
      name: 'Gemini (1.5 Flash)',
      color: '#10b981',
      fill: 'rgba(16, 185, 129, 0.15)',
      data: [3, 1, 6, 10, 9.8, 10]
    }
  ];

  models.forEach(m => {
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = m.data[i] / 10;
      const x = centerX + radius * val * Math.cos(angle);
      const y = centerY + radius * val * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = m.fill;
    ctx.fill();
    ctx.strokeStyle = m.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Points
    for (let i = 0; i < numSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = m.data[i] / 10;
      const x = centerX + radius * val * Math.cos(angle);
      const y = centerY + radius * val * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.fill();
    }
  });
}

// 3. 20-Prompt Side-by-Side Inspector & Filters
let currentFilter = 'all';
let currentSearch = '';

function renderPrompts(filter = 'all', search = '') {
  const container = document.getElementById('promptsListContainer');
  if (!container) return;

  currentFilter = filter;
  currentSearch = search.toLowerCase();

  const filtered = BENCHMARK_DATA.filter(p => {
    const matchesDomain = filter === 'all' || p.domain.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = !search || 
      p.title.toLowerCase().includes(search) || 
      p.prompt.toLowerCase().includes(search) ||
      p.id.toLowerCase().includes(search);
    return matchesDomain && matchesSearch;
  });

  document.getElementById('promptCountDisplay').textContent = `Showing ${filtered.length} of ${BENCHMARK_DATA.length} Prompts`;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card" style="text-align: center; padding: 40px; color: var(--text-muted);">No prompts found matching your search.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="prompt-card" id="card-${item.id}">
      <div class="prompt-header">
        <div class="prompt-meta">
          <span class="prompt-id-badge">${item.id}</span>
          <span class="prompt-domain-tag">${item.domain}</span>
          <span class="badge-pill" style="font-size: 0.7rem; padding: 2px 8px;">${item.difficulty}</span>
        </div>
      </div>
      <h3 class="prompt-title">${item.title}</h3>
      <div class="prompt-query">"${escapeHtml(item.prompt)}"</div>
      <div class="ground-truth-box">
        <strong>Ground Truth Target:</strong> ${escapeHtml(item.ground_truth)}
      </div>

      <div class="model-responses-grid">
        <!-- Local SLM -->
        <div class="response-box local-winner">
          <div class="response-header">
            <span class="model-tag">💻 Qwen2.5-0.5B (Local CPU)</span>
            <div class="response-chips">
              <span class="stat-chip">${item.models.local.tps} TPS</span>
              <span class="stat-chip">${item.models.local.total_time}</span>
              <span class="stat-chip score">${item.models.local.score}/10</span>
            </div>
          </div>
          <div class="response-content">${escapeHtml(item.models.local.output)}</div>
        </div>

        <!-- ChatGPT -->
        <div class="response-box">
          <div class="response-header">
            <span class="model-tag purple">⚡ ChatGPT (GPT-4o mini)</span>
            <div class="response-chips">
              <span class="stat-chip">${item.models.chatgpt.tps} TPS</span>
              <span class="stat-chip">${item.models.chatgpt.total_time}</span>
              <span class="stat-chip score">${item.models.chatgpt.score}/10</span>
            </div>
          </div>
          <div class="response-content">${escapeHtml(item.models.chatgpt.output)}</div>
        </div>

        <!-- Google Gemini -->
        <div class="response-box">
          <div class="response-header">
            <span class="model-tag emerald">★ Gemini (1.5 Flash)</span>
            <div class="response-chips">
              <span class="stat-chip">${item.models.gemini.tps} TPS</span>
              <span class="stat-chip">${item.models.gemini.total_time}</span>
              <span class="stat-chip score">${item.models.gemini.score}/10</span>
            </div>
          </div>
          <div class="response-content">${escapeHtml(item.models.gemini.output)}</div>
        </div>

        <!-- Hugging Face Llama -->
        <div class="response-box">
          <div class="response-header">
            <span class="model-tag amber">🌐 HF (Llama-3.1-8B)</span>
            <div class="response-chips">
              <span class="stat-chip">${item.models.llama.tps} TPS</span>
              <span class="stat-chip">${item.models.llama.total_time}</span>
              <span class="stat-chip score">${item.models.llama.score}/10</span>
            </div>
          </div>
          <div class="response-content">${escapeHtml(item.models.llama.output)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterPrompts(domain, btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderPrompts(domain, currentSearch);
}

function handleSearch(e) {
  renderPrompts(currentFilter, e.target.value);
}

// 4. Live Token Generation Simulator
let isSimulating = false;
let simIntervalLocal = null;
let simIntervalCloud = null;

function initSimulator() {
  const select = document.getElementById('simPromptSelect');
  if (!select) return;

  BENCHMARK_DATA.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.id}: ${p.title}`;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const selected = BENCHMARK_DATA.find(p => p.id === select.value);
    if (selected) {
      document.getElementById('simPromptPreview').value = selected.prompt;
    }
  });

  // Set initial prompt
  if (BENCHMARK_DATA.length > 0) {
    document.getElementById('simPromptPreview').value = BENCHMARK_DATA[0].prompt;
  }
}

function runSimulatedStream() {
  if (isSimulating) return;

  const select = document.getElementById('simPromptSelect');
  const selected = BENCHMARK_DATA.find(p => p.id === select.value) || BENCHMARK_DATA[0];

  const localText = selected.models.local.output;
  const cloudText = selected.models.chatgpt.output;

  const localBody = document.getElementById('simLocalBody');
  const cloudBody = document.getElementById('simCloudBody');
  const runBtn = document.getElementById('btnRunSim');

  localBody.innerHTML = '<span class="typing-cursor"></span>';
  cloudBody.innerHTML = '<span class="typing-cursor"></span>';

  isSimulating = true;
  runBtn.disabled = true;
  runBtn.innerHTML = 'Generating Live Tokens... ⚡';

  let localIndex = 0;
  let cloudIndex = 0;
  const startTime = Date.now();

  // Local runs at ~25 tokens/s (~40ms per word chunk)
  simIntervalLocal = setInterval(() => {
    if (localIndex < localText.length) {
      localIndex += Math.floor(Math.random() * 4) + 2;
      const text = localText.substring(0, localIndex);
      localBody.innerHTML = escapeHtml(text) + '<span class="typing-cursor"></span>';
      
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const estTokens = Math.round(localIndex / 4);
      document.getElementById('simLocalStats').textContent = `${estTokens} tokens | ~25 TPS | ${elapsed}s`;
    } else {
      localBody.innerHTML = escapeHtml(localText);
      clearInterval(simIntervalLocal);
      checkDone();
    }
  }, 45);

  // Cloud runs at ~55 tokens/s (~20ms per chunk)
  simIntervalCloud = setInterval(() => {
    if (cloudIndex < cloudText.length) {
      cloudIndex += Math.floor(Math.random() * 6) + 4;
      const text = cloudText.substring(0, cloudIndex);
      cloudBody.innerHTML = escapeHtml(text) + '<span class="typing-cursor"></span>';

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const estTokens = Math.round(cloudIndex / 4);
      document.getElementById('simCloudStats').textContent = `${estTokens} tokens | ~55 TPS | ${elapsed}s`;
    } else {
      cloudBody.innerHTML = escapeHtml(cloudText);
      clearInterval(simIntervalCloud);
      checkDone();
    }
  }, 22);

  function checkDone() {
    if (localIndex >= localText.length && cloudIndex >= cloudText.length) {
      isSimulating = false;
      runBtn.disabled = false;
      runBtn.innerHTML = 'Run Simulated Stream ▶';
    }
  }
}

// 5. Privacy ROI & Compliance Calculator
function initCalculator() {
  updateCalculator();
}

function updateCalculator() {
  const queries = parseInt(document.getElementById('sliderQueries').value);
  const avgTokens = parseInt(document.getElementById('sliderTokens').value);
  const dataSensitivity = document.getElementById('selectSensitivity').value;

  document.getElementById('valQueries').textContent = queries.toLocaleString() + ' / mo';
  document.getElementById('valTokens').textContent = avgTokens.toLocaleString() + ' tokens';

  // Cloud API cost estimation ($0.15 per 1M input tokens + $0.60 per 1M output tokens = ~$0.375 per 1M tokens)
  const totalMonthlyTokens = queries * avgTokens;
  const cloudMonthlyCost = (totalMonthlyTokens / 1000000) * 0.40;
  const annualSavings = cloudMonthlyCost * 12;

  document.getElementById('calcAnnualSavings').textContent = '$' + annualSavings.toFixed(2);
  document.getElementById('calcMonthlyTokens').textContent = (totalMonthlyTokens / 1000000).toFixed(1) + 'M tokens';

  // Compliance Risk Exposure Value
  let breachLiability = 0;
  if (dataSensitivity === 'high') {
    breachLiability = queries * 45; // $45 per record risk under HIPAA/GDPR
    document.getElementById('calcBreachDiscount').textContent = '$' + (breachLiability / 1000).toFixed(0) + 'k Risk Avoided';
    document.getElementById('calcBreachDiscount').style.color = 'var(--accent-emerald)';
  } else if (dataSensitivity === 'medium') {
    breachLiability = queries * 12;
    document.getElementById('calcBreachDiscount').textContent = '$' + (breachLiability / 1000).toFixed(0) + 'k Risk Avoided';
  } else {
    document.getElementById('calcBreachDiscount').textContent = 'Zero Cloud Egress';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
