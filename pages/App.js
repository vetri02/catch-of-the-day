import React, { Fragment } from "react";
import PropTypes from "prop-types";
import base from "../util/base";

import Header from "../components/Header";
import Order from "../components/Order";
import Inventory from "../components/Inventory";
import Head from "../components/head";
import sampleFishes from "../util/sample-fishes";
import Fish from "../components/Fish";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      fishes: {},
      order: {}
    };
  }

  static propTypes = {
    storeId: PropTypes.string
  };

  static async getInitialProps({ query: { storeId } }) {
    return { storeId };
  }

  componentDidMount() {
    const localStorageRef = localStorage.getItem(this.props.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
    this.refs = base.syncState(`${this.props.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.refs);
    // console.log("dfsa");
  }
  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;

    this.setState({
      fishes
    });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;

    this.setState({
      fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({
      order
    });
  };

  removeOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({
      order
    });
  };

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  render() {
    return (
      <Fragment>
        <Head title="Catch of the day" />
        {/* <p>{this.props.storeId}</p> */}
        <input
          type="checkbox"
          id="fold"
          checked={this.state.isChecked}
          onChange={this.toggleChange}
        />
        <label htmlFor="fold">Fold</label>
        <div
          className={`catch-of-the-day ${
            this.state.isChecked ? "" : "checked"
          }`}
        >
          <div className="menu">
            <Header tagline="Fresh Sea Wood" />
            <ul className="fishes">
              {Object.keys(this.state.fishes).map(key => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ))}
            </ul>
          </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            removeOrder={this.removeOrder}
          />
          <Inventory
            addFish={this.addFish}
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}
            storeId={this.props.storeId}
          />
          <style jsx>{``}</style>
        </div>
      </Fragment>
    );
  }
}

export default App;
