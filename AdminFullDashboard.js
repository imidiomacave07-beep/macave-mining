import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFullDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/admin/users/full");
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
    <div className="admin-dashboard-full">
      <h2>Dashboard Completo de Usuários</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("active")}>Com Plano</button>
        <button onClick={() => setFilter("noPlan")}>Sem Plano</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Email</th>
            <th>Status do Plano</th>
            <th>Valor Investido</th>
            <th>Data Registro</th>
            <th>Referral Link Usado</th>
            <th>Lucro Diário</th>
            <th>Hashrate</th>
            <th>Histórico de Compras</th>
            <th>Comissões de Referral</th>
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
              <td>
                {user.purchaseHistory?.length > 0
                  ? user.purchaseHistory.map(p => (
                      <div key={p.id}>
                        {p.plan} - ${p.amount} - {new Date(p.date).toLocaleDateString()}
                      </div>
                    ))
                  : "Nenhuma"}
              </td>
              <td>
                {user.referralEarnings?.length > 0
                  ? user.referralEarnings.map(r => (
                      <div key={r.id}>
                        {r.username} - ${r.amount} - {new Date(r.date).toLocaleDateString()}
                      </div>
                    ))
                  : "$0"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
