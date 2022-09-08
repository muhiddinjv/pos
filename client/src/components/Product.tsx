import {Button, Card} from 'antd';
import { useDispatch } from 'react-redux';

const Product = ({product}: any) => {
  const dispatch = useDispatch();
  
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {...product, quantity: 1}
    })
  }
  const {Meta} = Card;
  return (
      <Card 
        hoverable
        style={{width:240, marginBottom: 20}}
        cover={<img src={product.image} alt={product.name} style={{height:200}}/>}
      >
        <Meta title={product.name} description={`$${product.price}`} style={{height:'60px'}} />
        <div className="product-btn">
          <Button onClick={()=>addToCart()}>Add To Cart</Button>
        </div>
      </Card>
  )
}

export default Product