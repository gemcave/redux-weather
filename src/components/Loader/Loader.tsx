import React from 'react'
import styled from 'styled-components'

export const Loader = () => {
    return (
        <div>
            <StyledLoader src="images/new-loader.gif" alt="loader" />
        </div>
    )
}


const StyledLoader = styled.img`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`