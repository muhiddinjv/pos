import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
// import Validate from './Validate'

const Register = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value: any) => {
    try{
      dispatch({ type: "SHOW_LOADING" })
      await axios.post('https://sypos.herokuapp.com/api/users/register', value);
      message.success('Registered successfully!');
      navigate('/login');
      dispatch({ type: "HIDE_LOADING" });     
    } catch(error){
      message.error('Error!');
      console.log(error);
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
      <p>Register</p>
      <div className="form-group">
        <Form layout='vertical' onFinish={handleSubmit}>
            <FormItem name='name' label='Name'>
              <Input type='text' required/>
            </FormItem>
            <FormItem name='pincode' label='Pin Code'>
              <Input type='number' required />
            </FormItem>
            <FormItem name='password' label='Password'>
              <Input type='password' required/>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Register</Button>
              <Link className='form-other' to='/login'>Login Here!</Link>
            </div>
        </Form>
      </div>
    </div>
  )
}

export default Register