import { Button, Form, Input, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const handleSubmit = (value: any) => {
        console.log(value);
    }
  return (
    <div className='form'>
        <h2>MP POS</h2>
        <p>Register</p>
        <div className="form-group">
        <Form layout='vertical' onFinish={handleSubmit}>
            <FormItem name='name' label='Name'>
              <Input type='text'/>
            </FormItem>
            <FormItem name='userId' label='User ID'>
              <Input type='text'/>
            </FormItem>
            <FormItem name='password' label='Password'>
              <Input type='password' />
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