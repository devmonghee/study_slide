import styled from "styled-components";

import Header from "./components/Header";

import CertificateSlider from "./Routes/CertificateSlider";
import NewsSlider from "./Routes/NewsSlider";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const InnerContainer = styled.div`
  width: 1025px;
`;

function App() {
  return (
    <Container>
      <InnerContainer>
        <Header />
        <NewsSlider />
      </InnerContainer>
    </Container>
  );
}

export default App;
