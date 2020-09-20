import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  function searchData(){
    
  }

  return (
    <div>
      <form className = "form">
        <div className = "center">
          <div className = "verticalAlign">
            <div className = "tile">
              <label>Enter Email</label>
              <input type = "text" value = {email} onChange = {e => setEmail(e.target.value)} placeholder = "abc@gmail.com"></input>
              <input type='submit' className='btn' onClick = {() => {searchData()}} value = "Search Details">
              </input>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
};

export default Dashboard;
