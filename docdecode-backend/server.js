const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ----------------------------------------
// HEALTH CHECK ROUTE
// ----------------------------------------
app.get("/", (req, res) => {
  res.json({
    status: "DocDecode Backend Running",
    version: "1.0.0",
  });
});

// ----------------------------------------
// SIMPLIFY MEDICAL DOCUMENT ROUTE
// ----------------------------------------
app.post("/api/simplify", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "No medical document provided.",
    });
  }

  const lowerText = text.toLowerCase();

  // -----------------------------
  // Severity Detection (Basic Logic)
  // -----------------------------
  let severity = "low";

  if (
    lowerText.includes("cancer") ||
    lowerText.includes("tumor") ||
    lowerText.includes("surgery") ||
    lowerText.includes("icu")
  ) {
    severity = "high";
  } else if (
    lowerText.includes("infection") ||
    lowerText.includes("fracture") ||
    lowerText.includes("diabetes")
  ) {
    severity = "moderate";
  }

  // -----------------------------
  // Medication Extraction (Basic Demo)
  // -----------------------------
  const medications = [];

  if (lowerText.includes("antibiotic")) {
    medications.push({
      name: "Antibiotic",
      purpose: "Used to treat bacterial infection.",
      instruction: "Take as prescribed until course is complete.",
      warning: "Contact doctor if severe rash or breathing difficulty occurs.",
    });
  }

  if (lowerText.includes("paracetamol")) {
    medications.push({
      name: "Paracetamol",
      purpose: "Used to reduce fever and relieve pain.",
      instruction: "Take after food as directed.",
      warning: "Do not exceed recommended daily dosage.",
    });
  }

  // -----------------------------
  // Simplified Explanation
  // -----------------------------
  const simplifiedText = `
Here is a simplified explanation of your medical document:

${text}

Key Points:
• Follow medication instructions carefully.
• Monitor symptoms regularly.
• Contact your healthcare provider if symptoms worsen.
  `;

  // -----------------------------
  // Final Response
  // -----------------------------
  res.json({
    success: true,
    summary: simplifiedText,
    severity: severity,
    medications: medications,
  });
});

// ----------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});