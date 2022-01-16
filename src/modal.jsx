import React from "react";
import axios from "axios";
import { tickStep } from "d3";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.info[0] === undefined ? "" : props.info[0].name,
      position: props.info[0] === undefined ? "" : props.info[0].position,
      date: "",
      importance: props.info[0] === undefined ? "" : props.info[0].importance,
      status: props.info[0] === undefined ? "" : props.info[0].status,
      url: props.info[0] === undefined ? "" : props.info[0].url,
      comment: props.info[0] === undefined ? "" : props.info[0].comment,
    };
    this.addUser = this.addUser.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  addUser(e, item) {
    this.setState({ [item]: e.target.value });
  }

  close() {
    console.log("invoking this");
    this.setState({ name: "" });
    this.setState({ comment: "" });
    this.setState({ position: "" });
    this.setState({ url: "" });
    this.setState({ date: "" });
    this.setState({ importance: "" });
    this.props.close();
  }

  submitInfo() {
    event.preventdefault();
    if (this.props.info !== null) {
      this.props.delete();
      axios
        .post("/info", {
          name: this.state.name || this.props.info[0].name,
          position: this.state.position || this.props.info[0].position,
          url: this.state.url,
          date: this.state.date || this.props.info[0].date,
          status: this.state.status || this.props.info[0].status,
          importance: this.state.importance || this.props.info[0].importance,
          comment: this.state.comment,
        })
        .then((response) => {
          alert("Thank you!");
          this.props.user();
          this.props.status();
          this.props.pie();
          this.props.graph();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/info", {
          name: this.state.name,
          position: this.state.position,
          url: this.state.url,
          date: this.state.date,
          status: this.state.status,
          importance: this.state.importance,
          comment: this.state.comment || "no comment",
        })
        .then((response) => {
          alert("POST IT");
          this.props.user();
          this.props.status();
          this.props.pie();
          this.props.graph();
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <form className="modal" onSubmit={this.submitInfo}>
        <div>Company Name</div>
        <input
          onChange={(e) => {
            this.addUser(e, "name");
          }}
          value={this.state.name}
        />
        <div>Job Position</div>
        <input
          onChange={(e) => {
            this.addUser(e, "position");
          }}
          value={this.state.position}
        />
        <div>Job Description URL</div>
        <input
          onChange={(e) => {
            this.addUser(e, "url");
          }}
          value={this.state.url}
        />
        <div>Date</div>
        <input
          type="date"
          onChange={(e) => {
            this.addUser(e, "date");
          }}
          value={this.state.date}
        />
        <div>Importance</div>
        <input
          onChange={(e) => {
            this.addUser(e, "importance");
          }}
          value={this.state.importance}
        />
        <div>Status</div>
        <input
          onChange={(e) => {
            this.addUser(e, "status");
          }}
          value={this.state.status}
        />
        <div>Comment</div>
        <input
          onChange={(e) => {
            this.addUser(e, "comment");
          }}
          value={this.state.comment}
        />
        <div>
          <button>Submit</button>
          <button onClick={this.close.bind(this)}>Close</button>
        </div>
      </form>
    );
  }
}

export default Modal;
