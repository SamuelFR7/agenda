import styled from 'styled-components'

export const MainContainer = styled.div`
    padding: 70px 0;
    text-align: center;
`

export const AddButton = styled.button`
    margin-top: 20px;
    border: 0;
    padding: 5px;
    border-radius: 4px;
    font-size: 16px;
    background: #0d47a1;
    font-weight: bold;
    color: #fff;
    cursor: pointer;

    :hover {
            filter: brightness(0.9);
    }
`

export const TableContent = styled.table`
    width: 70%;
    margin: auto;
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(32,32,32,.3);
    background: #fafafa;

    td, th {
        padding: 12px 15px;
    }

    th {
        background: #455a64;
        color: #fafafa;
    }

    tr:nth-child(odd){
        background-color: #eeeeee;
    }

    .text-content {
        text-align: left;
    }
`

export const TableButton = styled.button`
    border: 0;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
`

export const PaginationContainer = styled.div`
    margin-top: 10px;
`
