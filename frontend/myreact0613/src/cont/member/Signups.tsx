import React, { FormEvent, useState } from 'react'
import style from './signup.module.css'

interface Member {
  username: string;
  email: string;
  password: string;
  gender: string;
  birth: string;
  country: string;
  hobbies: string[];
}

const Signups: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [hobbies, setHobbies] = useState<string[]>([]);

  const [member, setMember] = useState<Member[]>([]);

  // 체크박스 변경 핸들러 (체크 되었나 안되었나에 따라서 배열에 넣거나 뺌)
  const hobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setHobbies([...hobbies, value]); // 체크되면 추가 하고
    } else {
      setHobbies(hobbies.filter(hobby => hobby !== value)); // 체크 해제되면 제거 
    }
  }
  //FormEvent 에서 SubmitEvent 로 변경 한다.
  const addPerson = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //alert("동작!");
    if (username && email && password && gender && birth && country) {
      const newMember: Member = {
        username,
        email,
        password,
        gender,
        birth,
        country,
        hobbies // 선택된 취미 배열 전체 저장
      };
      setMember([...member, newMember])
    }

  };


  return (
    <div className={style.signupContainer}>
      <h2>Signups</h2>
      <form className={style.form} onSubmit={addPerson}>
        <label>아이디</label>
        <div className={style.inputRow}>
          <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} value={username} />
          <button type="button" className={style.checkButton}>중복확인</button>
        </div>
        <label>이메일</label>
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

        <label>비밀번호</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

        <label>성별</label>
        <div className={style.gender}>
          <label><input type="radio" name="gender" id="gender1" value="남자" checked={gender === "남자"}
            onChange={e => setGender(e.target.value)} />남자</label>
          <label><input type="radio" name="gender" id="gender2" value="여자" checked={gender === "여자"}
            onChange={e => setGender(e.target.value)}
          />여자</label>
        </div>
        {/* 스킵라인 - 연습문제 점검 이후 */}
        <label>취미</label>
        <div className={style.hobby}>
          <label>
            <input type="checkbox" value="독서" checked={hobbies.includes("독서")} onChange={hobbyChange} /> 독서
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" value="운동" checked={hobbies.includes("운동")} onChange={hobbyChange} /> 운동
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" value="게임" checked={hobbies.includes("게임")} onChange={hobbyChange} /> 게임
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" value="여행" checked={hobbies.includes("여행")} onChange={hobbyChange} /> 여행
          </label>
        </div>

        <label>생년월일</label>
        <input type="date" name="birth" id="birth" onChange={e => setBirth(e.target.value)} value={birth} />

        <label>국가</label>
        <select name="country" id="country" onChange={e => setCountry(e.target.value)} value={country}>
          <option value="">국가 선택</option>
          <option value="한국">한국</option>
          <option value="미국">미국</option>
          <option value="일본">일본</option>
          <option value="영국">영국</option>
        </select>
        <button type='submit' className={style.submitButton}>가입하기</button>
      </form>
      {/* 연습문제 ) 회원 가입 후 아래에 검수용 출력 UI - 스타일 적용 연습 및 결과 도출 테이블 */}
      <table>
        <thead>
          <tr style={{ border: '1px solid black', backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid black', padding: '8px' }}>아이디</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>이메일</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>비밀번호</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>성별</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>취미</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>생년월일</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>국가</th>
          </tr>
        </thead>
        <tbody>
          {
            member.map((e, idx) => (
              <tr key={idx} style={{
                backgroundColor: e.gender === "여자" ? '#FF9980' : 'skyblue',
                textAlign: 'center',
                border: '1px solid black'
              }}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{e.username}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{e.email}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{e.password}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{e.gender}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {/* 배열로 저장된 취미를 쉼표(,)로 연결하여 출력, 없으면 '없음' */}
                  {e.hobbies.length > 0 ? e.hobbies.join(', ') : '없음'}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{e.birth}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{e.country}</td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  )
}

export default Signups