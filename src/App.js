import styled from "styled-components";

import Header from "./components/Header";

import CertificateSlider from "./Routes/CertificateSlider";
import NewsSlider from "./Routes/NewsSlider";
import CustomSlider from "./slider/CustomSlider";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const InnerContainer = styled.div`
  width: 1325px;
`;

function App() {
  return (
    <Container>
      <InnerContainer>
        <Header />
        <CustomSlider />
      </InnerContainer>
    </Container>
  );
}

export default App;
