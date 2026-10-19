import React, { useState } from 'react'
import style from './memo.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//post방식으로 서버측으로 폼의 입력값을 보낸다.
//json방식 : interface로 정의 한 useState값을 보낸다.
interface MemoVO {
    num?: number;
    writer: string;
    conts: string;
    mreip?: string;
    mdate?: string;
}
const MemoForm: React.FC = () => {

    //useState 선언 및 초기화 =? 만 빼고 초기화
    const [formData, setFormData] = useState<MemoVO>({
        writer: '',
        conts: '',
    })
    // 입력후 리스트로 이동 하기 위한 훅을 생성
    const navigate = useNavigate();

    //입력할 때 마다 useState에 {} 형식으로 데이터를 저장하는 함수
    const formChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //선택된 target 즉, HTMLElement에서 name,value를 각각 받아 온다.
        const {name, value} = e.target;
         // 받아온 데이터를 useState의 formData 객체에 각각 저장한다.
         setFormData({...formData,[name]:value});
    }
    //button submit할때 onSubmit  Handdler 호출 해주는 함수
    const myFormSubmit = async (e:React.SubmitEvent) =>{
        e.preventDefault();//폼이 전송되는 것을 일단 막는다.
        //axios로 서버측으로 useState에 저장 해놓은 데이터를 보낸다.
        console.log(formData);
        const url = "http://192.168.0.5/ajax0613/mymemo/add";
            //   const response = await axios.post(url, jsonData, {
            //     headers: { 'Content-Type': 'application/json' },
            //   });
        try {
            await axios.post(url,formData,{
                headers: { 'Content-Type': 'application/json' }
            });
            alert("메모가 등록되었습니다!");
            navigate('/community/memolist');
        } catch (error) {
            console.error("등록 실패:", error);
        }
    }
    return (
        <div className={style.container}>
            <h2 className={style.title}>메모장 (Axios 예제 06/13)</h2>
            <form className={style.form} onSubmit={myFormSubmit}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type="text" name="writer" id="writer" onChange={formChange}
                                    className={style.input} required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><textarea name="conts" id="conts" onChange={formChange}
                                style={{ width: '90%', height: '150px', padding: '8px' }}
                            ></textarea></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit"
                                    className={style.button}>등록하기</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>

        </div>
    )
}

export default MemoForm