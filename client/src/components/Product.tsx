import {Button, Card} from 'antd';
import { useDispatch } from 'react-redux';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// actions={[
//   <SettingOutlined key="setting" />,
//   <EditOutlined key="edit" />,
//   <EllipsisOutlined key="ellipsis" />,
// ]}


// interface ProductsProps {
//   product:{
//     name: string;
//     category: string;
//     price: number;
//     image: string;
//     id: string;
//   }  
// }

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
        <Meta title={product.name} description={product.category} style={{height:'60px'}} />
        <div className="product-btn">
          <Button onClick={()=>addToCart()}>Add To Cart</Button>
        </div>
      </Card>
  )
}

export default Product
//https://app.filtered.ai/interview/room/7e0021a90a5d763b61a8d7c82d59d89575a89ad6c83ad1fd0da4018a902a7e74