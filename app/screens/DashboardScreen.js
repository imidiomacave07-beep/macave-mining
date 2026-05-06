import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";

export default function DashboardScreen({ userId }) {
  const [data, setData] = useState(null);
  const [ai, setAi] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stats = await axios.get(
        `http://localhost:5000/api/stats/mining/${userId}`
      );

      const aiRes = await axios.get(
        `http://localhost:5000/api/ai/mining/${userId}`
      );

      setData(stats.data);
      setAi(aiRes.data.prediction);

    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <View>
        <Text>Carregando dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>

      {/* 💰 SALDO */}
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        💰 Mineração Dashboard
      </Text>

      <Text>Ganhos Totais: {data.totalEarnings}</Text>
      <Text>Média Hashrate: {data.avgHashrate}</Text>

      {/* 🤖 AI */}
      {ai && (
        <View style={{ marginTop: 20 }}>
          <Text>🤖 AI Previsão</Text>
          <Text>Diário: {ai.daily}</Text>
          <Text>Semanal: {ai.weekly}</Text>
          <Text>Tendência: {ai.trend}</Text>
        </View>
      )}

      {/* 📊 HISTÓRICO */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>
          📊 Histórico de Mineração
        </Text>

        {data.history.map((item, index) => (
          <View key={index}>
            <Text>
              ⚡ Hashrate: {item.hashrate} | 💰 {item.earnings}
            </Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
