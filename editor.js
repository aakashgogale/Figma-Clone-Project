const canvas = document.getElementById("canvas");
const layers = document.getElementById("layers");
const imageBtn = document.getElementById("add-image");
const imageInput = document.getElementById("image-input");

const propX = document.getElementById("prop-x");
const propY = document.getElementById("prop-y");
const propW = document.getElementById("prop-w");
const propH = document.getElementById("prop-h");
const propColor = document.getElementById("prop-color");
const propText = document.getElementById("prop-text");

let selected = null;
let count = 0;

document.getElementById("add-rect").onclick = () => {
  const el = document.createElement("div");
  el.className = "element";
  el.style.width = "120px";
  el.style.height = "80px";
  el.style.left = "100px";
  el.style.top = "100px";
  el.style.background = "#7cffe3";
  canvas.appendChild(el);
  setup(el);
};

document.getElementById("add-text").onclick = () => {
  const el = document.createElement("div");
  el.className = "element";
  el.textContent = "Text";
  el.style.left = "120px";
  el.style.top = "120px";
  el.style.color = "#fff";
  canvas.appendChild(el);
  setup(el);
};

function setup(el) {
  makeDraggable(el);
  select(el);
  addLayer(el);
}

function select(el) {
  document.querySelectorAll(".element").forEach(e => e.classList.remove("selected"));
  selected = el;
  el.classList.add("selected");
  updateProps();
}

function makeDraggable(el) {
  el.onmousedown = e => {
    select(el);
    const ox = e.offsetX;
    const oy = e.offsetY;

    document.onmousemove = m => {
      el.style.left = m.clientX - canvas.offsetLeft - ox + "px";
      el.style.top = m.clientY - canvas.offsetTop - oy + "px";
      updateProps();
    };

    document.onmouseup = () => document.onmousemove = null;
  };
}

document.getElementById("go-home").onclick = () => {
  window.location.href = "index.html";
};

function addLayer(el) {
  const l = document.createElement("div");
  l.textContent = "Layer " + (++count);
  l.style.cursor = "pointer";
  l.onclick = () => select(el);
  layers.appendChild(l);
}

function updateProps() {
  if (!selected) return;
  propX.value = parseInt(selected.style.left) || 0;
  propY.value = parseInt(selected.style.top) || 0;
  propW.value = parseInt(selected.style.width) || 0;
  propH.value = parseInt(selected.style.height) || 0;
  propText.value = selected.textContent || "";
}

propX.oninput = () => selected.style.left = propX.value + "px";
propY.oninput = () => selected.style.top = propY.value + "px";
propW.oninput = () => selected.style.width = propW.value + "px";
propH.oninput = () => selected.style.height = propH.value + "px";
propColor.oninput = () => selected.style.background = propColor.value;
propText.oninput = () => selected.textContent = propText.value;

document.getElementById("delete").onclick = () => {
  if (!selected) return;
  selected.remove();
  selected = null;
};

imageBtn.onclick = () => imageInput.click();

imageInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => createImage(reader.result);
  reader.readAsDataURL(file);

  imageInput.value = "";
};

function createImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "element";
  img.style.left = "100px";
  img.style.top = "100px";
  img.style.width = "200px";
  img.style.height = "auto";
  img.style.cursor = "move";
  img.draggable = false;

  canvas.appendChild(img);
  setup(img);
}





