import React from "react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

class Status extends React.Component {
  constructor() {
    super();
    this.state = {
      curr: "",
    };
  }

  click(e) {
    const data = this.props.info;

    if (e.payload.length !== 0) {
      var total;
      data.forEach((item) => {
        if (item.status === "applied") {
          total = item.count;
        }
      });
      console.log(total);
      console.log(e.payload[0]);
      return (
        "coversion rate is" +
        " " +
        Math.floor((e.payload[0].value / total) * 100) +
        "%"
      );
    } else {
      return "loading";
    }
  }
  render() {
    return (
      <div className="funnel">
        <h3>Coversion Rate</h3>
        <ResponsiveContainer width="80%" height={500}>
          <FunnelChart>
            <Tooltip content={this.click.bind(this)} />
            <Funnel
              dataKey="count"
              data={this.props.info}
              fill="#8884d8"
              isAnimationActive
            >
              <LabelList
                position="right"
                fill="#000"
                stroke="none"
                dataKey="status"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Status;
