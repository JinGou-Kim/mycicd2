import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';
/*
{
    "success": true,
    "similarity": 0.6572,
    "result": "같은 사람",
    "bbox": [
        120,
        97,
        346,
        411
    ]
}  보고 인터페이스를 정의  -> bbox는 POST맨에서 응답받은  ROI 좌표이다
  bbox는 배열로 되어있으므로 number[]로 정의 했고 각각 좌표값은 120,97,346,411 이다.
*/
interface FaceCompareResult {
    success: boolean;
    similarity: number;
    result: string;
    bbox : number[];
}
const FaceCompareSendService: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  //카운트 다운 저장할 useState
  const [countdown,setCountdown] = useState<number | null>(null);
  //캡쳐
  const [captured,setCaptured] = useState<boolean>(false);
  //axios로 받은 결과를 저장할 useState
  const [result,setResult] = useState<FaceCompareResult|null>(null);
  const startCountdown = () => {
    if(countdown !== null) return;
    let counter = 5;
    setCountdown(counter)
    const interval = setInterval(() => {
        counter -= 1
        setCountdown(counter);
        // counter의 값이 0이라면 멈추게 하자.
        if (counter === 0) {
            clearInterval(interval);//인터벌을 종료
            capture();
            setCountdown(null);
        }
    },1000);
  }
  //webcam에서 장치가 활성화 될 때 동작
  const capture = useCallback(()=>{
     if (!webcamRef.current) return;
     //스크린 샷을 찍은 값
     const imageSrc = webcamRef.current.getScreenshot();
     if(imageSrc){
        //Djnago 서버로 이미지를 전송
        sendToServer(imageSrc);
     }
  },[]);
  // Django POST 방식으로 스클셧으로 찍은 사진을 비동기식으로 보내는..
  const sendToServer = async(imageSrc:string) => {
    try {
        //이미지 주소값 
        const res = await fetch(imageSrc);
        //서버로 전송할 때 바이너리 형태 => blob 바이너리 객체 
        const blob = await res.blob();
        const formData = new FormData();
        //서버로 전송할 때 post방식으로 바이너리 파일인 이미지 한장을 보내겠다
        formData.append('image',blob,'capture.jpg');
        const response = await axios.post<FaceCompareResult>(
            "http://192.168.0.77:9000/api/compare_face",
            formData
        );
        setResult(response.data);
        setCaptured(true);    
    } catch (error) {
        console.error("에러!",error);
    }
  }
  return (
    <div style={{textAlign:'center'}}>
      <h1>Face Compare</h1>
      <div style={{position:'relative',display:'inline-block'}}>
        <Webcam audio={false} ref={webcamRef} 
            screenshotFormat='image/jpeg'
            width={480} height={360}
            style={{borderRadius:'8px'}}
            />
        {/* ROI */}
        <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '200px', height: '270px',
        border: '2px solid red',
        transform: 'translate(-50%, -50%)'
        }}></div>

        {/* 카운트 다운 */}
        {countdown !== null && ( 
        <div
        style={{ position: 'absolute', top:'5px',left:'150%',
            transform: 'translateX(-50%)',
           fontSize: '48px', color: 'blue'
        }}
        >{countdown} %</div> ) }
      </div>
      
    {/*  스크린샷을 찍는 버튼이 되겠다. */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => startCountdown()}
          disabled={countdown !== null}
          style={{ padding: '10px 20px', fontSize: '18px' }}
        >
          얼굴 비교 시작
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>결과: {result.result}</h2>
          <p>Similarity: {result.similarity}</p>
          <p>BBox: [{result.bbox.join(', ')}]</p>
        </div>
      )}
    </div>
  )
}

export default FaceCompareSendService