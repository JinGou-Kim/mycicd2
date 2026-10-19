import React, { useEffect, useState } from 'react'
//Ex3_LocalStorage
const Ex3_LocalStorage: React.FC = () => {

    const [msg, setMsg] = useState<string | null>('');
    //여러분이 해보기 브라우저가 초기화 되었을 때 , 처음부터 랜더링될 때
    //localStorage에서 msg를 읽어와서 useState에 저장해보기 
    useEffect(() => {
        setMsg(localStorage.getItem("msg"));
        //setMsg(sessionStorage.getItem("msg"));
    }, [])
    return (
        <div>
            <p style={{ backgroundColor: "orange", color: "white" }}>
                {msg}
            </p>
        </div>
    )
}

export default Ex3_LocalStorage