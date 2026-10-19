//nboard/NboardWrite.tsx
import { ChangeEvent, useState } from "react";
import type { NboardWriteResponse } from "../../types/nboard";
import axios from "axios";

const API_URL = "http://localhost:4000"; //nodeJS 서버 주소
function NboardWrite(){
    const [title, setTitle] = useState<string>("");
    const [writer, setWriter] = useState<string>("");
    const [content,setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImage(file);
        if(previewUrl){
            //이전에 생성해서 미리보기 이미지 URL을 메모리에서 제거 
            URL.revokeObjectURL(previewUrl);
        }
        if(file){
            //새로운 이미지 주소를 미리보기로 선택 
            setPreviewUrl(URL.createObjectURL(file));
        }else{
            setPreviewUrl(null);
        }
    }
    const handleSubmit= async(e:React.SubmitEvent) =>{
        e.preventDefault();
          if (!title.trim()) {
            alert("제목을 입력해야 한다.");
            return;
        }

        if (!writer.trim()) {
            alert("작성자를 입력해야 한다.");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("writer", writer);
        formData.append("content", content);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response =
                await axios.post<NboardWriteResponse>(
                    `${API_URL}/nboards`,
                    formData
                );

            alert(response.data.message);

            setTitle("");
            setWriter("");
            setContent("");
            setImage(null);

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            setPreviewUrl(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ??
                    "게시글 등록에 실패했다."
                );
            } else {
                alert("알 수 없는 오류가 발생했다.");
            }
        }
    }
    //카페 코드 return 부분을 복붙 하기
     return (
        <div>
            <h2>NBOARD 글 등록</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">
                        제목
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="writer">
                        작성자
                    </label>

                    <input
                        id="writer"
                        type="text"
                        value={writer}
                        onChange={(event) =>
                            setWriter(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="content">
                        내용
                    </label>

                    <textarea
                        id="content"
                        value={content}
                        onChange={(event) =>
                            setContent(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="image">
                        이미지
                    </label>

                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {previewUrl && (
                    <div>
                        <p>이미지 미리보기</p>

                        <img
                            src={previewUrl}
                            alt="업로드 이미지 미리보기"
                            width={300}
                        />
                    </div>
                )}

                <button type="submit">
                    등록
                </button>
            </form>
        </div>
    );




}
export default NboardWrite;