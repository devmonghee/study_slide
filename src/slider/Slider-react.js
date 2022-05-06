import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import newsData from "../news.json";

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

// e.deltaY를 이용한 slider이동 react version

function NewsSlider() {
  const [current, setcurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const incraseIndex = (e) => {
    if (leaving) return;
    toggleLeaving();
    setcurrent(current - e.deltaY);
    const browserWidth = window.innerWidth;
    const sliderWidth = Items.offsetWidth;
    const maxMove = (sliderWidth - browserWidth / 2) * -1;
    if (current < maxMove) {
      setcurrent(e.deltaY);
      return;
    } else if (current > 0) {
      setcurrent(0);
      return;
    }
    Items.style.transform = `translateX(${current}px)`;
    setIndex((prev) => prev + Math.sign(current));
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Containier onWheel={incraseIndex}>
      <Title value="News" />
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Items
            key={index}
            variants={ItemsVariants}
            initial="entry"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {newsData.news.map((news) => (
              <Item
                key={news.id}
                variants={ItemVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
              >
                <div
                  style={{
                    height: "200px",
                    width: "100px",
                    backgroundColor: "white",
                  }}
                ></div>
                <div>
                  <div style={{ color: "white" }}>{news.title}</div>
                  <div style={{ color: "white" }}>{news.content}</div>
                </div>
              </Item>
            ))}
          </Items>
        </AnimatePresence>
      </Slider>
    </Containier>
  );
}

export default NewsSlider;
