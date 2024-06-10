

import useQuery from '../hooks/useQuery';
import { useApi } from '../services/userApi';
import '../Styles/Dashboard.css'
const Profile = () => {
  const { dashBoard } = useApi();
  const { data } = useQuery(dashBoard);
  
  return (
    <div className='container1'>
      <h2 className='heading'>Welcome to Your Profile</h2>
      <p className='greeting'>Hello, this is your profile page where you can view your favorite cricketers.</p>
      <div className='cricketerContainer'>
        <h3>Cricketers</h3>
        <div className='cricketerList'>
          {data && data.cricketers.map(cricketer => (
            <div key={cricketer.id} className='cricketerCard'>
              <img src={cricketer.image_url} alt={cricketer.name} className='cricketerImage' />
              <h4 className='cricketerName'>{cricketer.name}</h4>
              <p><strong>Country:</strong> {cricketer.country}</p>
              <p><strong>Date of Birth:</strong> {cricketer.date_of_birth}</p>
              <div className='statistics'>
                <p><strong>Matches:</strong> {cricketer.career_statistics.matches}</p>
                <p><strong>Runs:</strong> {cricketer.career_statistics.runs}</p>
                <p><strong>Wickets:</strong> {cricketer.career_statistics.wickets}</p>
                <p><strong>Batting Average:</strong> {cricketer.career_statistics.batting_average}</p>
                <p><strong>Bowling Average:</strong> {cricketer.career_statistics.bowling_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
