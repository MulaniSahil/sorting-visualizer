  Sorting Visualizer 🔢✨

A   React-based Sorting Visualizer   that shows how different sorting algorithms work step-by-step using animated bars.

This project helps to   understand, compare, and visually debug   sorting algorithms by showing comparisons, swaps, and the gradual ordering of the array.

---

   🚀 Features

- Visualize multiple sorting algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
- Adjustable:
  -   Array size   (number of bars)
  -   Sorting speed   (animation delay)
- Random array generation
- Color/visual indication of:
  - Current comparisons
  - Swaps
  - Sorted elements
- Built with   React + Vite   for a fast development experience.

---

🛠 Tech Stack

-   React   – component-based UI
-   Vite   – fast bundler & dev server
-   JavaScript (ES6+)  
-   HTML / CSS  

⚙️ Getting Started (Run Locally)
1️⃣ Clone the repository
git clone https://github.com/MulaniSahil/sorting-visualizer
cd sorting-visualizer

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


Then open the URL shown in the terminal (usually http://localhost:5173).

🧠 How It Works (Logic Overview)

An array of random numbers is generated.

Each sorting algorithm is implemented to:

Perform its usual logic (compare, swap, partition, merge, etc.)

At each important step, update the array state and trigger a re-render.

A small delay is added between updates to create the animation effect.

Colors or styles are used to differentiate:

Elements being compared

Elements being swapped

Elements already sorted

📸 Screenshots / Demo



👨‍💻 Developer

Developed by: Sahil Mulani

Passionate about:

Data Structures & Algorithms

Web Development (React)

Building visual tools to understand complex concepts 🧠

⭐ Support

If you found this project helpful or interesting:

⭐ Star the repository

🐛 Open issues for bugs or suggestions

🔁 Fork and experiment with new algorithms or visual effects