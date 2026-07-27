# CampusPilot AI — Dummy Data

> **DISCLAIMER:** This is sample/illustrative data created for demonstration purposes only, not actual campus data. All room names, coordinates, distances, and building structures are fictional and generated for hackathon/college project proof-of-concept demo.

---

## 📁 Files

| File | Description |
|------|-------------|
| `rooms.csv` | Room/Location database (30 rooms across 3 buildings) |
| `connectivity.csv` | Graph connectivity between rooms (56 edges with distances) |
| `sample_queries.csv` | 10 sample user queries for chatbot testing |

---

## 🏗️ Campus Structure

```
Block A (Academic)     Block B (Admin)       Block C (Hostel/Library)
├── Ground Floor       ├── Ground Floor      ├── Ground Floor
│   ├── Physics Lab    │   ├── Principal Off │   ├── Cafeteria
│   ├── Chemistry Lab  │   ├── Admin Office  │   ├── Boys Hostel Recp
│   ├── Computer Lab   │   ├── Accounts Off  │   ├── Room 301, 302
│   ├── Classroom 101  │   ├── Reception     │   └── Washroom
│   ├── Classroom 102  │   ├── Waiting Hall  │   
│   ├── Stationery     │   └── Washroom      │   
│   ├── Washroom       │                     │   
│   └── Exit           │                     │   
├── First Floor        ├── First Floor       ├── First Floor
│   ├── HOD Office     │   ├── Conference Rm │   ├── Girls Hostel Recp
│   ├── Staff Room     │   ├── Exam Cell     │   ├── Room 401, 402, 403
│   ├── Classroom 201  │   ├── Library       │   └── Washroom
│   ├── Classroom 202  │   ├── Reading Room  │   
│   ├── Seminar Hall   │   ├── Washroom      │   
│   └── Washroom       │   └── Staircase     │   
└── Staircase          └── Exit              └── Exit
```

---

## 📊 Room Database Summary

| Category | Count |
|----------|-------|
| Classroom | 10 |
| Lab | 3 |
| Office | 6 |
| Facility | 8 |
| Washroom | 5 |
| Exit | 6 |
| **Total** | **38** |

---

## 🔗 Connectivity Graph

- **Nodes:** 38 rooms/locations
- **Edges:** 56 connections
- **Algorithm Ready:** Supports Dijkstra / A* shortest path

Cross-building connections:
- Block A Exit ↔ Block B Reception (25m)
- Block B Exit ↔ Block C Exit (30m)
- Staircases connected between floors

---

## 💬 Sample Queries

| # | Query | Language |
|---|-------|----------|
| 1 | Where is the Physics lab? | English |
| 2 | I need to go to the HOD office | English |
| 3 | What's the nearest washroom from Block A ground floor? | English |
| 4 | Bhai library kahan hai? | Hinglish |
| 5 | Show me the way to cafeteria | English |
| 6 | Mujhe principal office jana hai | Hinglish |
| 7 | Where can I get stationery? | English |
| 8 | Seminar hall kidhar hai block A mein? | Hinglish |
| 9 | Nearest exit from computer lab | English |
| 10 | Boys hostel reception kahan par hai? | Hinglish |

---

## 🛠️ Usage

### Import to Firebase/Firestore:
```javascript
// Upload rooms.csv as collection "rooms"
// Upload connectivity.csv as collection "edges"
```

### Use with Dijkstra:
```python
import pandas as pd
import networkx as nx

rooms = pd.read_csv('rooms.csv')
edges = pd.read_csv('connectivity.csv')

G = nx.Graph()
for _, row in edges.iterrows():
    G.add_edge(row['From Room ID'], row['To Room ID'], weight=row['Distance (meters)'])

# Find shortest path
path = nx.shortest_path(G, 'A-G-103', 'B-F-203', weight='weight')
```

---

*Generated for CampusPilot AI Hackathon Project*
