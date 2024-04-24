import { styled } from "styled-components";
import CommentListItem from "./CommentListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        magin-bottom: 16px;
    }
`;

function CommentList({ comments, postId }) {
    return (
        <Wrapper>
            {comments.map((comment) => (
                <CommentListItem key={comment.id} comment={comment} postId={postId} />
            ))}
        </Wrapper>
    );
}

export default CommentList;
