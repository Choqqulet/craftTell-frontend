import { useState } from "react";

export default function GenerateStory() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");

  async function handleGenerate() {
    const res = await fetch("http://localhost:5050/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setStory(data.story || data.error);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Generate a Story</h1>
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
      />
      <br />
      <button onClick={handleGenerate}>Generate</button>
      <pre>{story}</pre>
    </div>
  );
}