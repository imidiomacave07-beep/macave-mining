import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SystemStatus() {
  const [status, setStatus] = useState("Verificando...");

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await axios.get("/api/status");
        if (res.data.status === "online") {
          setStatus("🟢 Plataforma Online");
        } else {
          setStatus("🔴 Plataforma Offline");
        }
      } catch (error) {
        setStatus("🔴 Plataforma Offline");
      }
    }

    checkStatus();

    // verificar a cada 30 segundos
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: "10px",
      background: "#111",
      color: "white",
      borderRadius: "8px",
      width: "250px"
    }}>
      <strong>Status do Sistema:</strong>
      <div style={{ marginTop: "5px" }}>{status}</div>
    </div>
  );
}
