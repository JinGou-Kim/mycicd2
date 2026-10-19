import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      maxWidth: '1200px', margin: '0 auto',
      padding: '20px'
    }}>
       <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', // 공간을 사이로 벌려놓기
        alignItems: 'center', //중앙 정렬
        backgroundColor: '#ec591f', 
        color: 'white', 
        padding: '10px 20px', 
        borderRadius: '8px' 
        }}>
          <h1>ICT 신촌</h1>
          <div>
            <a href="/login" style={{ marginRight: '10px',
               color: 'white' }}>로그인</a>
            {/* <a href="/signup" style={{ color: 'white' }}>회원가입</a>    */}
            <Link to="/signup" style={{ color: 'white' }}>회원가입</Link> 
          </div>
        </header>
        <Navbar/>
        <main>{children}</main>
        <footer style={{
            backgroundColor: '#ec591f', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '0 0 8px 8px',
            textAlign:'center'
        }}>@2026 ICT 신촌 </footer>
    </div>
  )
}

export default Layout