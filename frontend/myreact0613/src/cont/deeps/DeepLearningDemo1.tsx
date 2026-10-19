import axios from 'axios';
import React, { useState } from 'react'
/*
postman의 json타입으로 인터페이스를 정의 
{
    "count": 1,
    "results": [
        {
            "pred_idx": 0,
            "pred_label": "당뇨아님",
            "probabilities": [
                0.9739820957183838,
                0.02601790614426136
            ]
        }
    ]
}
*/
interface PredictResult{
    pred_index: number;  // 0 = 정상 , 1 = 당뇨
    pred_label: string;  //"당뇨아님"|"당뇨확정"
    probabilities: number[]; //[p0 , p1]
}

interface PredictResponse {
    count: number;
    results : PredictResult[];
}

const serverAddr = "http://43.200.191.12:9000/restapi/predict";

// 주피터에서 테스트 해본 데이터 (포스트 맨 데이터 가져와서 사용 하자.)
// 당뇨 아닐때 데이타
const paramX1 = { features: [1.0, 85.0, 66.0, 29.0, 0.0, 26.6, 0.351, 31.0] }; 

// 당뇨 확정 
const paramX2 = { features: [6.0,148.0, 72.0, 35.0, 0.0, 33.6, 0.627, 50.0] };     


const DeepLearningDemo1: React.FC = () => {
  const [loading,setLoading] = useState(false);
  const [error , setError] = useState<String|null>(null);
  const [result, setResult] = useState<PredictResponse|null>(null);
  const [lastPayload,setLastPayload] = useState<number[] | null>(null);

  const send = async(features:number[]) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setLastPayload(features)
    try {
        //axios 
        const res = await axios.post<PredictResponse>(
            serverAddr, {features} , {headers:{"Content-Type":"application/json"}}
        );
        setResult(res.data)
        //alert(res.data)
        alert(res.data.results[0].pred_label)
    } catch (error) {
        console.log(error+"AEE 오류~~!")
    } finally{
        setLoading(false);
    }
  }
  return (
    <div style={{maxWidth:720,margin:"24px auto",padding:16}}>
        <h1>딥러닝 당뇨 예측 테스트</h1>
        <div style={{display:"flex",gap:12,marginTop:12}}>
            <button type="button" onClick={()=>{send(paramX1.features)}} title='정상(0)Send'>
                    {loading?'전송 중 ....':'당뇨병 아님'}
            </button>
            <button type="button" onClick={()=>{send(paramX2.features)}} title='당뇨(1)Send'>
                    {loading?'전송 중 ....':'당뇨병 확정이다.'}
            </button>

        </div>
       {result && result.results.length > 0 && (
            <div style={{
                marginTop: 20, 
                padding: 16, 
                backgroundColor: '#f8f9fa', 
                border: '1px solid #dee2e6', 
                borderRadius: 4
            }}>
                <h3>예측 결과</h3>
                <p><strong>판정 결과:</strong> <span style={{color: '#007bff', fontSize: '1.2em'}}>{result.results[0].pred_label}</span></p>
                <p><strong>인덱스:</strong> {result.results[0].pred_index}</p>
                <p><strong>확률 정보:</strong> 
                   정상({(result.results[0].probabilities[0] * 100).toFixed(2)}%) / 
                   당뇨({(result.results[0].probabilities[1] * 100).toFixed(2)}%)
                </p>
            </div>
        )}
    </div>
  )
}

export default DeepLearningDemo1