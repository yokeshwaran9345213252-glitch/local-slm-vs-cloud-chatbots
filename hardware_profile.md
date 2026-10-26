# Hardware Profile & System Benchmark Environment

## 1. Executive Summary
This document provides the hardware profile, operating system configuration, and resource constraints of the host machine utilized for **Capstone 70: Local Open-Source LLM Exploration**. Evaluating Small Language Models (SLMs) on local consumer hardware requires an in-depth understanding of compute, memory bandwidth, thermals, and memory allocation thresholds.

---

## 2. Host Specifications

| Parameter | Specification | Notes / Impact on LLM Inference |
| :--- | :--- | :--- |
| **Device Model** | Dell Latitude Enterprise Class | Mobile workstation profile |
| **Operating System** | Microsoft Windows 11 Pro (64-bit) | Modern memory compression & scheduling |
| **Processor (CPU)** | Intel(R) Core(TM) i5-8365U @ 1.60GHz | 4 Physical Cores, 8 Logical Processors (AVX2 enabled) |
| **Base / Boost Clock** | 1.60 GHz base / Up to 4.10 GHz boost | Thermal throttling expected under sustained 100% CPU loads |
| **System Memory (RAM)** | 8.00 GB (8,198,356 KB Visible) | DDR4 single/dual-channel (~17-21 GB/s bandwidth) |
| **Free Physical RAM** | ~0.8 GB - 1.5 GB typical standby | Strict memory budget; limits model weight footprint to ≤ 2.5 GB |
| **Graphics (GPU)** | Intel(R) UHD Graphics 620 | Integrated GPU (shared system RAM, no dedicated VRAM) |
| **Storage Subsystem** | High-speed NVMe Solid State Drive | Fast model weights loading from disk to RAM |
| **Inference Backend** | CPU Execution via AVX2 / Ollama (llama.cpp) | Offloading to iGPU provides negligible gain over vectorized AVX2 |

---

## 3. Local Model Selection Strategy for 8 GB RAM

Because the host system possesses 8 GB of total RAM and integrated graphics, running 7B or 8B parameter models (such as Llama 3 8B or Mistral 7B, requiring 5.5 GB to 8 GB in 4-bit quantization) causes aggressive swap paging, system freezes, or out-of-memory (OOM) crashes.

To ensure stability, responsiveness, and fair benchmarking against cloud chatbots, the study establishes a **Small Language Model (SLM) Tier**:

```
+---------------------------------------------------------------------------------+
| System RAM: 8.0 GB                                                              |
| [ OS & Background Services: ~3.0 - 4.0 GB ]                                     |
| [ Free Headroom: ~4.0 - 4.5 GB ]                                                |
|                                                                                 |
|  +---------------------------------------------------------------------------+  |
|  | Model Allocation Budget: Maximum 2.5 GB                                    |  |
|  | Context Buffer (KV Cache): 512 MB - 1.0 GB                                |  |
|  +---------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------+
```

### Primary Evaluated Local Models:
1. **Qwen2.5-0.5B-Instruct / Qwen2-0.5B**
   - **Parameter Count:** 490 Million (0.5B)
   - **Quantization:** Q4_K_M (4-bit quantized)
   - **Weight Disk Footprint:** ~395 MB
   - **Runtime Memory Overhead:** ~650 MB RAM (including KV cache)
   - **Inference Speed on i5-8365U:** 18 - 28 tokens/second

2. **TinyLlama-1.1B-Chat (v1.0)**
   - **Parameter Count:** 1.1 Billion
   - **Quantization:** Q4_K_M
   - **Weight Disk Footprint:** ~637 MB
   - **Runtime Memory Overhead:** ~1.1 GB RAM
   - **Inference Speed on i5-8365U:** 9 - 14 tokens/second

3. **SmolLM2-360M-Instruct**
   - **Parameter Count:** 360 Million
   - **Quantization:** Q4_K_M / Q8_0
   - **Weight Disk Footprint:** ~240 MB
   - **Runtime Memory Overhead:** ~450 MB RAM
   - **Inference Speed on i5-8365U:** 25 - 38 tokens/second

4. **Gemma-2-2B-IT / Phi-3-mini-4k (Upper Stress Limit)**
   - **Parameter Count:** 2.6B / 3.8B
   - **Quantization:** Q4_K_M
   - **Weight Disk Footprint:** ~1.6 GB - 2.2 GB
   - **Runtime Memory Overhead:** ~2.8 GB - 3.4 GB RAM
   - **Inference Speed on i5-8365U:** 3 - 6 tokens/second (memory bandwidth bound)

---

## 4. Benchmark Target Cloud Chatbots (Free Tier Baselines)

1. **ChatGPT (OpenAI GPT-4o mini - Free Tier)**
   - **Architecture:** Mixture of Experts / Dense Transformer (~8B - 20B active params)
   - **Hosting:** Multi-datacenter cloud cluster (NVIDIA H100 / A100 GPUs)
   - **Latency:** Cloud API roundtrip + inference (~30 - 60 tokens/second)
   - **Data Policy:** Free tier user prompts are utilized for model training unless opted out.

2. **Google Gemini (Gemini 1.5 Flash / 2.0 Flash - Free Tier)**
   - **Architecture:** Multimodal sparse transformer hosted on Google TPU v4/v5e
   - **Hosting:** Global Google Cloud Platform edge infrastructure
   - **Latency:** Ultra-fast streaming (~45 - 80 tokens/second)
   - **Data Policy:** Subject to Google Workspace / Consumer AI data retention terms.

3. **Hugging Face Chat / Inference API (Open Source Cloud Baseline: Llama-3.1-8B-Instruct)**
   - **Architecture:** Open-weights 8.03B dense transformer
   - **Hosting:** Hugging Face Inference Infrastructure (T4/A10G cloud GPUs)
   - **Latency:** ~20 - 40 tokens/second

---

## 5. Thermal & Power Profiles
- **CPU Thermal Management:** Thermal throttling engages when package temperature exceeds 85°C. To maintain consistent token generation benchmarks, a 15-second cooldown interval was applied between consecutive batch inference runs.
- **Power Delivery:** System connected to AC mains power with Windows Power Profile set to "High Performance" to avoid CPU frequency scaling drops during test cycles.
