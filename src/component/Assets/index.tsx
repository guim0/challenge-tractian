import { Card, Progress } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { IAssets } from "../../@types/assets";

import useApiData from "../../hooks/useApi";
import { api } from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import { statusAssets } from "../../utils/statusAssets";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./styles.css";
import { formatHours } from "../../utils/formatHours";
export const Assets = () => {
  const [assets, setAssets] = useState<IAssets[]>([]);
  const { data, loading, error } = useApiData(`${api}/assets`);
  useEffect(() => {
    setAssets(data);
  }, [data]);

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
    <>
      {assets?.map((items: IAssets, index) => (
        <Card
          title={`type: ${items.model} - name: ${items.name}`}
          className="card"
          key={index}
        >
          <div className="details" key={index}>
            <div>
              <Title level={5} type="secondary">
                Health Score
              </Title>
              <Progress
                percent={items.healthscore}
                status={items.healthscore > 40 ? "normal" : "exception"}
              />
              <img className="img-assets" src={items.image} alt={items.name} />

              <Title level={4}> Specifications</Title>
              <ul>
                {items.specifications.maxTemp > 0 && (
                  <li>
                    <span>Max Temp:</span>
                    {items.specifications.maxTemp}
                  </li>
                )}
                {items.specifications.power > 0 && (
                  <li>
                    <span>Power: </span>
                    {items.specifications.power}
                  </li>
                )}
                {items.specifications.rpm && (
                  <li>
                    <span>RPM: </span>
                    {items.specifications.rpm}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "pie",
                  },
                  title: {
                    text: "Metrics",
                  },
                  series: [
                    {
                      name: "Hours",
                      data: [
                        {
                          name: "Total Collects Uptime",
                          y: formatHours(items.metrics.totalCollectsUptime),
                        },
                        {
                          name: "Total Uptime",
                          y: formatHours(items.metrics.totalUptime),
                        },
                      ],
                    },
                  ],
                }}
              />
              <Title level={5} type="secondary">
                Last Uptime at: {formatDate(items.metrics.lastUptimeAt)}
              </Title>
            </div>
            <ul>
              <Title level={3}>Health History </Title>
              {items.healthHistory.map((i, index) => (
                <div key={index}>
                  <li>
                    <Title level={5} type={statusAssets(items.status)}>
                      {items.status}
                    </Title>
                  </li>
                  <li>{formatDate(i.timestamp)}</li>
                </div>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </>
  );
};
