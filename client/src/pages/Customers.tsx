import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../components/Layout'

const Customers = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);


  const getAllCustomers = async () => {
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
    getAllCustomers()
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
    }
  ]

  return (
    <LayoutApp>
      <h2>All Customers</h2>
      <Table rowKey="_id" dataSource={billsData} columns={columns} bordered scroll={{ x: true }}/>
    </LayoutApp>
  )
}

export default Customers