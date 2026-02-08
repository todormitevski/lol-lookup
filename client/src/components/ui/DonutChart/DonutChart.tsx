import { Pie, PieChart } from "recharts";

import classes from "./DonutChart.module.css";

type Props = {
  wins: number;
  losses: number;
  winRate: number;
  isMobile: boolean;
};

export default function DonutChart({ wins, losses, winRate, isMobile }: Props) {
  const data = [
    { name: "Wins", value: wins, fill: "#5383e8" },
    { name: "Losses", value: losses, fill: "#e84057" },
  ];

  const chartSize = isMobile ? 90 : 110;
  const innerRadius = isMobile ? 28 : 35;
  const outerRadius = isMobile ? 38 : 48;
  const center = chartSize / 2;

  return (
    <div className={classes.container}>
      <PieChart width={chartSize} height={chartSize}>
        <Pie
          data={data}
          nameKey="name"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cx={center}
          cy={center}
          stroke="none"
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
        />
      </PieChart>

      <div className={classes.centerText}>
        <div className={classes.winRate}>{winRate}%</div>
        <div className={classes.label}>Win Rate</div>
      </div>
    </div>
  );
}
