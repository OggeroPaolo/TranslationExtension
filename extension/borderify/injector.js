console.log("✅ Injector loaded on:", window.location.href);


const script = document.createElement('script');
script.type = 'module';
script.src = chrome.runtime.getURL('borderify.js');
(document.head || document.documentElement).appendChild(script);
script.onload = () => script.remove();

