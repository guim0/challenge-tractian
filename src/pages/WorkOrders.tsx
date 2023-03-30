import {
  Badge,
  Button,
  Card,
  Progress,
  Skeleton,
  Steps,
  Table,
  Tag,
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { ICheckList, IWorkOrders } from "../@types/assets";
import useApiData from "../hooks/useApi";
import { api } from "../services/api";
import { statusChecklist } from "../utils/statusChecklist";
import "../styles/workorder.css";
import { useNavigate } from "react-router-dom";

export const WorkOrders = () => {
  const [order, setOrders] = useState<IWorkOrders[]>([]);
  const { data, loading, error } = useApiData(`${api}/workorders`);
  const navigate = useNavigate();

  useEffect(() => {
    setOrders(data);
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
    <main className="orders">
      <header className="headerWorks">
        <Title level={3}>Work Orders</Title>
        <Button size="large" type="primary" onClick={() => navigate(-1)}>
          Return to Home
        </Button>
      </header>
      <section className="checklist">
        {order &&
          order?.map((items: IWorkOrders, index) => (
            <Card
              className="cards"
              title={items.title}
              key={index}
              extra={
                <Tag color={items.priority === "high" ? "red" : "green"}>
                  {items.priority}
                </Tag>
              }
            >
              <ul>
                <Title level={5}>What to do?</Title>
                {items.checklist.map((i: ICheckList, indx) => (
                  <li key={indx}>
                    <div>
                      <Tag color={i.completed === true ? "green" : "yellow"}>
                        {i.completed ? "Completed" : "Not yet"}
                      </Tag>
                      <p>Task: {i.task}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Title level={5} type={statusChecklist(items.status)}>
                Status: {items.status}
              </Title>
              <Title level={5}>{items.description}</Title>
            </Card>
          ))}
      </section>
    </main>
  );
};
{
  /*
{checklists.map((items: ICheckList, index) => (
          <div key={index}>
            <Text>{items.task}</Text>
            <Progress
              type="circle"
              percent={items.completed === false ? 0 : 100}
            />
          </div>
     ))}*/
}
