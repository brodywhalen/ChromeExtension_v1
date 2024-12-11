// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { IframeHTMLAttributes } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  const onclick = async() => {
    const [tab] = await chrome.tabs.query({active:true, lastFocusedWindow: true})
    console.log(tab);

    setTimeout(function(){console.log('waiting over')}, 1500);
 
    chrome.scripting.executeScript({
      target: {tabId: tab.id!},
      func: () => {

      const keyEvent = new KeyboardEvent('keypress', {bubbles: true, cancelable: true, key: 'b'})
      // keyEvent.key = KEY // A key like 'a' or 'B' or 'Backspace'
      // You will need to change this line if you want to use other special characters such as the left and right arrows
      // keyEvent.keyCode = KEY.charCodeAt(0) 
      console.log('keyEvent: ', keyEvent);
      
      setTimeout(function(){document.querySelector<HTMLIFrameElement>('.docs-texteventtarget-iframe')!.contentDocument!.activeElement!.dispatchEvent(keyEvent)
        console.log('waiting completed')
      }, 1000) // exlamation points for anti null assertion correct?
      

        // alert('hello from my extension')
      }
    })
  }

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
