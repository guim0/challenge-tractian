import { Card } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { Assets } from "./component/Assets";
import useApiData from "./hooks/useApi";
import { api } from "./services/api";

function App() {
  const { data, loading, error } = useApiData(`${api}/companies`);

  if (loading) {
    return (
      <Title level={2} type="secondary">
        Carregando...
      </Title>
    );
  }

  if (error) {
    return (
      <Title level={2} type="warning">
        Erro ao carregar os dados: {error.message}
      </Title>
    );
  }

  return (
    <div className="app">
      <Title level={3}> Welcome, {data?.map((i: any) => i?.name)}</Title>

      <Assets />
    </div>
  );
}

export default App;
