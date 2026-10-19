//Ex1_UseEffectFetch.tsx

import React, { useState } from 'react'
//http://192.168.0.5/ajax0612/mymessage : 서버측 데이터의 주소 값 
//{"msg":"안녕하세요 반가워요","name":"테스형"}
//fetch함수를 사용하면 비동기식 데이터 즉 ajax를 지원해주는 함수이다.
//fetch(url).then(response => response.json()).then(data => {데이터 처리}).catch(error=>에러처리)
const Ex1_UseEffectFetch: React.FC = () => {
    // 방법1)
    // 받은 데이터는 json => javascript object 받으면 됨 JSON.parse(data) : obj 
    // {msg:"안녕하세요 반가워요",name:"테스형"} => useState({})
    // 방법2) 
    // 받은 데이터는 json => javascript object 받으면 됨 JSON.parse(data) : obj 
//http://192.168.0.5/ajax0612/userdemo?num=1
    // 서버의 메세지를 응답받아서 관리할 상태설정
    const [message, setMessage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const fetchData = () => {
        let url = 'http://192.168.0.5/ajax0612/mymessage';
        //alert("버튼!");
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(`name : ${data.name}`);
                console.log(`msg : ${data.msg}`);
                //setter사용해서 받은 값을 useState에 저장
                setMessage(data.msg);
                setName(data.name);

            })
            .catch(error => console.log(`error : ${error}`));
    }
    return (
        <div>
            <h2>Fetch ~ Then문 </h2>
            <button onClick={fetchData}>Fetch Message</button>
            {/* useState의 값을 연결 */}
            <div>{message ? message : '아직 메세지가 없음!'}</div>
            <div>{name ? name : '아직 Name 없음!'}</div>
        </div>
    )
}

export default Ex1_UseEffectFetch