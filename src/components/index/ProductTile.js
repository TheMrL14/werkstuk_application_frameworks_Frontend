import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import BasketContext from "../../BasketContext";

class ProductTile extends Component {
  render() {
    const prod = this.props.product;
    return (
      <BasketContext.Consumer>
        {(basket) => (
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
              <IconButton
                edge="end"
                className={"basketButton"}
                color="inherit"
                aria-label="open drawer"
                onClick={() => basket.addItem(prod)}
                to="/crate"
              >
                <ShoppingBasket></ShoppingBasket>
              </IconButton>
            </CardActions>
          </Card>
        )}
      </BasketContext.Consumer>
    );
  }
}

export default ProductTile;
