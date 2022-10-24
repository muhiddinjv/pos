import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import Validate from './Validate'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value: any) => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      const res = await axios.post('/api/users/login', value);
      console.log('inpvalue',value);
      message.success('Logged In Successfully!')
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate('/');
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      message.error('Error!')
      console.log(error)
    }
  }

  useEffect(() => {
    if(localStorage.getItem("auth")){
      localStorage.getItem("auth")
      navigate('/')
    }
  }, [navigate]);
  
  return (
    <div className='form'>
      <h2>MP POS</h2>
      <p>Login</p>
      <div className="form-group">
      <Form layout='vertical' onFinish={handleSubmit}>
          <FormItem name='userId' label='User ID'>
            <Input type='number' required/>
            {/* <Validate /> */}
          </FormItem>
          <FormItem name='password' label='Password'>
            <Input type='password' required/>
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