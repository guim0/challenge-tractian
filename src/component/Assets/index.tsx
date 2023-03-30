import { Card, Progress } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { IAssets } from "../../@types/assets";

import Highcharts from "highcharts";
import useApiData from "../../hooks/useApi";
import { api } from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import { formatHours } from "../../utils/formatHours";
import { statusAssets } from "../../utils/statusAssets";
import "./styles.css";
import { HighchartsReact } from "highcharts-react-official";

export const Assets = () => {
  const [assets, setAssets] = useState<IAssets[]>([]);
  const { data, loading, error } = useApiData(`${api}/assets`);

  useEffect(() => {
    setAssets(data);
  }, [data]);

  if (loading) {
    return (
      <Card loading={loading} style={{ height: 200, marginBottom: "1rem" }} />
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
    <>
      <Title level={3}>Assets</Title>
      {assets?.map((items: IAssets, index) => (
        <Card
          title={`type: ${items.model} - name: ${items.name}`}
          className="cardAssets"
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
              <img className="imgAssets" src={items.image} alt={items.name} />

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
              <span>(Status, TimeStamp)</span>
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
