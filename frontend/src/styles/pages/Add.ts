import styled from 'styled-components'

export const FormContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    form {
        width: 100%;
        padding: 30px;
        max-width: 700px;
        display: flex;
        flex-direction: column;
    }

    form p {
        font-weight: bold;
        font-size: 32px;
        color: #0d47a1;
    }

    form input {
        margin-top: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 48px;
        padding: 0 20px;
        font-size: 16px;
        color: #666;
    }

    form button {
        margin-top: 10px;
        border: 0;
        border-radius: 4px;
        height: 48px;
        font-size: 16px;
        background: #0d47a1;
        font-weight: bold;
        color: #FFF;
        cursor: pointer;

        :hover {
            filter: brightness(0.9);
        }
    }

    @media (max-width: 584px) {
        height: 150%;
        width: 150%;
    }
`

export const ButtonReturn = styled.button`
    margin-top: 5px;
    margin-bottom: 10px;
    border: 0;
    border-radius: 4px;
    height: 38px;
    padding: 7px;
    font-size: 16px;
    background: #0d47a1;
    font-weight: bold;
    color: #FFF;
    cursor: pointer;

    :hover {
            filter: brightness(0.9);
    }
`

export const FormContent = styled.div`
    background: #f5f5f5f5;
    border: 0;
    border-radius: 4px;

    @media (max-width: 548px) {
        max-width: 150%;
    }
`

export const InputBox = styled.div`
    display: flex;
    justify-content: space-between;

    .inputBoxField {
        margin-left: 10px;
    }

    @media (max-width: 548px) {
        margin-bottom: 15px;
        width: 100%;
    }
`
