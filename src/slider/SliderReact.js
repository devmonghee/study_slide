import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  position: absolute;
  margin: 10px;
`;
const Item = styled.li`
  background-color: white;
  width: 500px;
  height: 400px;
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

// e.deltaY를 이용한 slider이동 react version
const offset = 4;
const datalength = newsData.news.length;
function SliderReact() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const sliderTranslate = useRef();

  const incraseIndex = (e) => {
    const browserWidth = window.innerWidth;
    const sliderWidth = sliderTranslate.current.offsetWidth;
    const moving = (sliderWidth - browserWidth / 2) * -1;

    console.log(e.deltaY);
    if (leaving) return;
    toggleLeaving();
    setCurrent((prev) => prev - e.deltaY);
    if (current < moving) {
      setCurrent(400);
      return;
    } else if (current > 0) {
      setCurrent(0);
      return;
    }
    sliderTranslate.current.style.transform = `translateX(${current}px)`;
    setIndex((prev) => prev + Math.sign(current));
  };
  console.log(current);
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
            ref={sliderTranslate}
          >
            {newsData.news
              .slice(offset * index, offset * index + offset)
              .map((news) => (
                <Item key={news.id}>
                  <h1>{news.title}</h1>
                </Item>
              ))}
          </Items>
        </AnimatePresence>
      </Slider>
    </Containier>
  );
}

export default SliderReact;
