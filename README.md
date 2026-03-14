# 📊 Spreadsheets-By-Sanjana

A high-performance, web-based spreadsheet engine built with vanilla JavaScript. This application mimics core Excel functionality, allowing for complex data calculation, storage, and real-time dependency tracking.

---

### 🏗️ System Architecture
To handle cell dependencies without creating infinite loops, the engine utilizes a **Directed Acyclic Graph (DAG)**.



* **Nodes:** Represent individual cells (e.g., A1, B2).
* **Edges:** Represent the flow of data (e.g., if B1 = A1 + 1, an edge goes from A1 to B1).

---

### 🚀 Key Features
* **Dynamic Formula Evaluation:** Supports arithmetic operations and cell-to-cell references.
* **Expression Tree Parsing:** Implements a custom parser to handle mathematical expressions and ensure correct order of operations (PEMDAS).
  


* **Real-time Updates:** Updating a parent cell automatically triggers a topological sort and re-calculates all child cells instantly.

### 🛠️ Technical Stack
<p align="left">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" />
</p>

---

### 📖 How to Use
1.  **Input Data:** Enter values directly into any cell.
2.  **Apply Formulas:** Use the formula bar (e.g., `=A1+B1`) to link cells.
3.  **Automatic Updates:** Modify a base value and watch the dependent cells update instantly.

### 📂 Project Structure
* `index.html`: Structural backbone of the grid.
* `script.js`: The "Engine" containing the calculation logic and DAG.
* `style.css`: Clean, professional user interface styling.

---

### 💡 Why this was built
This project explores the intersection of **web performance** and **graph theory**. It demonstrates how to manage complex state and data dependencies efficiently in the browser without external libraries.

*"Simplifying complex calculations through intelligent data structures."*
