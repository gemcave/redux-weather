import React, { Ref } from 'react';
import styled from 'styled-components';

const Input = React.forwardRef((props: any, ref: Ref<HTMLInputElement>) => {
    return <StyledInput ref={ref} {...props.input} />
});
export default Input;


const StyledInput = styled.input`
    border: none;
    border-bottom: 2px solid #eee;
    color: #fff;
    background: transparent;
    outline: none;
    font-size: 19px;
    width: 75%;
    padding: 5px;

    &::placeholder {
        color: rgb(187, 187, 187);
    }
`
