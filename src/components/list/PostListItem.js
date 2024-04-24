import { styled } from "styled-components";
import Button from "../ui/Button";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 8px;

    background: white;
    :hover {
        background: lightgrey;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

function PostListItem({ post, onClick }) {
    const { setData } = useContext(DataContext);

    console.log(post);

    const handleDelete = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) setData((prev) => prev.filter((v) => v.id !== post.id));
    };

    return (
        <Wrapper>
            <TitleText onClick={onClick}>{post.title}</TitleText>
            <Button title="삭제" onClick={handleDelete} />
        </Wrapper>
    );
}

export default PostListItem;
