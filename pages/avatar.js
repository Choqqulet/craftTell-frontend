import { useState } from "react";
import { storage, db } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AvatarPage() {
  const [previewText, setPreviewText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Upload avatar image to Firebase Storage
  const uploadAvatar = async (file) => {
    const storageRef = ref(storage, `avatars/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  // Save avatar metadata to Firestore
  const saveAvatarMetadata = async ({ name, imageUrl, voiceType, tone }) => {
    try {
      const docRef = await addDoc(collection(db, "avatars"), {
        name: name || "Unnamed Avatar",
        imageUrl,
        voiceType,
        tone,
        previewText,
        audioUrl,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  // Generate voice using VoiceRSS
  const handleGenerateVoice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.voicerss.org/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          key: "YOUR_API_KEY", // Replace this with real VoiceRSS key
          hl: "en-us",
          src: previewText,
          c: "MP3",
          f: "44khz_16bit_stereo",
        }),
      });

      const audioBlob = await response.blob();
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);
    } catch (error) {
      console.error("TTS failed:", error);
      alert("Failed to generate voice.");
    }
    setIsLoading(false);
  };

  // Upload both avatar and metadata
  const handleUploadAll = async () => {
    if (!file) return alert("Please upload an image first.");
    const imageUrl = await uploadAvatar(file);
    await saveAvatarMetadata({
      name: "XaviChan",
      imageUrl,
      voiceType: "Voice Clone",
      tone: "Angry",
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Avatar Upload & Voice Preview</h2>

      {/* Upload image */}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      {/* Preview Text input */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Preview Text</h3>
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type what your avatar should say"
          style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
        />
        <button
          onClick={handleGenerateVoice}
          disabled={!previewText || isLoading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Generating..." : "Generate Voice"}
        </button>

        {audioUrl && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Preview Audio</h4>
            <audio controls src={audioUrl} />
          </div>
        )}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <button onClick={handleUploadAll} style={{ padding: "10px 20px" }}>
        Upload Avatar + Save Metadata
      </button>
    </div>
  );
}