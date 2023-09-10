import React, { useState } from "react";
import "./SignUpForm.css";
import logo from "../../images/logo.png";
import Navbar from "../Navbar/Navbar";
import ProviderCheckbox from "./ProviderCheckbox";
const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [subscriptions, setSubscriptions] = useState([]); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        subscriptions: subscriptions,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSubscriptionChange = (event) => {
    const subscription = event.target.value;
    if (event.target.checked) {
      setSubscriptions((prevSubscriptions) => [
        ...prevSubscriptions,
        subscription,
      ]);
    } else {
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub !== subscription)
      );
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Sign Up</h2>
        <input
          className="sign-up-input"
          placeholder="Name"
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <input
          className="sign-up-input"
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="sign-up-input"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="subscription-section">
          <h4>Choose Subscriptions:</h4>
          <ProviderCheckbox providerName="Netflix" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="Amazon Prime" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="Disney +" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="BBC iPlayer" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="All 4" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="Apple TV" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="ITV X" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="Britbox" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="Now TV" onChange={handleSubscriptionChange} />
          <br />
          <ProviderCheckbox providerName="Paramount +" onChange={handleSubscriptionChange} />
        </div>
        <input
          className="sign-up-submit-button"
          id="signup"
          type="submit"
          value="Sign Up"
        />
        <br></br>
        <p>Already Signed Up?</p>
        <button onClick={login} className="signup-button">
          Log In here!
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
