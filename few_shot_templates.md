# Few-Shot Prompt Templates for Small Language Models

## 1. Why Few-Shot Prompting is Mandatory for SLMs
While 100B+ frontier models possess sufficient in-context meta-learning to follow complex instructions from zero-shot prompts, sub-2B parameter models benefit dramatically from **1-shot or 2-shot exemplary demonstrations**.

Providing 1 or 2 concrete input/output pairs in the prompt:
- Grounds the model's output distribution
- Eliminates syntax errors in JSON and SQL
- Keeps the model focused on the target schema
- Cuts down generation latency by avoiding discursive preamble text

---

## 2. Reusable Few-Shot Templates

### Template A: Few-Shot Entity Extraction (Clinical / Legal)
```text
Extract key attributes into JSON.

Example 1:
Input: "Patient Jane Smith, 52F, presented with hypertension. Prescribed Lisinopril 10mg PO daily. Allergy: Sulfa (rash)."
Output:
{
  "patient": {"name": "Jane Smith", "age": 52, "gender": "F"},
  "condition": "hypertension",
  "medications": [{"drug": "Lisinopril", "dose": "10mg", "route": "PO", "frequency": "daily"}],
  "allergies": [{"substance": "Sulfa", "reaction": "rash"}]
}

Example 2:
Input: "Patient Robert Lee, 29M, diagnosed with mild asthma. Prescribed Albuterol 90mcg inhaler prn. No known drug allergies."
Output:
{
  "patient": {"name": "Robert Lee", "age": 29, "gender": "M"},
  "condition": "mild asthma",
  "medications": [{"drug": "Albuterol", "dose": "90mcg", "route": "inhaler", "frequency": "prn"}],
  "allergies": []
}

Now process this input:
Input: [INSERT UNSTRUCTURED TEXT HERE]
Output:
```

### Template B: Few-Shot SQL Query Synthesizer
```text
Translate natural language requests into ANSI SQL queries based on table schema:
Schema: orders(id, customer_id, order_date, total_amount), customers(id, name, country)

Example 1:
Request: "Find total revenue for customers in Canada in 2023."
SQL:
SELECT c.name, SUM(o.total_amount) AS revenue
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE c.country = 'Canada' AND o.order_date >= '2023-01-01' AND o.order_date <= '2023-12-31'
GROUP BY c.id, c.name;

Example 2:
Request: "List customers who placed more than 5 orders."
SQL:
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING COUNT(o.id) > 5;

Now generate SQL for:
Request: [INSERT REQUEST HERE]
SQL:
```

### Template C: Few-Shot Syllogistic Fallacy Detector
```text
Evaluate if arguments are logically valid or commit a formal fallacy.

Example 1:
Argument: "All mammals breathe air. Dolphins breathe air. Therefore, dolphins are mammals."
Analysis:
- Status: Invalid deduction.
- Formal Fallacy: Fallacy of Affirming the Consequent.
- Note: Even though the conclusion is factually true, the deductive form is invalid because non-mammals (such as reptiles and birds) also breathe air.

Example 2:
Argument: "If it rains, the grass is wet. It is not raining. Therefore, the grass is not wet."
Analysis:
- Status: Invalid deduction.
- Formal Fallacy: Fallacy of Denying the Antecedent.
- Note: The grass could be wet due to sprinklers or morning dew.

Now analyze:
Argument: [INSERT ARGUMENT HERE]
Analysis:
```
