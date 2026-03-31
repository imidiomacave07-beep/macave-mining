import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsersDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all"); // all / active / noPlan

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (filter === "active") return user.plan;
    if (filter === "noPlan") return !user.plan;
    return true;
  });

  return (
    <div className="admin-dashboard">
      <h2>Todos os Usuários</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("active")}>Com Plano</button>
        <button onClick={() => setFilter("noPlan")}>Sem Plano</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome / Usuário</th>
            <th>Email</th>
            <th>Status do Plano</th>
            <th>Valor Investido</th>
            <th>Data de Registro</th>
            <th>Referral Link Usado</th>
            <th>Lucro Diário</th>
            <th>Hashrate</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.plan ? user.plan : "Sem plano"}</td>
              <td>{user.invested ? `$${user.invested}` : "$0"}</td>
              <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
              <td>{user.referralLink ? "Sim" : "Não"}</td>
              <td>{user.dailyProfit ? `$${user.dailyProfit}` : "$0"}</td>
              <td>{user.hashRate ? `${user.hashRate} TH/s` : "0"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
