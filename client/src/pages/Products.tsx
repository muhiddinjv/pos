import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../components/Layout';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';


const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState();
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(false);

  const herokuproducts = 'https://sypos.herokuapp.com/api/products';
  // const herokuproducts = '/api/products';

  const getAllProducts = async () => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      const {data} = await axios.get(`${herokuproducts}/getproducts`);
      setProductData(data);   
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const handleSubmit = async (value: any) => {
    if(editProduct === false){
      try{
        dispatch({ type: "SHOW_LOADING" })
        await axios.post(`${herokuproducts}/addproducts`, value);
        message.success('Product Added successfully!')
        getAllProducts();
        setPopModal(false);
        dispatch({ type: "HIDE_LOADING" })     
      } catch(error){
        message.error('Error!')
        console.log(error)
      }
    } else {
      try{
        dispatch({ type: "SHOW_LOADING" })
        await axios.put(`${herokuproducts}/udpateproducts`, {...value, productId: editProduct._id});
        message.success('Product Updated successfully!')
        getAllProducts();
        setPopModal(false);
        dispatch({ type: "HIDE_LOADING" })     
      } catch(error){
        message.error('Error!')
        console.log(error)
      }
    }
  }

  const handleDelete = async (record: any) => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      await axios.post(`${herokuproducts}/deleteproducts`, {productId: record._id});
      message.success('Product Deleted successfully!')
      getAllProducts();
      setPopModal(false);
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      message.error('Error!')
      console.log(error)
    }
  }

  const columns = [
    {
      title:'Name',
      dataIndex: 'name',
    },{
      title: 'Image',
      dataIndex: 'image',
      render: (image: string | undefined, record: { name: string | undefined; }) => <img src={image} alt={record.name} height={60} width={60}/>
    },{
      title:'Price',
      dataIndex: 'price',
    },{
      title:'Action',
      dataIndex: '_id',
      render: (_id: any, record: any) => <div>
        <DeleteOutlined className='cart-action' style={{cursor:'pointer'}} onClick={()=>handleDelete(record)}/>
        <EditOutlined className='cart-edit' onClick={()=>{setEditProduct(record); setPopModal(true)}}/>
      </div>
    },
  ]
  
  return (
    <LayoutApp>
      <h2>All Products</h2>
      <Button className='add-new' onClick={()=>setPopModal(true)}>Add New</Button>
      <Table rowKey="_id" dataSource={productData} columns={columns} bordered scroll={{ x: true }}/>
      {popModal && 
        <Modal title={`${editProduct !== false ? 'Edit Product' : 'Add New Product'}`} 
        visible={popModal} onCancel={()=>{setEditProduct(false); setPopModal(false)}} footer={false}>
          <Form layout='vertical' initialValues={editProduct} onFinish={handleSubmit}>
            <FormItem name='name' label='Name'>
              <Input />
            </FormItem>
            <FormItem name='category' label='Category'>
              <Select>
                <Select.Option value='pizzas'>Pizzas</Select.Option>
                <Select.Option value='burgers'>Burgers</Select.Option>
                <Select.Option value='drinks'>Drinks</Select.Option>
              </Select>
            </FormItem>
            <FormItem name='price' label='Price'>
              <Input />
            </FormItem>
            <FormItem name='image' label='Image URL'>
              <Input />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Add</Button>
            </div>
          </Form>
        </Modal>}
    </LayoutApp>
  )
}

export default Products