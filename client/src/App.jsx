import { useEffect } from "react";
//import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/append-super", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.result);
        } else {
          console.log("Request error");
        }
      } catch (error) {
        console.log("Request error:", error);
      }
    };

    fetchData();
  }, []);

  return <></>;
}

export default App;
