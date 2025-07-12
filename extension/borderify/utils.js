export function getAllTextNodes() { /* https://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes */
    const elements = Array.from(document.querySelectorAll("*"));
    let textNodes = [];
    elements.forEach(el => {
      for (let node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim().length>1 && el.tagName !== "SCRIPT" && el.tagName !== "STYLE") textNodes.push(node);
      }
    });
    return textNodes;
}


export function getAllTextNodesTreeWalker() {
    const walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT,
        (node => {return node.nodeValue.trim().length>1 && node.parentElement.tagName !== "SCRIPT" && node.parentElement.tagName !== "STYLE"})
    );

    let node;
    let textNodes = [];

    while(node = walker.nextNode()) {
        textNodes.push(node);
    }

    return textNodes;
}


const SERVER_URL = "http://127.0.0.1:8000";

export async function translateAllTextNodes() {
  const elements = Array.from(document.querySelectorAll("*"));
  for (let el of elements) {
    for (let node of el.childNodes) {
      if (node.nodeType === 3 && node.textContent.trim().length>1 && el.tagName !== "SCRIPT" && el.tagName !== "STYLE") {
        const encodedText = encodeURIComponent(node.textContent);
        const response = await fetch(SERVER_URL + `/translate?text=${encodedText}&lang=English`);
        node.textContent = (await response.json()).translation;
      }
    }
  }
}


export function translateAllTextNodesParallel() {
  const elements = Array.from(document.querySelectorAll("*"));
  const translationPromises = [];

  elements.forEach(el => {
    if (el.tagName === "SCRIPT" || el.tagName === "STYLE") return;

    el.childNodes.forEach(node => {
      if (node.nodeType === 3 && node.textContent.trim().length > 1) {
        const originalText = node.textContent;
        const promise = fetch(`${SERVER_URL}/translate?text=${encodeURIComponent(originalText)}&lang=Italiano`, {method: 'GET', credentials: 'include'}) //sometimes preflight fail, including credentials for some reason decreases the amount of preflight that fail
          .then(response => response.json())
          .then(data => {
            node.textContent = data.translation;
          })
          .catch(err => console.error("Translation error:", err));
        translationPromises.push(promise);
      }
    });
  });

  return Promise.all(translationPromises);
}
