import React from "react";
import { app } from "../firebase_config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendEmailVerification,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import axios from "axios";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      create: false,
      signin: false,
      click: false,
      token: "",
      url: "",
      create: false,
    };
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
  }
  //create user with email and password
  createUser() {
    if (this.props.login === true) {
      this.signout();
    } else {
      event.preventDefault();
      const auth = getAuth(app);
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((info) => {
          this.setState({ token: info.user.accessToken });
          axios
            .post("/user", {
              uid: info.user.uid,
              name: this.state.username,
            })
            .then(() => {
              console.log("collecting data");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .then(() => {
          alert("Thanks you! ");
          this.setState({ click: false });
          this.props.signin();
        })
        .catch((err) => {
          alert("Please try again!");
          console.log(err.message);
        });
    }
  }

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(() => {
        console.log("Welcome back!");
        this.props.signin();
      })
      .catch((err) => {
        alert("Please try again!");
        console.log(err.message);
      });
  }

  switch() {
    const creation = this.state.create;
    this.setState({ create: !creation });
  }

  change(e, item) {
    this.setState({ [item]: e.target.value });
  }

  render() {
    return (
      <div>
        {this.state.create ? <h3>User Name</h3> : ""}
        {this.state.create ? (
          <input
            type="text"
            onChange={(e) => {
              this.change(e, "username");
            }}
          />
        ) : (
          ""
        )}

        <h3>Email</h3>
        <input
          type="text"
          onChange={(e) => {
            this.change(e, "email");
          }}
        />
        <h3>Password</h3>
        <input
          type="password"
          onChange={(e) => {
            this.change(e, "password");
          }}
        />
        {this.state.create ? (
          <div>
            Already have an account?{" "}
            <u onClick={this.switch.bind(this)}>Log in</u>
          </div>
        ) : (
          <div>
            Don't have an account?{" "}
            <u onClick={this.switch.bind(this)}>Sign Up</u>
          </div>
        )}
        {this.state.create ? (
          <button onClick={this.createUser}>Create</button>
        ) : (
          <button onClick={this.login}>Log In</button>
        )}
      </div>
    );
  }
}
export default Login;
