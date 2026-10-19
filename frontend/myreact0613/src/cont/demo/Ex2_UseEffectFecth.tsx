import React, { useEffect, useState } from 'react'
//server : http://192.168.0.5/ajax0612/userdemo?num=1
//data
// {
//   "id": 1,
//   "name": "리앤 그레이엄",
//   "username": "테스형",
//   "email": "tess@a.com",
//   "address": {
//     "street": "쿨라스 라이트",
//     "suite": "아파트 556",
//     "city": "그웬버러",
//     "zipcode": "92998-3874",
//     "geo": {
//       "lat": "-37.3159",
//       "lng": "81.1496"
//     }
//   },
//   "phone": "010-111-8888",
//   "website": "tess@tess.com",
//   "company": {
//     "name": "로마게라-크로나",
//     "catchPhrase": "다층 클라이언트-서버 신경망",
//     "bs": "실시간 전자시장 활용"
//   }
// }
// json데이터를 보면서 typescript의 interface정의 하기
// 만약 자바라면 Has'a 관계 address -> geo
// class AddressVO {   private GeoVO gvo; }
interface Geo {
    lat: string;
    lng: string;
}
interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo; // geo변수의 자료형은 interface인 Geo이다. 
}
interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address; // *
    phone: string;
    website: string;
    company: Company; // *
}
const Ex2_UseEffectFecth: React.FC = () => {
    //Interface인 UserData전용 useState 훅을 선언
    const [userData, setUserData] = useState<UserData | null>(null);
    //데이터 많거나, 로딩이 생길수 있다.
    const [loading, setLoading] = useState(false);
    // 마운트시 : 처음 한번만 fetch를 사용해서 불러와서 useState에 저장고 출력하려고 한다.
    // useEffect(()=>{},[]) 
    useEffect(() => {
        //fetch를 사용하면서 useState에 값을 저장 
        /*const fetchUserData = async () => {};  비동기 함수이다.
        await 키워드를 사용하여 비동기 작업이 완료될 때까지 기다리게 한다.
        */
        const fetchUserData = async () => {
            setLoading(true);  //로딩 시작 값 설정
            let url = "http://192.168.0.5/ajax0612/userdemo?num=1";
            const response = await fetch(url);
            //마찬가지로 await 때문에 변환이 끝날때 까지 대기한다.
            const data = await response.json();
            setUserData(data); //javascript로 변환된 데이터를 useState에 저장한다
            setLoading(false);  //로딩 종료 값 설정
        }
        fetchUserData(); //call!
    }, []);
    if (loading) {
        return <div>데이터를 로딩 중입니다.!</div>
    }
    return (
        <div>
            <h1>Ex2_UserEffectFecth</h1>
            {
                userData ? (
                    <>
                        <p>Name: {userData.name}</p>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                        <p>Address: {userData.address.street}, {userData.address.suite},
                            {userData.address.city}, {userData.address.zipcode}</p>
                        <p>Company: {userData.company.name} - {userData.company.catchPhrase}</p>
                        <p>Phone: {userData.phone}</p>
                        <p>Website: {userData.website}</p>
                        <p>Geo : {userData.address.geo.lat}/{userData.address.geo.lng}</p>    
                    </>
                ) : (<p>데이터가 없음</p>)
            }
        </div>
    )
}

export default Ex2_UseEffectFecth