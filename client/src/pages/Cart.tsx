import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import LayoutApp from '../components/Layout'
import FormItem from 'antd/es/form/FormItem'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {cartItems} = useSelector((state: any) => state.rootReducer)
    
    const incrementQuantity = (record: any) => {
      dispatch({
        type: "UPDATE_CART",
        payload: {...record, quantity: record.quantity + 1}
      })
    }

    const decrementQuantity    = (record: any) => {
      if(record.quantity !== 0){
        dispatch({
          type: "UPDATE_CART",
          payload: {...record, quantity: record.quantity - 1}
        })
      }
    }

    const deleteFromCart = (record: any) => {
      dispatch({
        type: "DELETE_FROM_CART",
        payload: record
      })
    }

    const columns = [
      {
        title:'Name',
        dataIndex: 'name',
      },{
        title: 'Image',
        dataIndex: 'image',
        render: (image: string | undefined, record: { name: string | undefined }) => <img src={image} alt={record.name} height={60} width={60}/>
      },{
        title:'Price',
        dataIndex: 'price',
      },{
        title:'Quantity',
        dataIndex: '_id',
        render: (id: any, record: any) => <div>
          <MinusCircleOutlined className='qty-btn cart-minus' onClick={()=>decrementQuantity  (record)}/>
          <strong className='cart-quantity'>{record.quantity}</strong>
          <PlusCircleOutlined onClick={()=>incrementQuantity(record)} className='qty-btn cart-plus' />
        </div>
      },{
        title:'Action',
        dataIndex: '_id',
        render: (id: any, record: any) => <DeleteOutlined className='cart-action' style={{cursor:'pointer'}} 
          onClick={()=>deleteFromCart(record)}
        />
      },
    ]

    useEffect(() => {
      let temp = 0;
      cartItems.forEach((product: any) => (temp = temp + product.price * product.quantity))
      setSubTotal(temp);
    }, [cartItems])


    const handleSubmit = async (value: any) => {
      console.log('value :>> ', value);

      try {
        const newObject = {
          ...value, cartItems, subTotal,
          tax: Number(((subTotal / 100) * 10).toFixed(2)),
          totalAmount: Number((Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)),
          userId: JSON.parse(localStorage.getItem('auth') || '{}')._id,
        }
        await axios.post('https://sypos.herokuapp.com/api/bills/addbills', newObject);
        message.success('Bill Generated!');
        localStorage.removeItem(cartItems);
        navigate('/bills');
      } catch (error) {
        message.error('Error!');
        console.log(error);
      }

    }
    
  return (
    <LayoutApp>
      <h2>Cart</h2>
      <Table rowKey="_id" dataSource={cartItems} columns={columns} bordered scroll={{ x: true }}/>
      <div className="sub-total">
        <h2>Sub Total: <span>${subTotal.toFixed(2)}</span></h2>
        <button className="add-new" onClick={()=>setBillPopUp(true)}>Create Invoice</button>
      </div>
      <Modal title="Create Invoice" visible={billPopUp} onCancel={()=>setBillPopUp(false)} footer={false}>
      <Form layout='vertical' onFinish={handleSubmit}>
            <FormItem name='customerName' label='Customer Name'>
              <Input />
            </FormItem>
            <FormItem name='customerPhone' label='Customer Phone'>
              <Input />
            </FormItem>
            <FormItem name='customerAdress' label='Customer Adress'>
              <Input />
            </FormItem>
            <FormItem name='paymentMethod' label='Payment Method'>
              <Select>
                <Select.Option value='cash'>Cash</Select.Option>
                <Select.Option value='paypal'>Paypal</Select.Option>
                <Select.Option value='card'>Card</Select.Option>
              </Select>
            </FormItem>
            <div className="total">
              <span>Tax: ${((subTotal / 100) * 10).toFixed(2)}</span><br />
              <span>SubTotal: ${subTotal.toFixed(2)}</span>
              <h3>Total: ${(Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)}</h3>
            </div>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Generate Invoice</Button>
            </div>
          </Form>
      </Modal>
    </LayoutApp>
  )
}

export default Cart