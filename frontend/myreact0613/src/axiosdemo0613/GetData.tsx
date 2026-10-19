import React, { useState } from 'react';
import axios from 'axios';
// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// }
//interface의 이름은 MyJson 으로 만들어 보기
interface MyJson{
    userId:number;
    id:number;
    title:string;
    body:string;
}
const GetData: React.FC = () => {

  //  myData , MyJson을 제네릭으로 하는 useState만들기 
    const [myData,setMydata] = useState<MyJson|null>(null);

  const handleGet = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      //JSON.stringify() : javascript Object를 자바스크립트 string으로 변경 
      //JSON.stringify(value, replacer, space)
      //replacer :함수 정의 영역 특정한 속성을 선택해서 조작 이럴 함수를 정의 , 있는 그대로 반환 null
      //space: 들여쓰기 간격을 지정하는 값 , 들여쓰기를 2칸 공백으로 맞춰서 보기 좋게 출력
      //alert(`데이터 가져오기 성공:\n${JSON.stringify(response.data, null, 2)}`);
      console.log(`typeof:${response.data} => ${typeof(response.data)}`);
      setMydata(response.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
      alert('데이터 가져오기 실패');
    }
  };
  return (
    <div>
      <h2>Axios GET 요청 예제</h2>
      <button onClick={handleGet}>데이터 가져오기</button>
      <div>
        {myData?.userId} <br/>, {myData?.title}  <br/>, {myData?.body}  <br/>
      </div>

    </div>
  );
};
export default GetData;