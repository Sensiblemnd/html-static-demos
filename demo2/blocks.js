
const START_HOUR = 7;
const START_MINUTE = 30;
const SLOT_COUNT = 20; 
const SLOT_MINUTES = 30;

const BLOCKS = [
  { row: 2, colStart: 1, colEnd: 3, color: "red", label: "1 hr" },
  { row: 2, colStart: 3, colEnd: 4, color: "green", label: "30m" },
  { row: 2, colStart: 4, colEnd: 8, color: "yellow", label: "2 hrs" },
  { row: 2, colStart: 8, colEnd: 21, color: "navy", label: "6.5 hrs" },

  { row: 3, colStart: 1, colEnd: 6, color: "purple", label: "2.5 hrs" },
  { row: 3, colStart: 6, colEnd: 12, color: "blue", label: "3 hrs" },
  { row: 3, colStart: 15, colEnd: 20, color: "orange", label: "2.5 hrs" },

  { row: 4, colStart: 2, colEnd: 10, color: "teal", label: "4 hrs" },
  { row: 4, colStart: 10, colEnd: 18, color: "sky", label: "4 hrs" },
];

function formatSlotTime(slotIndex) {
  const totalMinutes = START_HOUR * 60 + START_MINUTE + slotIndex * SLOT_MINUTES;
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minute === 0 ? "00" : minute} ${period}`;
}

function renderHeader() {
  const header = document.createElement("div");
  header.className = "header-container";
  for (let slot = 0; slot < SLOT_COUNT; slot++) {
    const cell = document.createElement("div");
    cell.className = "header-row";
    cell.textContent = formatSlotTime(slot);
    header.append(cell);
  }
  return header;
}

function renderRowBackgrounds(blocks) {
  const rows = [...new Set(blocks.map((block) => block.row))];
  return rows.map((row) => {
    const el = document.createElement("div");
    el.className = "row-background";
    el.style.setProperty("--row", row);
   
    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      const cell = document.createElement("div");
      cell.className = "row-cell";
      el.append(cell);
    }
    return el;
  });
}

function renderBlock(block) {
  const el = document.createElement("div");
  el.className = "block";
  el.style.setProperty("--row", block.row);
  el.style.setProperty("--col-start", block.colStart);
  el.style.setProperty("--col-end", block.colEnd);
  el.dataset.color = block.color;
  el.textContent = block.label;
  return el;
}

const grid = document.getElementById("grid-timeline");
grid.append(
  renderHeader(),
  ...renderRowBackgrounds(BLOCKS),
  ...BLOCKS.map(renderBlock),
);
