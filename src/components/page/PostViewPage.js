import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

import Button from "../ui/Button";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
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

    :not(:last-child):not(button) {
        margin-bottom: 16px;
    }
`;

const HeaderBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${({ $flex }) => $flex};
    align-items: center;
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const PostButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    button:first-child {
        margin-right: 16px;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();

    const { data, setData } = useContext(DataContext);

    const postIndex = data.findIndex((item) => item.id === Number(postId));
    const post = data[postIndex];

    const [comment, setComment] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(post.title);
    const [newContent, setNewContent] = useState(post.content);

    const postContainerRef = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (postContainerRef.current && !postContainerRef.current.contains(e.target)) {
                setIsEdit(false);
                setNewTitle(post.title);
                setNewContent(post.content);
            }
        };
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [postContainerRef]);

    const saveComment = () => {
        let newComment = {
            id: new Date().getTime(),
            content: comment,
        };

        let newData = data.reduce((prev, curr) => {
            console.log(prev);
            if (curr.id === Number(postId)) {
                let arr = curr.comments || [];
                arr.push(newComment);
                curr.comments = arr;
                console.log(curr.comments);
            }
            prev.push(curr);
            return prev;
        }, []);

        setData(newData);
        setComment("");
    };

    const handleUpdate = () => {
        if (window.confirm("게시글을 수정하시겠습니까?")) {
            setData((prev) =>
                prev.map((v) => {
                    if (v.id === post.id) {
                        v.title = newTitle;
                        v.content = newContent;
                    }
                    return v;
                })
            );
            setIsEdit(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            setData((prev) => prev.filter((v) => v.id !== post.id));
            navigate("/");
        }
    };
    return (
        <Wrapper>
            <Container>
                <HeaderBox
                    $flex={
                        postIndex === 0 ? "flex-end" : postIndex === data.length - 1 ? "flex-start" : "space-between"
                    }
                >
                    {postIndex !== 0 && (
                        <Button title="이전글" onClick={() => navigate(`/${data[postIndex - 1].id}`)} />
                    )}
                    {postIndex !== data.length - 1 && (
                        <Button title="다음글" onClick={() => navigate(`/${data[postIndex + 1].id}`)} />
                    )}
                </HeaderBox>
                <PostContainer ref={postContainerRef}>
                    {isEdit ? (
                        <>
                            <PostButtonContainer>
                                <Button title="수정" onClick={() => handleUpdate()} />
                                <Button title="취소" onClick={() => setIsEdit(false)} />
                            </PostButtonContainer>
                            <TextInput height={20} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            <TextInput
                                height={480}
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <PostButtonContainer>
                                <Button title="수정" onClick={() => setIsEdit(true)} />
                                <Button title="삭제" onClick={() => handleDelete()} />
                            </PostButtonContainer>
                            <TitleText>{post.title}</TitleText>
                            <ContentText>{post.content}</ContentText>
                        </>
                    )}
                </PostContainer>

                {post.comments && (
                    <>
                        <CommentLabel>댓글 [{post.comments.length}]</CommentLabel>
                        <CommentList comments={post.comments} postId={post.id} />
                    </>
                )}

                <TextInput height={40} value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button title="댓글 작성하기" onClick={() => saveComment()} />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
