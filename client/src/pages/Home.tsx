import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LayoutApp from '../components/Layout'
import {Row, Col} from 'antd';
import Product from '../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any[]>([])
  
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
      <Row>
        {productData.map(product=>(
          <Col key={product._id} xs={24} sm={6} md={12} lg={6}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  )
}

export default Home