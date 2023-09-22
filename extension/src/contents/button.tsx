import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  // matches: ["https://www.plasmo.com/*"]
}

const CustomButton = () => {

  chrome.runtime.onMessage.addListener((message) => {
    alert(message);
  });

  return <button>Custom button</button>
}

export default CustomButton;