import { Button, Form, Input, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const handleSubmit = (value: any) => {
        console.log(value);
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