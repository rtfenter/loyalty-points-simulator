# Loyalty Points Simulator  
### A tiny tool to model points earning, FX conversion, and redemption value across regions.

This project is part of my **Loyalty Systems Series**, exploring how loyalty systems behave beneath the UI layer — from event flow to FX reconciliation to partner tiering.

The goal of this simulator is to provide a simple, interactive way to understand how different variables affect the value of a point:

- Region  
- FX rate  
- Partner tier  
- Earn percentage  
- Redemption value  

The simulation is intentionally small and easy to extend.

---

## 🧩 Features (MVP)
The first version includes:

- Input fields for region, amount, and tier  
- Basic points calculation (earn rate × amount)  
- FX adjustment for multi-currency setups  
- Display of redemption value  
- Simple event flow: `Earn → Convert → Redeem`

---

## 🎯 Purpose
Loyalty programs appear simple, but their underlying systems require:

- Clear event definitions  
- FX and tax reconciliation  
- Tiered rules and exceptions  
- Stable truth across regions  

This simulator is a small, approachable way to visualize that complexity.

---

## 🔗 Part of the Loyalty Systems Series  
Main repo:  
https://github.com/rtfenter/loyalty-series

---

## 🚧 Status  
MVP planning phase. Implementation coming soon.
