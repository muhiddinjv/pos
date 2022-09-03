import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import LayoutApp from '../components/Layout'

const Cart = () => {
    const dispatch = useDispatch();
    
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
  return (
    <LayoutApp>
      <h2>Cart</h2>
      <Table dataSource={cartItems} columns={columns} bordered/>
    </LayoutApp>
  )
}

export default Cart