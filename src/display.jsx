import React from "react";
import axios from "axios";

class Display extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="display" y>
        <div className="display-item">
          <span className="display-span">ID</span>
          <span className="company">Company Name</span>
          <span className="position"> Job Position</span>
          <span className="date">Date</span>
          <span className="importance">Importance</span>
          <span className="status">Status</span>
          <span className="comment">Comment</span>
          <span>Link</span>
        </div>

        <div className="display-overall-2">
          {this.props.information.map((item) => {
            return (
              <div className="display-item">
                <input
                  className="id"
                  type="checkbox"
                  onClick={this.props.select}
                  id={item.id}
                />
                {/* <div> */}
                <span className="display-span">{item.id}</span>

                <span className="company">{item.name}</span>

                <span className="position">{item.position}</span>

                <span className="date">{item.date.slice(0, 10)}</span>

                <span className="importance">{item.importance}</span>

                <span className="status">{item.status}</span>

                <span className="comment">{item.comment}</span>

                <a href={item.url}>Link</a>
              </div>
              // </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Display;
