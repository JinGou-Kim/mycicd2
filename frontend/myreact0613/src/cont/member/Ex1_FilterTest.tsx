import React from 'react'
//member/Ex1_FilterTest.tsx
//Singups.tsx에서 적용된 체크박스가 선택되면 저장하고, 해제 되면 
//배열에서 그 값을 제거 하기 위한 테스트 버전 
const Ex1_FilterTest: React.FC = () => {
  const name="hobby";
  const value="음악"; //체크가 안된 값
  const checked = false;
  const selectedHobbies = ['독서','운동','음악'];
  const result = {
    //hobby:key , value: 지금 체크대상이 되는 값이라고 가정 
    //checked : 체크박스에서 체크 되는 값 true 체크 ,false 체크 해제 
    // selectedHobbies 선택한 취미라고 가정 
    // 체크가 false라면 체크 안한거니까 음악만 빼는 필터링을 하고 다시 배열로 변환 
     [name]:checked?value:selectedHobbies.filter(h => h !== value)
  }
  console.log(result)
  return (
    <div>
      <h1>Filter Test</h1>
    </div>
  )
}
export default Ex1_FilterTest