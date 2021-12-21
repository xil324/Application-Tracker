import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

class Chart extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h3>Job Position Applied</h3>
        <ResponsiveContainer width="80%" height={350}>
          <PieChart height={250}>
            <Pie
              data={this.props.info}
              dataKey="count"
              cx="50%"
              cy="50%"
              outerRadius={100}
              isAnimationActive={true}
              fill="#8884d8"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                console.log("working on label?");
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#8884d8"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {this.props.info[index].position} ({value})
                  </text>
                );
              }}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
