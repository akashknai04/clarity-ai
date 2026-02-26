import React, { useState } from "react";

export default function Workspace() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [severity, setSeverity] = useState("low");
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👇 PRODUCTION BACKEND URL
  const API_BASE =
    process.env.REACT_APP_API_URL ||
    "https://clarity-ai-98yp.onrender.com";

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = severity === "high" ? 0.9 : 1;
    window.speechSynthesis.speak(utterance);
  };

  const simplifyDocument = async () => {
    if (!inputText.trim()) {
      alert("Please paste a medical document first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/simplify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setSummary(data.summary);
      setSeverity(data.severity);
      setMedications(data.medications || []);
    } catch (err) {
      setError("Backend connection failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧠 AI Medical Workspace</h1>

      <div style={styles.glassCard}>
        <textarea
          placeholder="Paste discharge summary, prescription, or medical report..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={styles.textarea}
        />

        <button style={styles.primaryBtn} onClick={simplifyDocument}>
          {loading ? "Processing..." : "Simplify Document"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </div>

      {summary && (
        <div style={styles.glassCard}>
          <h2>Patient-Friendly Explanation</h2>

          {severity === "high" && (
            <div style={styles.alert}>
              ⚠ Serious medical content detected. Please consult a healthcare provider.
            </div>
          )}

          <p style={styles.summary}>{summary}</p>

          {medications.length > 0 && (
            <>
              <h3>Medication Guidance</h3>
              {medications.map((med, index) => (
                <div key={index} style={styles.medCard}>
                  <h4>{med.name}</h4>
                  <p><strong>Purpose:</strong> {med.purpose}</p>
                  <p><strong>Instructions:</strong> {med.instruction}</p>
                  <p style={{ color: "#ff6b6b" }}>
                    <strong>Warning:</strong> {med.warning}
                  </p>
                </div>
              ))}
            </>
          )}

          <div style={{ marginTop: "20px" }}>
            <button style={styles.primaryBtn} onClick={() => speakText(summary)}>
              🔊 Listen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
  },
  heading: {
    marginBottom: "25px",
  },
  glassCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  textarea: {
    width: "100%",
    height: "130px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "15px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },
  primaryBtn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  alert: {
    background: "rgba(255, 193, 7, 0.15)",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    color: "#ffc107",
  },
  error: {
    marginTop: "15px",
    color: "#ff6b6b",
  },
  summary: {
    lineHeight: "1.6",
  },
  medCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
};