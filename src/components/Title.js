import styled from "styled-components";

const Content = styled.h1`
  margin: 30px 0 40px 0;
  padding: 20px;
  font-size: 60px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
`;
function Title(props) {
  return <Content>{props.value}</Content>;
}

export default Title;
