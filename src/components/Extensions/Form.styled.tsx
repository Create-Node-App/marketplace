import styled, { keyframes, css } from 'styled-components';

export const Form = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export interface SubmitButtonProps {
  loading?: boolean;
  empty?: boolean;
}

export const SubmitButton = styled.button.attrs((props: SubmitButtonProps) => ({
  type: 'submit',
  disabled: props.loading || props.empty,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  &[disabled] {
    cursor: not-allowed;
    background: rgba(113, 89, 193, 0.2);
  }
  ${(props) =>
    props.disabled &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
        color: #7159c1 !important;
      }
    `}
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: 5px;
  color: #e41111;
`;

export const List = styled.ul`
  list-style-type: none;
  font-size: 16px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & + li {
      border-top: 1px solid #eee;
    }
  }
`;
