import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons'
import { Layout, Table } from 'antd'
import LayoutApp from '../components/Layout'

const Cart = () => {
    const dispatch = useDispatch();
    
    const {cartItems} = useSelector((state: any) => state.rootReducer)
    
    const handleIncrement = (record: any) => {
      dispatch({
        type: "UPDATE_QTY",
        payload: {...record, quantity: record.quantity + 1}
      })
    }

    const handleDecrement = (record: any) => {
      if(record.quantity !== 1){
        dispatch({
          type: "UPDATE_QTY",
          payload: {...record, quantity: record.quantity - 1}
        })
      }
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
          <MinusCircleOutlined className='cart-minus' onClick={()=>handleDecrement(record)}/>
          <strong className='cart-quantity'>{record.quantity}</strong>
          <PlusCircleOutlined onClick={()=>handleIncrement(record)} className='cart-plus' />
        </div>
      },{
        title:'Action',
        dataIndex: '_id',
        render: (id: any, record: any) => <DeleteOutlined />
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