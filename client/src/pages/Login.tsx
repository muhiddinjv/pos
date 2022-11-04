import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import jwt_decode from 'jwt-decode';

// import Validate from './Validate'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function parseJwt (usertoken: any) {
    var base64Url = usertoken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  const handleSubmit = async (value: any) => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      // const res = await axios.post('/api/users/login', value);
      const res = await axios.post('https://sypos.herokuapp.com/api/users/login', value);
      localStorage.setItem("usertoken", JSON.stringify(res.data.user));
      const usertoken = localStorage.getItem('usertoken');
      const currentuser = parseJwt(usertoken);
      dispatch({ type: "SET_CURRENT_USER", payload: currentuser }) 
      message.success('Logged In Successfully!')
      navigate('/');
      dispatch({ type: "HIDE_LOADING" })     
    } catch(error){
      message.error('Incorrect input or not registered!')
    }
  }

  

  useEffect(() => {
    if(localStorage.getItem("usertoken")){
      localStorage.getItem("usertoken")
      navigate('/')
    }
  }, [navigate]);
  
  return (
    <div className='form'>
      <h2>MP POS</h2>
      <p>Login</p>
      <div className="form-group">
        <Form layout='vertical' onFinish={handleSubmit}>
          <FormItem name='name' label='Name'>
            <Input type='text' required/>
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