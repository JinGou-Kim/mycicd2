//cont/nboard/NboardList.tsx

import { useEffect, useState } from "react";
import type { Nboard, NboardListResponse} from "../../types/nboard"
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:4000"; //nodeJS 서버 주소

function NboardList(){

     const [list, setList] = useState<Nboard[]>([]);
     const [loading, setLoading] =  useState<boolean>(true);
     const [errorMessage, setErrorMessage] = useState<string>("");

    //카페 코드 복붙하기
    const getNboardList = async (): Promise<void> => {
        try {
            setLoading(true);
            setErrorMessage("");
            // NodeJS로 요청을 보낸 후 JSON으로 응답받아서 useState에 저장하기 
            const response =
                await axios.get<NboardListResponse>(
                    `${API_URL}/nboards`
                );

            setList(response.data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.message ??
                    "게시글 목록 조회에 실패했다."
                );
            } else {
                setErrorMessage(
                    "알 수 없는 오류가 발생했다."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNboardList();
    }, []);

    if (loading) {
        return <p>게시글을 불러오는 중이다.</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    return (
        <div>
            <h2>NBOARD 목록</h2>

            {list.length === 0 ? (
                <p>등록된 게시글이 없다.</p>
            ) : (
                list.map((item) => (
                    <article key={item.NUM}>
                        <Link to={`/ndetail/${item.NUM}`}>
                            <h3>{item.TITLE}</h3>
                        </Link>
                        <p>
                            작성자: {item.WRITER}
                        </p>

                        <p>
                            {item.CONTENT}
                        </p>

                        {item.IMAGE_URL && (
                            <img
                                src={item.IMAGE_URL}
                                alt={item.TITLE}
                                width={300}
                            />
                        )}

                        <p>
                            작성일:{" "}
                            {new Date(
                                item.REGDATE
                            ).toLocaleString()}
                        </p>

                        <hr />
                    </article>
                ))
            )}
        </div>
    );




}
export default NboardList;