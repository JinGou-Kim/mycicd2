//cont/nboard/NboardDetail.tsx

import axios from "axios";
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import type {Nboard,NboardDetailResponse
} from "../../types/nboard";

const API_URL = "http://localhost:4000";

function NboardDetail() {
    const { num } = useParams<{
        num: string;
    }>();

    const [nboard, setNboard] =
        useState<Nboard | null>(null);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [errorMessage, setErrorMessage] =
        useState<string>("");

    useEffect(() => {
        const getNboardDetail = async (): Promise<void> => {
            if (!num) {
                setErrorMessage(
                    "게시글 번호가 없다."
                );
                setLoading(false);
                return;
            }

            try {
                const response =
                    await axios.get<NboardDetailResponse>(
                        `${API_URL}/nboards/${num}`
                    );

                setNboard(response.data.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(
                        error.response?.data?.message ??
                        "게시글 조회에 실패했다."
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

        getNboardDetail();
    }, [num]);

    if (loading) {
        return <p>게시글을 불러오는 중이다.</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!nboard) {
        return <p>게시글이 없다.</p>;
    }

    return (
        <div>
            <h2>{nboard.TITLE}</h2>

            <p>
                작성자: {nboard.WRITER}
            </p>

            <p>{nboard.CONTENT}</p>

            {nboard.IMAGE_URL && (
                <img
                    src={nboard.IMAGE_URL}
                    alt={nboard.TITLE}
                    width={500}
                />
            )}

            <p>
                작성일:{" "}
                {new Date(
                    nboard.REGDATE
                ).toLocaleString()}
            </p>
        </div>
    );
}

export default NboardDetail;