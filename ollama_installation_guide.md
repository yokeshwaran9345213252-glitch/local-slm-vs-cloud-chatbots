# Ollama Local Installation, Configuration & SLM Deployment Guide

## 1. Overview
Ollama packages model weights, quantization kernels (GGUF format), inference runtime (llama.cpp engine), and a localized REST API daemon into a single self-contained application.

This guide documents the full lifecycle of setting up Ollama on Windows 11 Pro for hardware-constrained systems (8GB RAM, integrated Intel UHD Graphics).

---

## 2. Installation Procedures

### Method A: Automated CLI Installation via Windows Package Manager (Winget)
Run PowerShell as Administrator:
```powershell
# Install Ollama client and daemon silently
winget install --id Ollama.Ollama -e --accept-source-agreements --accept-package-agreements --silent
```

### Method B: Manual Executable Installation
1. Download the verified release binary from [Ollama Official](https://ollama.com/download/OllamaSetup.exe).
2. Execute `OllamaSetup.exe` and complete the wizard.
3. Ollama creates a background tray service running on localhost:
   - Endpoint: `http://127.0.0.1:11434`
   - Default weights directory: `%USERPROFILE%\.ollama\models`

---

## 3. Post-Installation Verification & Environmental Configuration

### Step 1: Verify Installation
Open a PowerShell terminal and test CLI responsiveness:
```powershell
ollama --version
```
Expected response: `ollama version is 0.4.x` or later.

### Step 2: Environment Variables for Constrained Hardware
To prevent the OS from running out of memory and to optimize CPU multithreading on an Intel Core i5-8365U (4 physical cores / 8 threads):

Set the following user/system environment variables:
```powershell
# Limit concurrent models loaded in memory to 1
[System.Environment]::SetEnvironmentVariable('OLLAMA_MAX_LOADED_MODELS', '1', [System.EnvironmentVariableTarget]::User)

# Set model unload timeout to 5 minutes to release RAM promptly
[System.Environment]::SetEnvironmentVariable('OLLAMA_KEEP_ALIVE', '5m', [System.EnvironmentVariableTarget]::User)

# Force CPU thread allocation matching physical core count (4 cores for optimal L3 cache hits)
[System.Environment]::SetEnvironmentVariable('OLLAMA_NUM_PARALLEL', '1', [System.EnvironmentVariableTarget]::User)

# (Optional) Relocate model directory if C:\ partition is low on storage
# [System.Environment]::SetEnvironmentVariable('OLLAMA_MODELS', 'D:\OllamaModels', [System.EnvironmentVariableTarget]::User)
```

---

## 4. Pulling and Testing Lightweight SLM Models

On an 8 GB RAM system, select models within the **0.5B to 2B parameter tier**:

### Recommended Model 1: Qwen2.5-0.5B-Instruct (Primary Local Benchmark)
```powershell
# Download Qwen2.5 0.5B (~395 MB)
ollama pull qwen2.5:0.5b

# Test interactive prompt
ollama run qwen2.5:0.5b "Explain what an open source LLM is in 2 sentences."
```

### Recommended Model 2: TinyLlama 1.1B
```powershell
# Download TinyLlama 1.1B (~637 MB)
ollama pull tinyllama

# Test prompt
ollama run tinyllama "List 3 advantages of running an AI model locally."
```

### Recommended Model 3: SmolLM2 360M
```powershell
# Download SmolLM2 360M (~240 MB)
ollama pull smollm2:360m
```

---

## 5. Ollama REST API Integration

Ollama exposes a standard REST API at port 11434. Applications can communicate directly via JSON:

### Example: Python Standard Library API Call
```python
import urllib.request
import json

url = "http://localhost:11434/api/generate"
payload = {
    "model": "qwen2.5:0.5b",
    "prompt": "What are the core components of a transformer architecture?",
    "stream": False,
    "options": {
        "temperature": 0.2,
        "num_predict": 256,
        "num_thread": 4
    }
}

req = urllib.request.Request(
    url, 
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode("utf-8"))
    print("Response:", result["response"])
    print("Tokens evaluated:", result.get("eval_count"))
    print("Evaluation duration (sec):", result.get("eval_duration") / 1e9)
    print("Speed (tokens/sec):", (result.get("eval_count") / (result.get("eval_duration") / 1e9)))
```

---

## 6. Troubleshooting Common Issues

| Symptom | Root Cause | Solution |
| :--- | :--- | :--- |
| **`CUDA not found, using CPU`** | Intel UHD Graphics 620 lacks NVIDIA CUDA cores. | Normal and expected. Ollama automatically falls back to optimized AVX2 CPU instructions. |
| **System freezing / high paging** | Attempting to run a 7B/8B model exceeding available RAM. | Kill process with `Stop-Process -Name "ollama_llama_server" -Force` and switch to a ≤ 2B model. |
| **Port 11434 connection refused** | Ollama daemon service is not running. | Run `ollama serve` in a dedicated terminal or start from the Windows Start Menu. |
| **High initial response latency** | Cold model loading from disk to RAM. | Warm up the model with a 1-token prompt (`"Hi"`) before running timed benchmarks. |
