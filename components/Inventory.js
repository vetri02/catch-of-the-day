import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from "../components/AddFishForm";
import EditFishForm from "../components/EditFishForm";
import Login from "../components/Login";
import base, { firebaseApp } from "../util/base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    storeId: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };
  authenticate = provider => {
    let authProvider;

    switch (provider) {
      case "Twitter": {
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
      }
      case "Facebook": {
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      }
      case "Github": {
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
      }
    }

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
