import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './cont/Home';
import BoardList from './cont/board/BoardList';
import GalleryList from './cont/gallery/GalleryList';
import Chart from './cont/chart/Chart';
import Community from './cont/community/Community';
import Diary from './cont/diary/Diary';
import Login from './cont/member/Login';
import Signups from './cont/member/Signups';
import Ex1_FilterTest from './cont/member/Ex1_FilterTest';
import Ex2_LocalStorage from './cont/board/Ex2_LocalStorage';
import Ex3_LocalStorage from './cont/board/Ex3_LocalStorage';
import AppRoutes from './router/AppRoutes';

function App() {
  return (
    // <div>
    //   <Ex1_FilterTest/>
    //   <Ex2_LocalStorage/>
    //   <Ex3_LocalStorage/>
    // </div>
    // <Router>
    //     <Layout>
    //       <Routes>
    //         {/* <Link to="/" 에 해당되는 경로 처리  */}
    //         <Route path='/' element={<Home/>}/>
    //         <Route path='/board' element={<BoardList/>}/>
    //         <Route path='/gallery' element={<GalleryList/>}/>
    //         <Route path='/chart' element={<Chart/>}/>
    //         <Route path="/community" element={<Community/>}/>
    //         <Route path='/diary' element={<Diary/>}/>
    //         <Route path='/login' element={<Login/>}/>
    //         <Route path='/signup' element={<Signups/>}/>
    //       </Routes>
    //     </Layout>
    // </Router>

    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
