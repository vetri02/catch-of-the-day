import React, { Fragment } from "react";
import Router from "next/router";
import { getFunName } from "../util/helpers";

class StorePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  storeName = React.createRef();

  goToStore = event => {
    event.preventDefault();
    console.log(this);
    console.log(this.storeName.current.value);
    Router.push({
      pathname: "/App",
      query: { storeId: this.storeName.current.value }
    });
  };
  render() {
    return (
      <Fragment>
        {/* Wrapper */}
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter a Store</h2>
          <input
            type="text"
            ref={this.storeName}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
