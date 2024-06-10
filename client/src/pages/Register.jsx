import  { useState } from 'react';
import '../Styles/Login.css';
import { axiosPublic } from '../api/axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
 const[name,setName]=useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const navigate=useNavigate()
    const onSubmit= async(e) =>{
      e.preventDefault();
      console.log(email, password);
      const response = await axiosPublic.post('/register', {name,email, password });
      console.log(response);
      if(response.status==200){
          navigate('/login')
      }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-login">Login</button>
            </form>
        </div>
    );
};

export default Login;
