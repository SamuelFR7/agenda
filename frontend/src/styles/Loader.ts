import styled, { keyframes } from 'styled-components'

const animation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

export const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
`

export const Loader = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid #0d47a1;
    border-right: 16px solid #f3f3f3;
    border-bottom: 16px solid #00E676;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${animation} 2s linear infinite;
`
