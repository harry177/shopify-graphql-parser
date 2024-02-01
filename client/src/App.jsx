import { useEffect } from "react";
//import viteLogo from "/vite.svg";
import { socket } from './socket';
import "./App.css";

function App() {
  useEffect(() => {
    socket.on('databaseUpdated', (data) => {
      console.log(data);
    });
    return () => {
      socket.off('databaseUpdated');
    }
  }, []);

  return <></>;
}

export default App;
