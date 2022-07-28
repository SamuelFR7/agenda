import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const Container = styled.form`
  h2 {
    color: ${theme.colors.textTitle};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 47.5%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0%.25rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;

    :nth-child(odd) {
      margin-left: 1.5rem;
    }

    &::placeholder {
      color: ${theme.colors.textBody};
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: ${theme.colors.lightGreen};
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
