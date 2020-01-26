import { useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

    const transition = function(newMode, replace = false) {
      if (replace) {
        history.pop(); // pop FIRST out
      }  
        history.push(newMode); //
        // console.log("pushed newMode into history -->", newMode);
        setMode(newMode);
        // console.log("newMOde -->", newMode);
        setHistory(history)
        // console.log("history -->", history);
      
    }
    const back = function() {
      if (history.length > 1) {
        console.log("length of history-->", history.length);
        console.log('history -->', history);
        history.pop();
        setHistory(history);
        setMode(history[history.length - 1]);
      } else {
        setMode(mode);
      }
    }
  return { mode, transition, back };
}
