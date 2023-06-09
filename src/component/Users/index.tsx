import { Card, Carousel, Tree } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { IUsers } from "../../@types/assets";
import useApiData from "../../hooks/useApi";
import { api } from "../../services/api";
import "./style.css";

export const Users = () => {
  const [user, setUser] = useState<IUsers[]>([]);
  const { data, loading, error } = useApiData(`${api}/users`);
  useEffect(() => {
    setUser(data);
  }, [data]);

  if (loading) {
    return (
      <Card
        loading={loading}
        style={{ height: 200, width: 320, marginBottom: "1rem" }}
      />
    );
  }

  if (error) {
    return (
      <Title level={2} type="warning">
        Something unexpected happened: {error.message}
      </Title>
    );
  }

  return (
    <div>
      <Title level={4} type="secondary">
        Current Users
      </Title>
      <div className="carousel">
        <Carousel>
          {user?.map((items: IUsers, index) => (
            <div key={index} className="content">
              <p>{items.name}</p>
              <p>{items.email}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
