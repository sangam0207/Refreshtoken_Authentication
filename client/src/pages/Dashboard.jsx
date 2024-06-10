
import { useAuth } from '../context/authContext';
import { axiosPublic } from '../api/axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const { userInfo,setToken } = useAuth();
  const { name, email } = userInfo;
  const navigate=useNavigate()
const handleLogout=async()=>{
  console.log('logout Successfully');
  try {
    const res=await axiosPublic.get('/logout');
    if(res.statusText){
      setToken(null)
      navigate('/login')
    }
  } catch (error) {
    console.log(error.message)
    navigate('/user')
  }
  
}
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, {name}!</h1>
      <div style={styles.email}>{email}</div>

      <button onClick={handleLogout} style={{backgroundColor:'red',color:'white',fontWeight:'bold'}}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  email: {
    fontSize: '32px',
    color: '#555',
  },
};

export default Dashboard;
