import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  Bar,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  LabelList,
  Tooltip,
} from "recharts";

import React from "react";

const Graph = (props) => {
  return (
    <div className="graph">
      <h3>Job Application vs.Date</h3>
      <ResponsiveContainer width="80%" aspect={2}>
        <BarChart data={props.info}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date">
            <Label value="Date" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis />
          <Bar dataKey="count" fill="#8884d8" barSize={15}></Bar>
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Graph;
