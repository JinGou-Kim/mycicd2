import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './board.module.css';
import { BoardItem } from './boardData';

const BoardList: React.FC = () => {
    //순서)
    //0. 로컬 스토리지의 boardList를 읽어와서 자바스크립트 배열 타입으로 선언된 useState를 선언 
    //1. useEffect()로 초기화 한다.
    //2. useEffect()에서 localStorage 이미 저장된 key을 꺼낸다. -> jsonArray인 boardList
    //3. JSON.parse() => javascript 객체로 변환
    //4. setUseState로 저장해둔다.
    //5. return jsx에서 데이터를 map로 표현한다. 끝이다.
    //---------------------------------------------------
    const [boardList, setBoardList] = useState<BoardItem[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("boardList");
        if (data) {
            setBoardList(JSON.parse(data));
        }
    }, []);


    return (
        <div className={style.container}>
            <h2>BoardList</h2>
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //[{id:1,title:'테스'},{},...].map((item)=>(<p></p>)) 
                        //item은 {id:1,title:'테스'}
                        //array.map((item)=>(<p>{item.id}</p>))
                        boardList.reverse().map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {/* BoardDetail.tsx를 라우팅 주소  */}
                                    <Link to={`/board/${item.id}`}
                                        className={style.titleLink}>
                                        {item.title}</Link></td>
                                <td>{item.writer}</td>
                            </tr>

                        ))

                    }

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} style={{ textAlign: "center" }}>
                            {/* BoardForm으로 이동할 버튼  */}
                            <Link to="/board/write" className={style.button}>
                                글쓰기
                            </Link>
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default BoardList

