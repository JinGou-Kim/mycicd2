//router/AppRoutes.tsx
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../cont/Home'
import BoardList from '../cont/board/BoardList'
import GalleryList from '../cont/gallery/GalleryList'
import Chart from '../cont/chart/Chart'
import Community from '../cont/community/Community'
import Diary from '../cont/diary/Diary'
import Login from '../cont/member/Login'
import Signups from '../cont/member/Signups'
import BoardForm from '../cont/board/BoardForm'
import BoardDetail from '../cont/board/BoardDetail'

import Ex1_UseEffectFetch from '../cont/demo/Ex1_UseEffectFetch'
import Ex2_UseEffectFecth from '../cont/demo/Ex2_UseEffectFecth'
import GetData from '../axiosdemo0613/GetData'
import PostData from '../axiosdemo0613/PostData'
import MemoForm from '../cont/memo/MemoForm'
import MemoList from '../cont/memo/MemoList'
import HelloAxios from '../axiosdemo0613/HelloAxios'
import NboardWrite from '../cont/nboard/NboardWrite'
import NboardList from '../cont/nboard/NboardList'
import NboardDetail from '../cont/nboard/NboardDetail'
import PoetryPlayer from '../cont/poem/PoetryPlayer'
import DeepLearningDemo1 from '../cont/deeps/DeepLearningDemo1'
import FaceCompare from '../cont/cemera/FaceCompare'
import FaceCompareSendService from '../cont/cemera/FaceCompareResult'


//         <Route path='/' element={<Home/>}/>
//         <Route path='/board' element={<BoardList/>}/>
//         <Route path='/gallery' element={<GalleryList/>}/>
//         <Route path='/chart' element={<Chart/>}/>
//         <Route path="/community" element={<Community/>}/>
//         <Route path='/diary' element={<Diary/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/signup' element={<Signups/>}/>
const AppRoutes: React.FC = () => {
    const routeList = [
        { path: '/', element: <Home /> },
        { path: '/board', element: <BoardList /> },  // 게시판 목록
        { path: '/board/write', element: <BoardForm /> },   // 게시판 글쓰기
        { path: '/board/:id', element : <BoardDetail/>}, //게시판 상세보기 
        { path: '/gallery', element: <GalleryList /> },
        { path: '/chart', element: <Chart /> },
        { path: '/community', element: <Community /> },
        { path: '/diary', element: <Diary /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signups /> },
        { path: '/fetchten1', element:<Ex1_UseEffectFetch/>},
        { path: '/userdemo', element :<Ex2_UseEffectFecth/>},
        //------------------ 0613 Axios추가
        { path: '/getaxios', element :<GetData/>},
        { path: '/postaxios', element :<PostData/>},
        { path: '/community/memolist', element : <MemoList/>},
        { path: '/community/memoForm', element : <MemoForm/>},

        //--------------------------------------------------
        { path:'/hello', element:<HelloAxios/>},
        { path:'/nwriter', element:<NboardWrite/>},
        { path:'/nlist', element:<NboardList/>},
        { path:'/ndetail/:num', element:<NboardDetail/>},
         { path:'/peom', element:<PoetryPlayer/>},

        //------------------ 0613 DeepLearningDemo1 추가
        { path:'/deep1', element:<DeepLearningDemo1/>},
        { path:'/cemera', element:<FaceCompare/>},
        { path:'/facecompare', element:<FaceCompareSendService/>}
        
    ]
    return (
        <Routes>
            {
              routeList.map((route, idx) =>(
                <Route key={idx}{...route}/>
              ))
            }
        </Routes>
    )
}

export default AppRoutes