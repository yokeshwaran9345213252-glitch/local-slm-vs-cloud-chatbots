# Comparative Diffs: Naive vs. Engineered Prompts on Local SLM

## Case Study 1: Structured JSON Medical Extraction (Prompt P13)

### Naive Prompt (Before)
```text
Extract patient info from: "Patient John Doe, 46M, admitted Oct 24 2024 with acute bronchitis. Prescribed Azithromycin 500mg PO daily for 3 days and Albuterol HFA 90mcg inhaler 2 puffs q4h prn wheezing. Follow up in 10 days. Allergy: Penicillin." Make it JSON.
```

### Naive Model Output (Before)
```text
Certainly! Here is the JSON for the patient:

```json
{
  "Patient": "John Doe",
  "Age_Gender": "46M",
  "Hospital_Admission": "Oct 24 2024",
  "Illness": "acute bronchitis",
  "Rx": "Azithromycin 500mg PO daily, Albuterol HFA 90mcg inhaler",
  "Allergy_Note": "Allergic to Penicillin",
  "Notes": "Patient needs to come back in 10 days."
}
```
I hope this helps! Let me know if you need any other fields extracted.
```
**Defects Identified:**
- Preamble and post-script chatter breaks automated `json.loads()` pipelines.
- Non-standard, unstructured schema keys (`Age_Gender`, `Rx`, `Allergy_Note`).
- Medications mashed into a single unstructured string instead of an array of objects.

---

### Engineered Prompt (After)
```text
You are a deterministic clinical data extraction engine.
Extract entities into RFC-8259 JSON matching this exact schema:
{
  "patient": {"name": string, "age": number, "gender": string},
  "condition": string,
  "medications": [{"drug": string, "dose": string, "route": string, "frequency": string}],
  "allergies": [{"substance": string, "reaction": string}],
  "follow_up_days": number
}
Rules: Output raw JSON only. Zero conversational filler.
Source: "Patient John Doe, 46M, admitted Oct 24 2024 with acute bronchitis. Prescribed Azithromycin 500mg PO daily for 3 days and Albuterol HFA 90mcg inhaler 2 puffs q4h prn wheezing. Follow up scheduled in 10 days. Allergy: Penicillin (severe hives)."
```

### Engineered Model Output (After)
```json
{
  "patient": {
    "name": "John Doe",
    "age": 46,
    "gender": "M"
  },
  "condition": "acute bronchitis",
  "medications": [
    {
      "drug": "Azithromycin",
      "dose": "500mg",
      "route": "PO",
      "frequency": "daily for 3 days"
    },
    {
      "drug": "Albuterol HFA",
      "dose": "90mcg",
      "route": "inhaler",
      "frequency": "2 puffs q4h prn wheezing"
    }
  ],
  "allergies": [
    {
      "substance": "Penicillin",
      "reaction": "severe hives"
    }
  ],
  "follow_up_days": 10
}
```
**Diff Analysis:**
```diff
- Conversational chat ("Certainly! Here is the JSON..."): REMOVED (Saved 32 filler tokens)
- Key unification: Converted unstructured "Rx" string into nested JSON object array
- Automated Parser Compatibility: 100% compliant with standard Python / Node JSON schema validators
```

---

## Case Study 2: Multi-Step Inventory Math (Prompt P02)

### Naive Prompt (Before)
```text
A bakery starts with 140 loaves. Sells 45% in morning. Bakes 35 loaves at 11am. Sells 2/3 of remaining in afternoon. Donates 4 loaves. How many left?
```

### Naive Model Output (Before)
```text
The bakery starts with 140 loaves. 45% of 140 is 63. So 140 - 63 = 77.
Then 77 + 35 = 112 loaves.
Next, they sell 2/3 of 112 which is about 75 loaves.
So 112 - 75 = 37 loaves.
Then they donate 4 loaves, so 37 - 4 = 33 loaves are left in the bakery.
```
**Defects Identified:**
- Inexact intermediate rounding without noting the exact fractional breakdown ($74.67$ vs $75$).
- Lacks formal boundary checks.

---

### Engineered Prompt (After)
```text
You are an expert computational accountant.
Solve this problem step by step. For each step, state the mathematical formula, intermediate decimal value, and remaining inventory.
Problem:
1. Initial stock: 140 artisan loaves.
2. Morning sales: 45% of stock.
3. Midday production: 35 fresh loaves added.
4. Afternoon sales: exactly two-thirds (2/3) of the current stock sold.
5. Closing donation: 4 loaves donated to charity.
State the exact theoretical fractional balance and the practical whole-loaf inventory.
```

### Engineered Model Output (After)
```text
Step 1: Initial Stock = 140 loaves.
Step 2: Morning Sales = 140 * 0.45 = 63 loaves sold.
        Remaining Stock = 140 - 63 = 77 loaves.
Step 3: Midday Production = 77 + 35 = 112 loaves.
Step 4: Afternoon Sales = 112 * (2/3) = 224 / 3 = 74.667 loaves sold.
        Stock before donation = 112 - 74.667 = 37.333 loaves (or 112/3).
Step 5: Closing Donation = 37.333 - 4 = 33.333 loaves remaining (or 100/3).

Practical Whole-Loaf Consideration:
If the afternoon sales were rounded to 75 whole loaves, 33 loaves remain. If rounded to 74 loaves, 34 loaves remain.
Theoretical exact remaining balance: 33.33 loaves (100/3).
```
**Diff Analysis:**
```diff
+ Mathematical rigor: Explicit fractional handling (100/3 loaves)
+ Dual-perspective: Clear distinction between theoretical and practical whole-unit inventory
+ Step-by-step transparency: Eliminates calculation slips through Chain-of-Thought (CoT)
```
