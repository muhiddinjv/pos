import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../components/Layout'

const Admin = () => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);


  const getAllUsers = async () => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      const {data} = await axios.get('/api/users/getusers');
      setUsersData(data);   
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const columns = [
    {
      title:'Id',
      dataIndex: '_id',
    },{
      title: 'Name',
      dataIndex: 'name',
    },{
      title:'Email',
      dataIndex: 'email',
    },{
      title:'Password',
      dataIndex: 'password',
    }
  ]

  return (
    <LayoutApp>
      <h2>All Users</h2>
      <Table rowKey="_id" dataSource={usersData} columns={columns} bordered scroll={{ x: true }}/>
    </LayoutApp>
  )
}

export default Admin;