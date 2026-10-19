import axios from 'axios';
import React, { useState } from 'react'

const HelloAxios: React.FC = () => {
  const [msg, setMsg] = useState<string>("");
  const ajaxData = async () => {
    try {
        const response = await axios.get('http://192.168.0.5/myictstudy/hello');
        console.log(response.data);
        setMsg(response.data);
    } catch (error) {
         console.error('데이터 가져오기 실패:', error);
         alert('데이터 가져오기 실패');
    }
    
  } 
  return (
    <div>
      <div>
        {msg}
      </div>
      <button onClick={ajaxData}>click</button>
    </div>
  )
}

export default HelloAxios