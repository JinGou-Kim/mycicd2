import React from 'react'
import style from './memo.module.css'
import { Link } from 'react-router-dom'
const MemoList: React.FC = () => {
    return (
        <div className={style.container}>
            <h2>Memo List</h2>
            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>내용</th>
                        <th>아이피</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                    <tr>
                        <th colSpan={6} style={{ textAlign: "center" }}>
                            <Link to="/community/memoForm" className={style.button}>
                                글쓰기
                            </Link>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default MemoList