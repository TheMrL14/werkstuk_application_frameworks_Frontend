import { Component } from "react";
import Button from "@material-ui/core/Button";

class FilterTags extends Component {
  render() {
    return (
      <div>
        {this.props.types.map((i) => (
          <Button
            className={i.isSelected ? "button " + i.style : "button"}
            onClick={() => this.props.onClick(i.category)}
          >
            {i.category}
          </Button>
        ))}
      </div>
    );
  }
}

export default FilterTags;
