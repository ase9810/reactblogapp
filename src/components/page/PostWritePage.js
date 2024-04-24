import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import DataContext from "../../context/DataContext";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function PostWritePage(props) {
    const navigate = useNavigate();

    const { setData } = useContext(DataContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleWrite = () => {
        let newItem = {
            id: new Date().getTime(),
            title,
            content,
        };

        setData((prev) => [...prev, newItem]);
        navigate("/");
    };

    return (
        <Wrapper>
            <Container>
                <TextInput height={20} value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextInput height={480} value={content} onChange={(e) => setContent(e.target.value)} />
                <Button title="글 작성하기" onClick={() => handleWrite()} />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;
