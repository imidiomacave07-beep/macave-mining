import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";

export default function AdminDashboardAnalytics() {
  const [users, setUsers] = useState([]);
  const [dailyProfits, setDailyProfits] = useState([]);
  const [hashRates, setHashRates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/admin/users/full");
        setUsers(res.data);

        const profitsData = res.data.map(user => ({
          username: user.username,
          dailyProfit: user.dailyProfit || 0,
        }));
        setDailyProfits(profitsData);

        const hashData = res.data.map(user => ({
          username: user.username,
          hashRate: user.hashRate || 0,
        }));
        setHashRates(hashData);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard-analytics">
      <h2>Dashboard Analítico Macave Mining</h2>

      <h3>Lucro Diário por Usuário</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyProfits}>
          <XAxis dataKey="username" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="dailyProfit" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Hashrate por Usuário (TH/s)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={hashRates}>
          <XAxis dataKey="username" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="hashRate" stroke="#2196f3" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Resumo Geral</h3>
      <div className="summary">
        <p>Total de Usuários: {users.length}</p>
        <p>Total de Lucro Diário: ${users.reduce((sum, u) => sum + (u.dailyProfit || 0), 0)}</p>
        <p>Total de Hashrate: {users.reduce((sum, u) => sum + (u.hashRate || 0), 0)} TH/s</p>
        <p>Total de Planos Ativos: {users.filter(u => u.plan).length}</p>
      </div>
    </div>
  );
}
