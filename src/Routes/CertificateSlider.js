import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import certificateData from "../certificate.json";

const Containier = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Slider = styled.div`
  position: relative;
`;
const Items = styled(motion.ul)`
  display: grid;
  grid-auto-rows: minmax(120px, auto);
  gap: 20px;
  position: absolute;
  margin: 10px;
  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Item = styled(motion.li)`
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
const offset = 3;

function CertificateSlider() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const incraseIndex = (e) => {
    if (leaving) return;
    toggleLeaving();
    const totalImage = certificateData.images.length;
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
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Containier onWheel={incraseIndex}>
      <Title value="Certificate" />
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
                  as="img"
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

export default CertificateSlider;
