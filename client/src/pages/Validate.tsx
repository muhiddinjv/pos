import { Input } from 'antd';
import { useState } from 'react'

const Validate = () => {
    const [isValid, setIsValid] = useState(false);
    const [messages, setMessages] = useState('');

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const validateEmail = (event: any) => {
      const email = event.target.value;
      if (emailRegex.test(email)) {
        setIsValid(true);
        setMessages('Your email looks good!');
      } else {
        setIsValid(false);
        setMessages('Please enter a valid email!');
      }
    };

    setTimeout(() => setMessages(''), 4000);
    
    return (
        <>
            <Input type='email' onChange={validateEmail} required/>
            <div className={`email ${isValid ? 'success' : 'error'}`}>
                {messages}
            </div>
        </>
    )
}

export default Validate