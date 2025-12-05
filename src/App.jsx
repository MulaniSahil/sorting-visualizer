import { useEffect, useState } from "react";

const ALGO_OPTIONS = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
];

const DELAY_MS = 30;

function randomArray(size, min = 5, max = 300) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function App() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(30);
  const [currentAlgo, setCurrentAlgo] = useState("Bubble Sort");
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  useEffect(() => {
    generateArray();
  }, [size]);

  const generateArray = () => {
    if (isSorting) return;
    setArray(randomArray(size));
    setSortedIndices([]);
    setActiveIndices([]);
  };

  const updateArray = async (newArr, active = [], sorted = []) => {
    setArray([...newArr]);
    setActiveIndices(active);
    if (sorted.length) setSortedIndices((prev) => [...prev, ...sorted]);
    await sleep(speed);
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedIndices([]);
    setActiveIndices([]);

    const arr = [...array];

    switch (currentAlgo) {
      case "Bubble Sort":
        await bubbleSort(arr);
        break;
      case "Selection Sort":
        await selectionSort(arr);
        break;
      case "Insertion Sort":
        await insertionSort(arr);
        break;
      case "Merge Sort":
        await mergeSort(arr);
        break;
      case "Quick Sort":
        await quickSort(arr);
        break;
      default:
        break;
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
    setIsSorting(false);
  };

  const bubbleSort = async (arr) => {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        await updateArray(arr, [j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
        }
      }
      setSortedIndices((prev) => [...prev, n - 1 - i]);
      if (!swapped) break;
    }
  };

  const selectionSort = async (arr) => {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        await updateArray(arr, [minIdx, j]);
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
      setSortedIndices((prev) => [...prev, i]);
    }
  };

  const insertionSort = async (arr) => {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        await updateArray(arr, [j, j + 1]);
        j--;
      }
      arr[j + 1] = key;
      await updateArray(arr, [j + 1]);
    }
  };

  const mergeSort = async (arr) => {
    async function mergeSortRec(start, end) {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      await mergeSortRec(start, mid);
      await mergeSortRec(mid + 1, end);
      await merge(start, mid, end);
    }

    async function merge(start, mid, end) {
      let left = arr.slice(start, mid + 1);
      let right = arr.slice(mid + 1, end + 1);
      let i = 0,
        j = 0,
        k = start;

      while (i < left.length && j < right.length) {
        arr[k] = left[i] <= right[j] ? left[i++] : right[j++];
        await updateArray(arr, [k]);
        k++;
      }
      while (i < left.length) {
        arr[k] = left[i++];
        await updateArray(arr, [k]);
        k++;
      }
      while (j < right.length) {
        arr[k] = right[j++];
        await updateArray(arr, [k]);
        k++;
      }
    }

    await mergeSortRec(0, arr.length - 1);
  };

  const quickSort = async (arr) => {
    async function quickSortRec(low, high) {
      if (low >= high) return;
      let pivotIdx = await partition(low, high);
      await quickSortRec(low, pivotIdx - 1);
      await quickSortRec(pivotIdx + 1, high);
    }

    async function partition(low, high) {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        await updateArray(arr, [j, high]);
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await updateArray(arr, [i, j, high]);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await updateArray(arr, [i + 1, high]);
      return i + 1;
    }

    await quickSortRec(0, arr.length - 1);
  };


  return (
    <div className="app">
      <header className="header">
        <h1>Sorting Algorithm Visualizer</h1>
        <div className="controls">
          <div className="control-group">
            <label>Algorithm</label>
            <select
              value={currentAlgo}
              onChange={(e) => setCurrentAlgo(e.target.value)}
              disabled={isSorting}
            >
              {ALGO_OPTIONS.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Size: {size}</label>
            <input
              type="range"
              min="10"
              max="150"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              disabled={isSorting}
            />
          </div>

          <div className="control-group">
            <label>Speed: {speed}ms</label>
            <input
              type="range"
              min="5"
              max="200"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isSorting}
            />
          </div>

          <button onClick={generateArray} disabled={isSorting}>
            Generate New Array
          </button>
          <button onClick={handleSort} disabled={isSorting}>
            {isSorting ? "Sorting..." : "Start Sorting"}
          </button>
        </div>
      </header>

      <main className="visualizer">
        {array.map((value, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`bar ${
                isSorted ? "bar-sorted" : isActive ? "bar-active" : ""
              }`}
              style={{ height: `${value}px` }}
            />
          );
        })}
      </main>

      <footer className="footer">
        <span>Built with React & Vite • Deploy on Vercel</span>
      </footer>
    </div>
  );
}