import { styled } from "styled-components";

const StyledTextArea = styled.textarea`
    width: calc(100% - 32px);
    ${(props) => props.height && `height: ${props.height}px;`}
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
`;

function TextInput({ height, value, onChange }) {
    return <StyledTextArea height={height} value={value} onChange={onChange} />;
}

export default TextInput;
