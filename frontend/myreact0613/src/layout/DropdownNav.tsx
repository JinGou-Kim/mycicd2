//DropdownNav.tsx
import React, { useRef, useState } from 'react'
import style from './navbar.module.css'
import { NavLink } from 'react-router-dom';

const DropdownNav: React.FC = () => {
    //true, false에 따라서 드랍다운 여부를 결정하기 위한 상태값   
    const [isOpen, setIsOpen] = useState(false);
    // dom 요소에 접근할 useRef
    const dropdownRef = useRef<HTMLDivElement>(null);
    //toggleDropdown 클릭이 될 때 useState 값에 대한 toggle처리를 한다.
    const toggleDropdown = () => { setIsOpen((prev) => !prev) } //토클 true ->false !부정 연산
    //드랍다운 메뉴에서 메뉴를 선택시 닫아줘야 한다.
    const closeDropdown = () => { setIsOpen(false) } //false를 해서 무조건 닫는다.
    //NavLink를 사용하는 목적이기도 하고 어제 메뉴구현시 설명 
    //NavLink -> isActive 제공 
    const linkClass  = ({isActive}:{isActive:boolean}) => 
        //활성화가 된 상태이면 style.active를 추가한다.
        isActive ? `${style.link} ${style.active}` : style.link;
    return (
        <div ref={dropdownRef} className={style.dropdown}>
            <div className={style.link} onClick={toggleDropdown}>
                커뮤니티 <span className={style.arrow}>{isOpen ? '▲' : '▼'}</span>
            </div>
            {
                isOpen && (<div className={style.dropdownContent}>
                    <NavLink to="/fetchten1" onClick={closeDropdown} className={linkClass}>FetchThen1</NavLink>
                    <NavLink to="/userdemo" onClick={closeDropdown} className={linkClass}>UserDemo</NavLink>
                    <NavLink to="/getaxios" onClick={closeDropdown} className={linkClass}>Get0613</NavLink>
                    <NavLink to="/postaxios" onClick={closeDropdown} className={linkClass}>Post0613</NavLink>
                    <NavLink to="/community/memolist" onClick={closeDropdown} className={linkClass}>Memo0613</NavLink>
                    <NavLink to="/hello" onClick={closeDropdown} className={linkClass}>Hello</NavLink>
                    <NavLink to="/nlist" onClick={closeDropdown} className={linkClass}>nBoard</NavLink>
                    <NavLink to="/deep1" onClick={closeDropdown} className={linkClass}>DeepLearning1</NavLink>
                    <NavLink to="/cemera" onClick={closeDropdown} className={linkClass}>Camera</NavLink>
                    <NavLink to="/facecompare" onClick={closeDropdown} className={linkClass}>Face Compare</NavLink>
                </div>)
            }
        </div>
    )
}

export default DropdownNav