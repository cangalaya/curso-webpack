import Template from '@templates/Template.js';    // uso de alias, ver webpack
import '@styles/main.css';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();

console.log(23);