// D:\ictstudy\springboot\reactworkspace\myreact0613> yarn add react-webcam
// D:\ictstudy\springboot\reactworkspace\myreact0613> yarn add @types/react-webcam
//cont/cemera/FaceCompare.tsx
import React, { useRef } from 'react';
import Webcam from "react-webcam";

const FaceCompare: React.FC = () => {
    // useRef를 사용하여 Webcam 모듈이 제공해주는 Webcam 객체에  대한 참조를 생성. 
    // 이 참조를 통해 나중에 스크린샷을 찍거나 카메라 스트림에 접근할 수 있다.
    const webcamRef = useRef<Webcam>(null);
    
    //audio={false} : 오디오를 비활성화
    //ref={webcamRef} : webcamRef를 통해 Webcam 객체에 접근 가능
    //screenshotFormat="image/jpeg" : 스크린샷을 찍을 때 이미지 형식을 JPEG로 설정
    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={720}
                height={480}
                onUserMedia={() => console.log("카메라 스트림 시작됨")}
                onUserMediaError={(err) => console.error("카메라 연결 실패:", err)}
            />
        </div>
    );
};

export default FaceCompare;