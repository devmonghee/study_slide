import certificateData from "../certificate.json";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useState } from "react";
const Container = styled.div`
  // 고정값 %
`;
const InnerContainer = styled.div`
  // display : flex
`;
const Title = styled.h1`
  padding: 20px;
  font-size: 60px;
  font-weight: 800;
  color: white;
`;
const Slider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 500px;
`;
const Items = styled(motion.div)`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  width: 80%;
`;
const Item = styled(motion.img)`
  background-color: white;
  height: 400px;
`;

const ItemsVariants = {
  inception: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};
const offset = 3;

// react slider

export default function Certificate() {
  // 슬라이더를 넘길 슬라이더 index system
  // : Items를 전부 render하지 않고 index로 바꿔주면서 생성하는 것 처럼 한다
  // index 생성
  const [index, setIndex] = useState(0);
  // 슬라이드가 다 넘어오지 않은 상태에서 또 클릭했을 때 문제점 해결하기 위해
  const [leaving, setLeaving] = useState(false);

  // setIndex를 사용할 incrase index fn
  const incraseIndex = () => {
    // 처음에는 leaving은 false값이니깐 true로 바꾸고 index를 변경 true일 때는 반환이 없다
    // data의 total image수를 확인해서 index제한 해주기 : totalImage , maxIndex
    if (leaving) return;
    toggleLeaving();
    const totalImage = certificateData.images.length;
    const maxIndex = Math.ceil(totalImage / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  // AnimatePresence의 prop -> onExitComplete에 함수를 넣으면 exit이 끝났을 때 실행된다.
  const toggleLeaving = () => setLeaving((prev) => !prev);
  console.log(index);
  return (
    <Container>
      <InnerContainer>
        <Title>Certificate</Title>
        <Slider onClick={incraseIndex}>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Items
              key={index}
              variants={ItemsVariants}
              initial="inception"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
            >
              {certificateData.images
                .slice(offset * index, offset * index + offset)
                .map((image) => (
                  <Item
                    key={image.id}
                    src={`/assets/certificate/${image.category}/${image.title}.jpg`}
                    alt={`${image.title}`}
                  />
                ))}
            </Items>
          </AnimatePresence>
        </Slider>
      </InnerContainer>
    </Container>
  );
}
