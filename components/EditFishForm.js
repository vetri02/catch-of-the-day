import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func
  };
  handleChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };

    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          name="price"
          type="text"
          placeholder="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea
          name="desc"
          placeholder="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          name="image"
          type="text"
          placeholder="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
