// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { IframeHTMLAttributes } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  const onclick = async() => {
    const [tab] = await chrome.tabs.query({active:true , lastFocusedWindow: true})
    console.log('target: ', tab);

    chrome.scripting.executeScript({
      target: {tabId: tab.id!},
      func: () => {

      // const keyEvent = new KeyboardEvent('keydown', {bubbles: true, cancelable: true, key: 'b'})
      // console.log('keyEvent: ', keyEvent);
      // document.querySelector<HTMLIFrameElement>('.docs-texteventtarget-iframe docs-offscreen-z-index docs-texteventtarget-iframe-negative-top').contentDocument.activeElement.dispatchEvent(keyEvent)
      // console.log('waiting completed')

      const input = (document.querySelector(".docs-texteventtarget-iframe") as HTMLObjectElement).contentDocument!.activeElement; // why is ts not picking this up? who knows?
      console.log('input: ', input);
      const eventObj = new KeyboardEvent("keypress", {
          bubbles: true,
          cancelable: true,
          keyCode: 105
        });
        input!.dispatchEvent(eventObj); // this should
        
      },
      world: "MAIN"
    })
  }
    
// below works
// const input = document.querySelector(".docs-texteventtarget-iframe").contentDocument.activeElement;

    
// // below works
// const eventObj = new KeyboardEvent("keypress", {
//   bubbles: true,
//   cancelable: true,
//   keyCode: 105
// });
// input.dispatchEvent(eventObj);


        // alert('hello from my extension')


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onclick}>
          Click Me
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
export default App
