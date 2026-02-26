import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Workspace from "./pages/Workspace";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Medications from "./pages/Medications";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div style={styles.app}>
        
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <h2 style={styles.brand}>Clarity AI</h2>

          <NavLink to="/" style={styles.navItem} end>
            🧠 Workspace
          </NavLink>

          <NavLink to="/dashboard" style={styles.navItem}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/documents" style={styles.navItem}>
            📄 Documents
          </NavLink>

          <NavLink to="/medications" style={styles.navItem}>
            💊 Medications
          </NavLink>

          <NavLink to="/settings" style={styles.navItem}>
            ⚙ Settings
          </NavLink>
        </div>

        {/* MAIN CONTENT */}
        <div style={styles.main}>
          <Routes>
            <Route path="/" element={<Workspace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "Segoe UI, sans-serif",
  },

  sidebar: {
    width: "240px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "30px 20px",
    borderRight: "1px solid rgba(255,255,255,0.1)",
  },

  brand: {
    marginBottom: "40px",
    fontWeight: "600",
  },

  navItem: ({ isActive }) => ({
    display: "block",
    marginBottom: "18px",
    textDecoration: "none",
    color: isActive ? "#6366f1" : "white",
    fontWeight: isActive ? "600" : "400",
    opacity: 0.85,
    transition: "all 0.2s ease",
  }),

  main: {
    flex: 1,
    padding: "50px",
  },
};

export default App;