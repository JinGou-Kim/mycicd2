
import React from 'react';
import axios from 'axios';

const PostData: React.FC = () => {
  const handlePost = async () => {
    try {
      const newPost = {
        title: 'Axios POST 예제',
        body: '버튼 클릭으로 POST 요청 실행',
        userId: 1,
      };

      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert(`데이터 전송 성공:\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error('데이터 전송 실패:', error);
      alert('데이터 전송 실패');
    }
  };

  return (
    <div>
      <h2>Axios POST 요청 예제</h2>
      <button onClick={handlePost}>데이터 전송하기</button>
    </div>
  );
};

export default PostData;
