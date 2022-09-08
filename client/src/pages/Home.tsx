import axios from 'axios';
import { useEffect, useState } from 'react'
import LayoutApp from '../components/Layout'
import {Row, Col} from 'antd';
import Product from '../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('pizzas');
  const categories = [
    {
      name: "pizzas",
      imgUrl: "/images/Food/Pizza/Pepperoni-Pizza-Transparent-PNG.png",
    },{
      name: "burgers",
      imgUrl: "/images/Food/Burgers/Bacon-Cheese-Burger-PNG-Pic.png",
    },{
      name: "drinks",
      imgUrl: "/images/Drink/1-2-drink-png-12.png",
    }
  ]
  
  useEffect(() => {
    const getAllProducts = async () => {
      try{
        dispatch({ type: "SHOW_LOADING" })
        const {data} = await axios.get('/api/products/getproducts');
        setProductData(data);   
        dispatch({ type: "HIDE_LOADING" })     
      } catch(error){
        console.log(error)
      }
    }
  
    getAllProducts()
  }, [dispatch])
  
  return (
    <LayoutApp>
      <div className="category">
        {categories.map(category => (
          <div key={category.name} className={`category-flex ${selectedCategory === category.name && 'category-active'}`}
          onClick={()=>setSelectedCategory(category.name)}
          >
            <h3 className="category-name">{category.name}</h3>
            <img src={category.imgUrl} alt={category.name} width={60} height={60} />
          </div>
        ))}
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
        {productData.filter(i=>i.category === selectedCategory).map(product=>(
          <Col key={product._id} >
            <Product key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  )
}

export default Home