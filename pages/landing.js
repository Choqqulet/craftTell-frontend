import React from "react";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Craft Tell</h1>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => alert("Build clicked")}>
          build
        </button>
        <button style={styles.button} onClick={() => alert("Connect wallet clicked")}>
          connect wallet
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f6f9fc",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "background-color 0.2s ease",
  },
};