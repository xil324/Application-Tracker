import React from "react";
import Display from "./display.jsx";
import axios from "axios";
import Modal from "./modal.jsx";
import Graph from "./cube.jsx";
import Chart from "./pie.jsx";
import Status from "./funnel.jsx";
import Login from "./login.jsx";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      info: [],
      modal: false,
      selected: [],
      dateinfo: [],
      pie: [],
      status: [],
      deletion: [],
      update: {},
      login: true,
    };
    this.getUserinfo = this.getUserinfo.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selection = this.selection.bind(this);
    this.delete = this.delete.bind(this);
    this.getGraphInfo = this.getGraphInfo.bind(this);
    this.getPieInfo = this.getPieInfo.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.select = this.select.bind(this);
  }
  componentDidMount() {
    this.getUserinfo();
    this.getGraphInfo();
    this.getPieInfo();
    this.getStatus();
  }

  getUserinfo() {
    axios
      .get("/info")
      .then((res) => {
        var input = [];
        res.data.forEach((item) => {
          input.push(item);
        });
        this.setState({ info: input });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGraphInfo() {
    axios
      .get("info/date")
      .then((res) => {
        var input = [];
        res.data.forEach((item) => {
          item.date = item.date.substring(0, 10);
          input.push(item);
        });
        this.setState({ dateinfo: input });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPieInfo() {
    axios
      .get("/info/pie")
      .then((res) => {
        var input = [];
        res.data.forEach((item) => {
          item.count = parseInt(item.count);
          input.push(item);
        });
        this.setState({ pie: input });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getStatus() {
    axios
      .get("/info/status")
      .then((res) => {
        var input = [];
        res.data.forEach((item) => {
          item.count = parseInt(item.count);
          input.push(item);
        });

        var cnt = 0;
        input.forEach((item) => {
          cnt += item.count;
        });
        input.forEach((item) => {
          if (item.status === "applied") {
            item.count = cnt;
          }
        });
        input.sort((a, b) => {
          return b.count - a.count;
        });
        this.setState({ status: input });
        console.log(this.state.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showModal() {
    this.setState({ modal: true });
  }
  closeModal() {
    this.setState({ modal: false });
  }
  signin() {
    const status = this.state.login;
    this.setState({ login: !status });
    console.log(this.state.login);
  }

  delete() {
    axios
      .put("/info/delete", { id: this.state.selected })
      .then(() => {
        this.getUserinfo();
        this.getGraphInfo();
        this.getPieInfo();
        this.getStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  select() {
    console.log(this.state.selected.length);
    if (this.state.selected.length > 1) {
      alert("please select only one to update");
    }

    if (this.state.selected.length === 0) {
      this.setState({ selected: [] });
    }

    if (this.state.selected.length === 1) {
      axios
        .get("/info")
        .then((response) => {
          return response.data.filter((item) => {
            return item.id === parseInt(this.state.selected[0]);
          });
        })

        .then((item) => {
          this.setState({ update: item });
        })
        .then(() => {
          this.showModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  selection(e) {
    const curr = this.state.selected;
    if (this.state.selected.includes(e.target.id)) {
      const index = this.state.deletion.indexOf(e.target.id);
      curr.splice(index);
      this.setState({ deletion: curr });
    } else {
      curr.push(e.target.id);
      this.setState({ deletion: curr });
    }
  }

  render() {
    return this.state.login ? (
      <Login signin={this.signin.bind(this)} />
    ) : (
      <div>
        <h1 className="title">Job Application Tracker</h1>
        <button onClick={this.showModal} className="add-button">
          Add More Job Applications
        </button>
        <button onClick={this.delete} className="add-button">
          Delete
        </button>
        <button className="add-button" onClick={this.select}>
          Update
        </button>
        <h2>Job Application Dashboard</h2>
        <div>
          {this.state.modal ? (
            <Modal
              status={this.state.modal}
              user={this.getUserinfo}
              status={this.getStatus}
              graph={this.getGraphInfo}
              pie={this.getPieInfo}
              info={this.state.update}
              delete={this.delete}
              close={this.closeModal}
            />
          ) : (
            ""
          )}
        </div>
        <Display information={this.state.info} select={this.selection} />
        <h2>Job Application Summary Report</h2>
        <div className="dashboard">
          {this.state.status.map((item) => {
            return (
              <div>
                <button className="dashboard-button">
                  {item.status.toUpperCase()}
                </button>
                <p>{item.count}</p>
              </div>
            );
          })}
        </div>
        <div className="visual">
          <Graph info={this.state.dateinfo} />
          <Chart info={this.state.pie} />
          <Status info={this.state.status} />
        </div>
      </div>
    );
  }
}

export default App;
