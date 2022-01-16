const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const pg = require("pg-promise")();
const connection = {
  host: "localhost",
  user: "postgres",
  database: "mvp",
  port: 5432,
};
const db = pg(connection);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.listen("3000", () => {
  console.log("listening to port 3000!");
});

app.get("/info", (req, res) => {
  const uid = req.query;
  db.query(`select name from user_info where uid = uid`)
    .then((response) => {
      const name = response[0].name;
      return db.query(`select * from info where user_name = '${name}'`);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/info", (req, res) => {
  const user_name = "user1";
  const name = req.body.name;
  const position = req.body.position;
  const url = req.body.url;
  const date = req.body.date;
  const status = req.body.status;
  const importance = req.body.importance;
  const comment = req.body.comment;
  db.query(
    `insert into info (user_name,name,position, url,date,importance,status,comment)
  values('${user_name}', '${name}', '${position}', '${url}','${date}','${importance}','${status}','${comment}')`
  )
    .then(() => {
      res.status(200).send("POST IT");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/info/delete", (req, res) => {
  const id = req.body.id;
  db.query(`delete from info where id in (${id})`)
    .then(() => {
      res.send("removed it from the dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/info/date", (req, res) => {
  const username = req.query.name;
  db.query(
    `select date, count(*) from info where user_name = '${username}' group by date order by date`
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/info/pie", (req, res) => {
  const username = req.query.name;
  db.query(
    `select position, count(*) from info where user_name = '${username}' group by position`
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/info/status", (req, res) => {
  const username = req.query.name;
  db.query(
    `select status, count(*) from info where user_name = '${username}' group by status`
  )
    .then((data) => {
      console.log("data is", data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user", (req, res) => {
  console.log(req.body);
  const uid = req.body.uid;
  const name = req.body.name;
  db.query(`insert into user_info (uid,name) values('${uid}', '${name}')`)
    .then(() => {
      console.log("inserted data");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user", (req, res) => {
  const uid = req.query;
  console.log(uid);
  db.query(`select name from user_info where uid = uid`)
    .then((response) => {
      const name = response[0].name;
      console.log(name);
      res.send(name);
    })
    .catch((err) => {
      console.log(err);
    });
});
