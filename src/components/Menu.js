import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuBtn = styled.div`
  font-size: 30px;
  &:hover {
    cursor: pointer;
  }
  a {
    color: black;
  }
  @media screen and (max-width: 768px) {
    padding: 5px;
    a {
      color: white;
    }
  }
  @media screen and (max-width: 1028px) and (min-width: 768px) {
    font-size: 2.5vw;
  }
`;

export default function Menu(props) {
  return (
    <>
      <MenuBtn>{props.title.toUpperCase()}</MenuBtn>
    </>
  );
}
