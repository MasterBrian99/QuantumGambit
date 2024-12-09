import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, _] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="w-full container mx-auto">
      <h1 className="text-3xl font-bold">Welcome to Tauri + React</h1>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <Button onClick={()=>{
                    greet()
        }} type="submit" variant={"destructive"}>Gasdreet</Button>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
