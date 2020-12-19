import { Component } from "react";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";

class FilterTags extends Component {
  render() {
    return (
      <div className="filters">
        {this.props.types.map((i) => (
          <Button
            className={i.isSelected ? "btnFilter " + i.style : "btnFilter"}
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
