import React from 'react'
import { Link, NavLink } from 'react-router-dom'
//외부 스타일을 typescript 모듈로 불러오기
import style from './navbar.module.css'
import DropdownNav from './DropdownNav'

//설치한 라우터의 경로에 맞게 링크(Link) 네비게이션(메뉴)를 설정한다.
//Layout.tsx에서 사용될 메뉴
const Navbar: React.FC = () => {

    /*
    className={({ isActive }) => isActive ? "link active" : "link"}
     이 방식은 NavLink가 제공하는 공식 방법이다.
    */
    // 네비게이션에 공통으로 활성화 되는 유무에 따라서 스타일을 변경하는 조건 
    // isActive === true => className='link active' 적용
    // 아니면 className='link'
    const commonLinkClass = ({isActive} : {isActive :boolean}) => {
        return isActive ? `${style.link} ${style.active}`:style.link;
    }
    return (
        // <nav style={{ marginTop: '10px' }}>
        //     <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        //     <Link to="/board" style={{ marginRight: '10px' }}>게시판</Link>
        //     <Link to="/gallery" style={{ marginRight: '10px' }}>겔러리</Link>
        //     <Link to="/chart" style={{ marginRight: '10px' }}>차트</Link>
        //     <Link to="/community" style={{ marginRight: '10px' }}>커뮤니티</Link>
        //     <Link to="/diary">일기장</Link>
        // </nav>
        <nav className={style.navbar}>
            <NavLink to="/" className={commonLinkClass}>Home</NavLink>
            <NavLink to="/board" className={commonLinkClass}>게시판</NavLink>
            <NavLink to="/gallery" className={commonLinkClass}>겔러리</NavLink>
            <NavLink to="/chart" className={commonLinkClass}>차트</NavLink>
            {/* <NavLink to="/community" className={commonLinkClass}>커뮤니티</NavLink> */}
            <DropdownNav/>
            <NavLink to="/diary" className={commonLinkClass}>일기장</NavLink>
        </nav>
    )
}

export default Navbar