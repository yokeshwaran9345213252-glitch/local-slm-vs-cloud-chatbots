# Optimization Patterns & Hyperparameter Tuning for SLMs

## 1. Hyperparameter Tuning Guidelines for Sub-2B Models

When running Small Language Models on local hardware via Ollama or llama.cpp, hyperparameter selection directly determines accuracy, conciseness, and memory stability:

| Hyperparameter | Recommended Value for Extraction / Code | Recommended Value for Creative Writing | Technical Explanation |
| :--- | :---: | :---: | :--- |
| **Temperature ($T$)** | **0.1 - 0.2** | **0.7 - 0.8** | Low temperature concentrates probability on the argmax token, preventing small models from exploring improbable phonetic tokens. |
| **Top-P (Nucleus Sampling)** | **0.85 - 0.90** | **0.95** | Truncates low-probability tail tokens, eliminating bizarre vocabulary slips common in small parameter matrices. |
| **Top-K** | **20 - 40** | **50 - 60** | Limits candidate tokens to top $K$, speeding up softmax computation on CPU. |
| **Repetition Penalty** | **1.15 - 1.20** | **1.10** | Small models are prone to infinite repetition loops (e.g. repeating a list item). Penalizing repeats keeps generation moving. |
| **Context Length (`num_ctx`)** | **2048 - 4096** | **2048** | On an 8GB RAM host, keeping `num_ctx = 2048` keeps the KV cache under 300MB, preventing CPU memory thrashing. |
| **CPU Threads (`num_thread`)** | **4** | **4** | Set to the host's physical core count (4 cores on i5-8365U). Setting to logical threads (8) causes cache contention and slows generation. |

---

## 2. The 5 Golden Rules of SLM Prompt Engineering

### Rule 1: Place Instructions at the End (Recency Anchoring)
Small models have shorter effective attention spans across their context buffer. When presenting background text, place the specific instructions and output format constraints **at the very bottom of the prompt**, immediately adjacent to where generation begins.

### Rule 2: Use Markdown Boundary Anchors
Explicit structural markers (`### Background`, `### Instructions`, `### Output Schema`) help the model's self-attention heads separate input context from task directives.

### Rule 3: Enforce Schema Before Text
When requesting JSON, provide the exact schema skeleton:
```text
Respond using this exact JSON template:
{
  "summary": "<string>",
  "risk_score": <number 1-10>
}
```

### Rule 4: Explicit Negative Constraints
Small models respond well to clear negative boundaries:
- `Do not include preamble or conversational greetings.`
- `Do not output markdown code fences.`
- `Do not extrapolate beyond the facts stated above.`

### Rule 5: Chain-of-Thought (CoT) Priming for Reasoning
For logic and math, always include the phrase:
`"Think step by step, showing your intermediate arithmetic before stating the final answer."`
This allocates token generation budget for the model to "think aloud" before committing to a final number, boosting mathematical accuracy by over 35%.
