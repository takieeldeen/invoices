import React, { PureComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b0764", "#6b21a8", "#9333ea"];

export default class Example extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <PieChart width={280} height={170} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={80}
          cy={80}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="middle"
          align="right"
          width="35%"
          layout="vertical"
          iconType="circle"
        ></Legend>
      </PieChart>
    );
  }
}
