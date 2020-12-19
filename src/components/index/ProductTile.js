import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class ProductTile extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography className={this.props.product.category}>
            {this.props.product.category}
          </Typography>
          <Typography variant="h5" component="h1">
            {this.props.product.productName}
          </Typography>
          <Typography color="textSecondary">
            {this.props.product.price}€
          </Typography>
          <Typography variant="body2" component="p">
            {this.props.product.description}
          </Typography>
        </CardContent>
        <CardActions style={{ float: "right" }}>
          <Button className="btnDetails" size="small">
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default ProductTile;
