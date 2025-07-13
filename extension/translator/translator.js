import { getAllTextNodes, getAllTextNodesTreeWalker, translateAllTextNodes, translateAllTextNodesParallel } from "./utils.js"
const SERVER_URL = "http://127.0.0.1:8000";

const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
document.head.appendChild(css);

const btn = document.createElement("button")
btn.className = "btn btn-primary";
btn.innerText = "Translate";
btn.style.cssText = `
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: blue;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  z-index: 99999;
`;

btn.addEventListener('click', async () => {
  console.log(`Starting translation`);
  const start = performance.now();
  await translateAllTextNodesParallel();
  const end = performance.now();
  console.log(`Translation took ${end - start} milliseconds`);
});

document.body.appendChild(btn);
