import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
from {
  transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;

export const Loading = styled.div`
  background: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 731px;
  ${(props) =>
    props.theme.loading &&
    css`
      svg {
        font-size: 40px;
        animation: ${rotate} 2s linear infinite;
        color: #7159c1 !important;
      }
    `}
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  div:first-child {
    align-self: flex-start;
    flex: 1 1 100%;
    margin-bottom: 40px;
    & > a {
      color: #7159c1;
      font-size: 16px;
      text-decoration: none;
      &:hover {
        color: #907dcf;
      }
      & svg {
        vertical-align: top;
        margin-right: 4px;
      }
    }
  }
`;

export const OwnerProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  align-self: flex-start;
  @media (max-width: 600px) {
    margin: 0 0 5px 0;
  }
  h2 {
    font-size: 20px;
  }
  img {
    width: 88px;
    border-radius: 50%;
    border: 4px solid #e6e6e6;
    margin-bottom: 5px;
  }
`;

export const RepoInfo = styled.div`
  align-self: flex-start;
  @media (max-width: 600px) {
    text-align: center;
  }
  h1 {
    font-size: 24px;
    & > a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #7159c1;
      }
    }
  }
  & div {
    margin: 8px 0 16px;
    & span {
      font-size: 12px;
      background: #7564aa;
      color: #fff;
      padding: 4px 8px;
      border-radius: 3px;
      margin-right: 8px;
      & svg {
        vertical-align: text-top;
        margin-right: 4px;
      }
    }
  }
  p {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
  }
`;
