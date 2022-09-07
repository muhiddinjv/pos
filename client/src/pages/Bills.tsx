import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../components/Layout';
import { EyeOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd';

const Bills = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [seletedBill, setSeletedBill] = useState<any>(false);
  
  const getAllBills = async () => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      const {data} = await axios.get('/api/bills/getbills');
      setBillsData(data);   
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBills()
  }, [])

  const columns = [
    {
      title:'ID',
      dataIndex: '_id',
    },{
      title: 'Customer Name',
      dataIndex: 'customerName',
    },{
      title:'Contact Number',
      dataIndex: 'customerPhone',
    },{
      title:'Contact Adress',
      dataIndex: 'customerAdress',
    },{
      title:'Sub Total',
      dataIndex: 'subTotal',
    },{
      title:'Tax',
      dataIndex: 'tax',
    },{
      title:'Total Amount',
      dataIndex: 'totalAmount',
    },
    
    {
      title:'Action',
      dataIndex: '_id',
      render: (_id: any, record: any) => <div>
        <EyeOutlined className='cart-edit eye' onClick={()=>{setSeletedBill(record); setPopModal(true)}}/>
      </div>
    },
  ]



  return (
    <LayoutApp>
      <h2>All Invoices</h2>
      <Button className='add-new' onClick={()=>setPopModal(true)}>Add New</Button>
      <Table dataSource={billsData} columns={columns} bordered/>
      {popModal && 
        <Modal title='Invoice Details' width={400} visible={popModal} onCancel={()=>{setPopModal(false)}} footer={false}>
          <div className="card">
            <div className="card-header">
              <h2 className="logo">MP POS</h2>
              <span>Number: <b>+998935399093</b></span>
              <span>Adress: <b>Keles, Tashkent Region</b></span>
            </div>
            <div className="card-body">
              <div className="group">
                <span>Customer Name:</span>
                <span><b>{seletedBill.customerName}</b></span>
              </div>
              <div className="group">
                <span>Customer Phone:</span>
                <span><b>{seletedBill.customerPhone}</b></span>
              </div>
              <div className="group">
                <span>Customer Adress:</span>
                <span><b>{seletedBill.customerAdress}</b></span>
              </div>
              <div className="group">
                <span>Date Order:</span>
                <span><b>{seletedBill.createdAt.toString().substring(0, 10)}</b></span>
              </div>
              <div className="group">
                <span>Total Amount:</span>
                <span><b>${seletedBill.totalAmount}</b></span>
              </div>
            </div>
            <div className="footer">
              <div className="card-footer">
                <h4>Your Order</h4>
                {seletedBill.cartItems.map((product: any)=>(
                  <>
                    <div className="footer-card">
                      <div className="group">
                        <span>Product:</span>
                        <span><b>{product.name}</b></span>
                      </div>
                      <div className="group">
                        <span>Quantity:</span>
                        <span><b>{product.quantity}</b></span>
                      </div>
                      <div className="group">
                        <span>Price:</span>
                        <span><b>${product.price}</b></span>
                      </div>
                    </div>
                  </>
                ))}
                <div className="footer-card_total">
                  <div className="group">
                    <h3>Total:</h3>
                    <h3><b>${seletedBill.totalAmount}</b></h3>
                  </div>
                </div>
                <div className="footer-thanks">
                  <i>Thank you for buying from us</i>
                </div>
              </div>
            </div>
          </div>
        </Modal>}
    </LayoutApp>
  )
}

export default Bills