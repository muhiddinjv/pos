import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = async (value: any) => {
        // console.log(value);
        try{
          dispatch({ type: "SHOW_LOADING" })
          await axios.post('/api/users/login');
          message.success('User Login successful!')
          navigate('/');
          dispatch({ type: "HIDE_LOADING" })     
        } catch(error){
          message.error('Error!')
          console.log(error)
        }
    }
  return (
    <div className='form'>
        <h2>MP POS</h2>
        <p>Login</p>
        <div className="form-group">
        <Form layout='vertical' onFinish={handleSubmit}>
            <FormItem name='userId' label='User ID'>
              <Input type='text'/>
            </FormItem>
            <FormItem name='password' label='Password'>
              <Input type='password' />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Login</Button>
              <Link className='form-other' to='/register'>Register Here!</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Login