import { Card, Carousel } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { IUnits, IUsers } from "../../@types/assets";
import useApiData from "../../hooks/useApi";
import { api } from "../../services/api";
import "./style.css";

export const Units = () => {
  const [unit, setUnit] = useState<IUsers[]>([]);
  const { data, loading, error } = useApiData(`${api}/units`);
  useEffect(() => {
    setUnit(data);
  }, [data]);

  if (loading) {
    return (
      <Card
        loading={loading}
        style={{ height: 120, width: 320, marginBottom: "1rem" }}
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
        Current Units
      </Title>
      <div className="carousel">
        <Carousel>
          {unit?.map((items: IUnits, index) => (
            <div key={index} className="content">
              <p>{items.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
