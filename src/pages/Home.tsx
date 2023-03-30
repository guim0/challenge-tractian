import { Button, Skeleton } from "antd";

import Title from "antd/es/typography/Title";
import { useLocation, Link } from "react-router-dom";
import { Assets } from "../component/Assets";
import { Units } from "../component/Units";
import { Users } from "../component/Users";
import useApiData from "../hooks/useApi";
import { api } from "../services/api";
import "../styles/home.css";
export const Home = () => {
  const { data, loading, error } = useApiData(`${api}/companies`);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <Title level={2} type="warning">
        Erro ao carregar os dados: {error.message}
      </Title>
    );
  }

  return (
    <main className="app">
      <header>
        <Title level={3}> Welcome, {data?.map((i: any) => i?.name)}</Title>
        <div className="header">
          <div className="contentHeader">
            <Users />
            <Units />
          </div>
          <Link to="/workorders">
            <Button title="Go to Work Orders" type="primary" size="large">
              Go to Work Orders
            </Button>
          </Link>
        </div>
      </header>

      <Assets />
    </main>
  );
};
