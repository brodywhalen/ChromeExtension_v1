import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import { IframeHTMLAttributes } from 'react'
function App() {
    // const [count, setCount] = useState(0)
    const onclick = async () => {
        const [tab] = await chrome.tabs.query({ active: true /*, lastFocusedWindow: true}*/ });
        console.log(tab);
        setTimeout(function () { console.log('waiting over'); }, 1500);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // const keyEvent = new KeyboardEvent('keydown', {bubbles: true, cancelable: true, key: 'b'})
                // console.log('keyEvent: ', keyEvent);
                // document.querySelector<HTMLIFrameElement>('.docs-texteventtarget-iframe docs-offscreen-z-index docs-texteventtarget-iframe-negative-top').contentDocument.activeElement.dispatchEvent(keyEvent)
                // console.log('waiting completed')
                if (document.querySelector(".docs-texteventtarget-iframe") !== null && document.querySelector("docs-texteventtarget-iframe").contentDocument !== null && document.querySelector("docs-texteventtarget-iframe").contentDocument?.activeElement !== null) {
                    const input = document.querySelector(".docs-texteventtarget-iframe").contentDocument.activeElement; // why is ts not picking this up? who knows?
                    const eventObj = new KeyboardEvent("keypress", {
                        bubbles: true,
                        cancelable: true,
                        keyCode: 105
                    });
                    input.dispatchEvent(eventObj); // this should
                }
                else {
                    console.log('could not find document element');
                }
                // below works
                // alert('hello from my extension')
            },
            world: "MAIN"
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("a", { href: "https://vite.dev", target: "_blank", children: _jsx("img", { src: viteLogo, className: "logo", alt: "Vite logo" }) }), _jsx("a", { href: "https://react.dev", target: "_blank", children: _jsx("img", { src: reactLogo, className: "logo react", alt: "React logo" }) })] }), _jsx("h1", { children: "Vite + React" }), _jsxs("div", { className: "card", children: [_jsx("button", { onClick: onclick, children: "Click Me" }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to test HMR"] })] }), _jsx("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" })] }));
}
export default App;
