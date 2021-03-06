import React, { Component } from "react";

export default class Profile extends Component {
  state = {
    profile: null,
    error: "",
  };

  componentDidMount = () => {
    console.log("mount");
    this.loadUserProfile();
  };

  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  };

  render = () => {
    const profile = this.state.profile;
    if (!profile) return null;
    return (
      <section className="content">
        <h1>Profile</h1>
        <p>{profile.nickname}</p>
      </section>
    );
  };
}
