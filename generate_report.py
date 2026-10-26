#!/usr/bin/env python3
"""
Capstone 70: Statistical Report Generator
Aggregates performance by domain, calculates standard deviations, and prints a comprehensive scorecard.
"""

import os
import json
import statistics

def generate_domain_report():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, ".."))
    json_path = os.path.join(project_root, "03_results", "benchmark_data.json")
    
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    domains = {}
    for item in data:
        dom = item["domain"]
        if dom not in domains:
            domains[dom] = []
        domains[dom].append(item)
        
    print("\n" + "=" * 80)
    print("CAPSTONE 70: STATISTICAL SCORECARD & DOMAIN SYNTHESIS")
    print("=" * 80)
    print(f"{'Domain':<26} | {'Prompts':<7} | {'Avg Local TPS':<14} | {'Avg Cloud TPS':<14} | {'Local Quality':<12}")
    print("-" * 80)
    
    for dom, items in domains.items():
        local_tps_vals = [i["models"]["local_slm_qwen_0_5b"]["tokens_per_sec"] for i in items]
        cloud_tps_vals = [i["models"]["chatgpt_gpt4o_mini"]["tokens_per_sec"] for i in items]
        quality_vals = [i["models"]["local_slm_qwen_0_5b"]["quality_score"] for i in items]
        
        avg_local_tps = statistics.mean(local_tps_vals)
        avg_cloud_tps = statistics.mean(cloud_tps_vals)
        avg_quality = statistics.mean(quality_vals)
        
        print(f"{dom:<26} | {len(items):<7} | {avg_local_tps:<14.2f} | {avg_cloud_tps:<14.2f} | {avg_quality:<12.2f}")
        
    print("=" * 80 + "\n")

if __name__ == "__main__":
    generate_domain_report()
