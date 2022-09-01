import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LayoutApp from '../components/Layout'
import {Row, Col} from 'antd';
import Products from './Products';

const Home = () => {
  const [productData, setProductData] = useState<any[]>([])

  useEffect(() => {
    const getAllProducts = async () => {
      try{
        const {data} = await axios.get('/api/products/getproducts');
        setProductData(data);        
      } catch(error){
        console.log(error)
      }
    }
  
    getAllProducts()
  }, [])
  
  
  return (
    <LayoutApp>
      <Row>
        {productData.map(product=>(
          <Col key={product._id} xs={24} sm={6} md={12} lg={6}>
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  )
}

export default Home