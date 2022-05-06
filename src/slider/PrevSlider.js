import { AnimatePresence, motion, motionValue } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import certificateData from "../certificate.json";

const Containier = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Title = styled.h1`
  margin: 30px 0 40px 0;
  padding: 20px;
  font-size: 60px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
`;
const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 1000vh;
`;
const Items = styled(motion.ul)`
  display: grid;
  grid-auto-rows: minmax(120px, auto);
  gap: 20px;
  position: absolute;
  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Item = styled(motion.img)`
  width: 200px;
  height: 300px;

  @media (min-width: 1025px) {
    width: 100%;
    height: 450px;
    &:first-child {
      transform-origin: center left;
    }
    &:last-child {
      transform-origin: center right;
    }
  }
`;

const offset = 3;
const ItemsVariants = {
  entry: (back) => ({
    x: back ? -window.outerWidth : window.outerWidth,
  }),

  center: {
    x: 0,
  },
  exit: (back) => {
    return {
      x: back ? window.outerWidth : -window.outerWidth,
    };
  },
};
const ItemVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    y: -50,
    transition: {
      delay: 0.2,
      duration: 0.2,
      type: "tween",
    },
  },
};
function ScrollSlider() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // slider의 왼쪽 오른쪽 이동을 control : ture false 값을 변경하기 위해 custom
  const [back, setBack] = useState(false);
  const incraseIndex = (e) => {
    if (leaving) return;
    toggleLeaving();
    const totalImage = certificateData.images.length;
    // deltaY의 위 아래에 따라 받는 값을 음 양을 변환 1/-1
    const currentIndex = Math.sign(e.deltaY);
    const maxIndex = Math.ceil(totalImage / offset) - 1;
    if (currentIndex === 1) {
      setBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + currentIndex));
    } else if (currentIndex === -1) {
      setBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev + currentIndex));
    }
    console.log(maxIndex);
    console.log(index);
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Containier onWheel={incraseIndex}>
      <Title>Certificate</Title>
      <Slider>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <Items
            custom={back}
            key={index}
            variants={ItemsVariants}
            initial="entry"
            animate="center"
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
                  variants={ItemVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                />
              ))}
          </Items>
        </AnimatePresence>
      </Slider>
    </Containier>
  );
}

export default ScrollSlider;
