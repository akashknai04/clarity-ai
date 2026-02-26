import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Dashboard Overview</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <MetricCard title="Documents Processed" value="24" />
        <MetricCard title="Medications Detected" value="11" />
        <MetricCard title="High Severity Alerts" value="3" />
      </div>
    </motion.div>
  );
}

function MetricCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "20px",
        borderRadius: "12px",
        width: "200px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h4 style={{ opacity: 0.7 }}>{title}</h4>
      <h2>{value}</h2>
    </motion.div>
  );
}