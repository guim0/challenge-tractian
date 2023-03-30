import { Button, Card, Skeleton } from "antd";

import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICompanies } from "../@types/assets";

import { Assets } from "../component/Assets";
import { Units } from "../component/Units";
import { Users } from "../component/Users";
import useApiData from "../hooks/useApi";
import { api } from "../services/api";
import "../styles/home.css";
export const Home = () => {
  const [companies, setCompanies] = useState([]);
  const { data, loading, error } = useApiData(`${api}/companies`);

  useEffect(() => {
    setCompanies(data);
  }, [data]);

  if (loading || null) {
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
      <header className="headerHome">
        <Card title="Companies" className="companies">
          <ul>
            {companies &&
              companies?.map((i: ICompanies, idx) => (
                <li key={idx}>
                  <p>{i.name}</p>
                </li>
              ))}
          </ul>
        </Card>
        <div className="header">
          <div className="contentHeader">
            <Users />
            <Units />
          </div>
          <div className="buttons">
            <Link to="/workorders">
              <Button
                title="Go to Work Orders"
                type="primary"
                size="large"
                className="works"
              >
                Go to Work Orders
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <Assets />
    </main>
  );
};
