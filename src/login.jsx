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
  }

  createUser(e) {
    if (this.props.login === true) {
      this.signout();
    } else {
      event.preventDefault();
      const auth = getAuth(app);
      console.log(auth);
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((info) => {
          this.setState({ token: info.user.accessToken });
        })
        .then(() => {
          alert("Thanks you! ");
          e.target.reset();
          this.setState({ click: false });
          this.verifyEmail();
        })
        .catch((err) => {
          alert("Please try again!");
          console.log(err.message);
        });
    }
  }

  signout(e) {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log("sign out");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  switch() {
    const creation = this.state.create;
    this.setState({ create: !creation });
    console.log(this.state.create);
  }

  change(e, item) {
    this.setState({ [item]: e.target.value });
  }

  render() {
    return (
      <div>
        {this.state.create ? <h3>User Name</h3> : ""}
        {this.state.create ? <input type="text" /> : ""}

        <h3>Email</h3>
        <input type="text" onChange={this.change.bind(this)} />
        <h3>Password</h3>
        <input type="password" onChange={this.change.bind(this)} />
        <div>
          Don't have an account? <u onClick={this.switch.bind(this)}>Sign Up</u>
        </div>
        <button onClick={this.props.signin}>
          {this.state.create ? "Create" : "Login"}
        </button>
      </div>
    );
  }
}
export default Login;
