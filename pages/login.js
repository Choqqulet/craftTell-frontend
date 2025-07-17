import React from "react";
import { auth, provider, signInWithPopup } from "./firebase";

// google login
const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        // Redirect or save user data
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
export default function LoginPage() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Log in with</h2>
          <hr style={styles.separator} />
          <div style={styles.option} onClick={() => alert("Google login clicked")}>
            google
          </div>
          <div style={styles.option} onClick={() => alert("X login clicked")}>
            X
          </div>
          <div style={styles.or}>or</div>
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
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f6f9fc",
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "2rem",
      width: "300px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      marginBottom: "1rem",
      fontSize: "1.2rem",
    },
    separator: {
      width: "100%",
      margin: "0.5rem 0 1rem",
    },
    option: {
      padding: "0.75rem",
      marginBottom: "0.75rem",
      width: "100%",
      textAlign: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: "6px",
      cursor: "pointer",
      userSelect: "none",
    },
    or: {
      margin: "1rem 0",
      color: "#555",
    },
    button: {
      padding: "0.75rem 1rem",
      width: "100%",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      cursor: "pointer",
      backgroundColor: "#fff",
      transition: "background-color 0.2s ease",
    },
  };

// X login


// metamask connect wallet