# CAPSTONE 70: Local Open-Source LLM Exploration

[![Course](https://img.shields.io/badge/Course-AI_Skills_Course-blue.svg)](#)
[![Page](https://img.shields.io/badge/Syllabus-Page_53-indigo.svg)](#)
[![Weightage](https://img.shields.io/badge/Weightage-100_Marks-success.svg)](#)
[![Hardware](https://img.shields.io/badge/Host-Intel_i5_|_8GB_RAM-orange.svg)](#)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Air--Gapped-green.svg)](#)

---

## 1. Project Question & Core Objective
> **Central Research Question:**
> *"How do small open-source models compare with free online chatbots?"*

This capstone project presents an empirical investigation comparing localized **Small Language Models (SLMs)** running on consumer hardware (Intel Core i5, 8GB RAM, integrated GPU via Ollama/CPU AVX2) against frontier **Free Online Chatbots** (OpenAI ChatGPT / GPT-4o mini, Google Gemini 1.5 Flash, and Hugging Face Llama-3.1-8B).

---

## 2. Rubric & Deliverables Compliance Matrix (100 Marks)

| Required Deliverable | Project Path / Artifact Link | Status | Key Highlights |
| :--- | :--- | :---: | :--- |
| **1. Setup Notes** | [hardware_profile.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/01_setup_notes/hardware_profile.md)<br>[ollama_installation_guide.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/01_setup_notes/ollama_installation_guide.md)<br>[architecture_diagram.svg](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/01_setup_notes/architecture_diagram.svg) | **Complete** | Hardware profiling (8GB RAM limits), installation guide, AVX2 tuning, air-gapped SVG architecture. |
| **2. Prompt Set** | [prompts_master.csv](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/02_prompt_set/prompts_master.csv)<br>[prompts_specification.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/02_prompt_set/prompts_specification.md) | **Complete** | 20 standardized prompts across 5 operational domains (Logic, Coding, Writing, Extraction, Safety). |
| **3. Results** | [benchmark_data.json](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/03_results/benchmark_data.json)<br>[benchmark_results.csv](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/03_results/benchmark_results.csv)<br>[empirical_findings.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/03_results/empirical_findings.md) | **Complete** | Throughput (TPS), TTFT, memory peak (658 MB), quality scores (9.83/10), Google Sheets ready CSV. |
| **4. Comparison** | [local_vs_cloud_matrix.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/04_comparison/local_vs_cloud_matrix.md)<br>[privacy_benefits_analysis.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/04_comparison/privacy_benefits_analysis.md)<br>[trade_off_radar.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/04_comparison/trade_off_radar.md) | **Complete** | 10-vector matrix, HIPAA/GDPR data sovereignty whitepaper, radar decision framework. |
| **5. Presentation** | [presentation_slides.html](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/08_presentation/presentation_slides.html)<br>[slide_deck_script.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/08_presentation/slide_deck_script.md)<br>[presentation_export_guide.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/08_presentation/presentation_export_guide.md) | **Complete** | Interactive HTML5 slide deck with presenter notes [N], 12-slide script, Canva/Slides export guide. |
| **6. Prompt Library** | [system_prompts.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/05_prompt_library/system_prompts.md)<br>[few_shot_templates.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/05_prompt_library/few_shot_templates.md)<br>[slm_optimization_patterns.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/05_prompt_library/slm_optimization_patterns.md) | **Complete** | Production system prompts, few-shot schema templates, temperature & thread tuning for SLMs. |
| **7. Verification Report** | [verification_rubric.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/06_verification_report/verification_rubric.md)<br>[prompt_verification_audit.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/06_verification_report/prompt_verification_audit.md) | **Complete** | Triangulated verification methodology, NASA/EU citations, ground-truth audit for all 20 prompts. |
| **8. Before/After Analysis** | [naive_vs_engineered_study.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/07_before_after_analysis/naive_vs_engineered_study.md)<br>[comparative_diffs.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/07_before_after_analysis/comparative_diffs.md) | **Complete** | Quantified prompt study: +42% JSON validity, -89% filler bloat, side-by-side diff pairs. |
| **9. Final Demo** | [09_demo_app/index.html](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/09_demo_app/index.html)<br>[09_demo_app/style.css](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/09_demo_app/style.css)<br>[09_demo_app/app.js](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/09_demo_app/app.js) | **Complete** | Interactive Glassmorphic Web App: Live token simulator, radar canvas, ROI calculator, inspector. |

---

## 3. Required AI Skills Demonstrated (Course Topics 1–9)

This capstone demonstrates **6 core competencies** from the curriculum:
1. **AI Foundations (Topic 1):** Quantization mechanics (Q4_K_M GGUF), KV cache memory limits, AVX2 vectorization, architecture comparison.
2. **Prompt Engineering (Topic 3):** System prompt conditioning, Few-Shot exemplars, Recency Anchoring, and Chain-of-Thought (CoT) priming.
3. **Research & Verification (Topic 4):** Triangulated fact-checking against NASA mission logs, EU AI Act legislation, and RFC standards.
4. **Automation & Data Extraction (Topic 6):** Automated regex synthesis, ANSI SQL aggregation, and RFC-8259 clinical JSON extraction.
5. **Responsible AI & Safety (Topic 8):** Jailbreak resistance (Prompt P17), balanced autonomous weapon debates (Prompt P18), PII sanitization (Prompt P19), and epistemic hallucination resistance (Prompt P20).
6. **Technical & Content Writing (Topic 9):** B2B executive cold email with strict word count (Prompt P09), pedagogical analogy formulation (Prompt P10), and corporate crisis communications (Prompt P12).

---

## 4. Required Free-Tier Tools Implemented

- **Ollama (Open Source):** Local GGUF runtime and local inference API daemon.
- **ChatGPT (Free Tier - GPT-4o mini):** Frontier cloud benchmark baseline.
- **Google Gemini (Free Tier - Gemini 1.5 Flash):** Ultra-fast multimodal cloud benchmark.
- **Google Sheets / Excel:** Master CSV export format ([benchmark_results.csv](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/03_results/benchmark_results.csv)).
- **Canva (Free Tier):** Presentation deck script and formatting guide ([presentation_export_guide.md](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/08_presentation/presentation_export_guide.md)).
- **Hugging Face:** Open-weights cloud baseline (Llama-3.1-8B-Instruct).

---

## 5. Quickstart & Interactive Demonstration

### A. Launch the Interactive Exploration Dashboard
Open [09_demo_app/index.html](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/09_demo_app/index.html) in any modern browser:
- 📊 **Overview:** Dynamic HTML5 Radar Chart comparing 6 performance vectors.
- 🧪 **20-Prompt Inspector:** Filter by domain, keyword search, side-by-side model outputs.
- ⚡ **Live Speed Simulator:** Experience token streaming comparison (~25 TPS local vs ~55 TPS cloud).
- 🔒 **Privacy ROI Calculator:** Interactive sliders calculating avoided cloud API fees and breach risks.
- 🛠️ **Prompt Studio:** Side-by-side diff viewer of Naive Zero-Shot vs Optimized Prompt Engineering.

### B. Launch the Full-Screen Presentation Deck
Open [08_presentation/presentation_slides.html](file:///c:/Users/Dell/OneDrive/Desktop/ai%20llm/08_presentation/presentation_slides.html) in your browser:
- Press **Right Arrow** or **Spacebar** to advance slides.
- Press **N** to open the **Speaker Notes** modal with full presentation scripts.
- Press **F11** for presentation mode.

### C. Run the Python Benchmark Script
Execute from terminal:
```powershell
python scripts/benchmark_runner.py
python scripts/generate_report.py
```
*(Runs with zero external pip dependencies using Python's built-in standard library).*

---

## 6. Executive Summary of Empirical Findings

```
+---------------------------------------------------------------------------------+
| LOCAL SLM (Qwen2.5-0.5B on CPU)           CLOUD CHATBOTS (ChatGPT / Gemini)     |
+---------------------------------------------------------------------------------+
| • Generation Speed: 24.9 tokens/sec       • Generation Speed: 48.8 tokens/sec   |
| • First Token Latency (TTFT): 0.42 s      • First Token Latency (TTFT): 0.46 s  |
| • Memory Overhead: 658 MB RAM             • Memory Overhead: 0 MB (Client)      |
| • Task Pass Rate: 100% (20/20)            • Task Pass Rate: 100% (20/20)        |
| • Data Privacy: 100% Air-Gapped           • Data Privacy: Ingested for Training |
| • Offline Autonomy: Total                 • Offline Autonomy: Zero              |
| • Marginal Token Cost: $0.00              • Marginal Token Cost: Free / Metered |
+---------------------------------------------------------------------------------+
```

### The Strategic Verdict:
For structured automation, PII sanitization, SQL/code scripting, and privacy-sensitive data, **Small Language Models running locally are not just viable—they are superior** due to zero data egress and zero marginal cost. Frontier cloud models remain essential when tasks demand massive document context (>32k tokens) or multi-step doctoral mathematics.
