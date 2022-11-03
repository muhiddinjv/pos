import { Table, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LayoutApp from '../components/Layout';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState([]);

  const getAllUsers = async () => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      const {data} = await axios.get('https://sypos.herokuapp.com/api/users/getusers');
      setUsersData(data);   
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      console.log(error)
    }
  }

  const token: any = localStorage.getItem('usertoken');
  const currentuser: any = jwt_decode(token);

  useEffect(() => {
    getAllUsers()
  }, [])

  const handleDelete = async (user: any) => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      await axios.post('/api/users/deluser', {userId: user._id});
      // await axios.post('https://sypos.herokuapp.com/api/users/deluser', {userId: user._id});
      message.success('User Deleted successfully!')
      getAllUsers();
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      message.error('Error!')
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },{
      title:'Email',
      dataIndex: 'email',
    },{
      title:'Birthday',
      dataIndex: 'birthday',
    },{
      title:'Password',
      dataIndex: 'password',
    },{
      title:'Action',
      dataIndex: '_id',
      render: (_id: any, user: any) => <div>
        <DeleteOutlined className='cart-action' style={{cursor:'pointer'}} onClick={()=>handleDelete(user)}/>
      </div>
    },
  ]

  return (
    <>
      {currentuser?.isAdmin ? <LayoutApp>
        <h2>All Users</h2>
        <Table rowKey="_id" dataSource={usersData} columns={columns} bordered scroll={{ x: true }}/>
      </LayoutApp> : navigate('/')}
    </>
  )
}

export default Admin;