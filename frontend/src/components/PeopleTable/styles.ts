import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const Container = styled.div`
    margin-top: 1rem;

    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: ${theme.colors.textBody};
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: ${theme.colors.shape};
            color: ${theme.colors.textBody};
            border-radius: 0.25rem;

            &.number {
                color: ${theme.colors.textGreen};
            }

            div {
                padding-top: 6px;
                &.imgButton {
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
`
