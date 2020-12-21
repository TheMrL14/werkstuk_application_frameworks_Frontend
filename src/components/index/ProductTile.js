import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class ProductTile extends Component {
  render() {
    const prod = this.props.product;
    return (
      <Card key={prod.productName}>
        <CardContent>
          <Typography className={prod.category}>{prod.category}</Typography>
          <Typography variant="h5" component="h1">
            {prod.productName}
          </Typography>
          <Typography color="textSecondary">{prod.price}€</Typography>
          <Typography variant="body2" component="p">
            {prod.description}
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
