import { styled } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";

import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import DataContext from "../../context/DataContext";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
    :is(textarea) {
        width: 80%;
        margin-bottom: 0 !important;
    }
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

function CommentListItem({ comment, postId }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment.content);

    const wrapperRef = useRef();

    const { data, setData } = useContext(DataContext);

    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsEdit(false);
                setNewComment(comment.content);
            }
        };
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [wrapperRef]);

    const handleUpdate = () => {
        if (window.confirm("댓글을 수정하시겠습니까?")) {
            let newData = data.reduce((prev, curr) => {
                console.log(prev);
                if (curr.id === Number(postId)) {
                    curr.comments[curr.comments.findIndex((v) => v.id === comment.id)].content = newComment;
                }
                prev.push(curr);
                return prev;
            }, []);

            setData(newData);
            setIsEdit(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("댓글을 수정하시겠습니까?")) {
            let newData = data.reduce((prev, curr) => {
                console.log(prev);
                if (curr.id === Number(postId)) {
                    curr.comments.splice(
                        curr.comments.findIndex((v) => v.id === comment.id),
                        1
                    );
                }
                prev.push(curr);
                return prev;
            }, []);

            setData(newData);
        }
    };

    return (
        <Wrapper ref={wrapperRef}>
            {isEdit ? (
                <>
                    <TextInput height={20} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <Button title="수정" onClick={handleUpdate} />
                </>
            ) : (
                <>
                    <ContentText onDoubleClick={() => setIsEdit(true)}>{comment.content}</ContentText>
                    <Button title="삭제" onClick={handleDelete} />
                </>
            )}
        </Wrapper>
    );
}

export default CommentListItem;
