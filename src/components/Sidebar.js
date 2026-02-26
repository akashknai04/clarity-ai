import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, Pill, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.brand}>Clarity AI</h2>

      <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
      <NavItem to="/documents" icon={<FileText size={18} />} label="Documents" />
      <NavItem to="/medications" icon={<Pill size={18} />} label="Medications" />
      <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link to={to} style={styles.navItem}>
      {icon}
      <span style={{ marginLeft: "10px" }}>{label}</span>
    </Link>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "30px 20px",
    borderRight: "1px solid rgba(255,255,255,0.1)",
    minHeight: "100vh",
  },
  brand: {
    marginBottom: "40px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    color: "white",
    textDecoration: "none",
    opacity: 0.8,
  },
};