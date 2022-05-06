import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

import Title from "../components/Title";
import newsData from "../news.json";

const Containier = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Slider = styled.div`
  position: relative;
`;
const Items = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  position: absolute;
  margin: 10px;
`;
const Item = styled(motion.li)`
  background-color: white;
  width: 320px;
  height: 450px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const NewsCard = styled.div`
  padding: 5px;
`;
const NewsImage = styled.img`
  height: 300px;
`;
const NewsSection = styled.div`
  display: flex;
`;
const DecoBox = styled(motion.div)`
  margin-right: 5px;
  height: 50px;
  width: 10px;
  background-color: rgba(0, 0, 0, 0.3);
`;
const NewsContent = styled.div``;
const NewsTitle = styled.div`
  height: 50px;
  width: 280px;
  display: flex;
  align-items: center;
  line-height: 25px;
  margin-bottom: 10px;
  font-weight: 900;
`;
const NewsDetail = styled.div`
  height: 100px;
  width: 280px;
  line-height: 20px;
  font-size: 14px;
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

function NewsSlider() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const incraseIndex = (e) => {
    if (leaving) return;
    toggleLeaving();
    const totalImage = newsData.news.length;
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
            {newsData.news
              .slice(offset * index, offset * index + offset)
              .map((news) => (
                <Item
                  key={news.id}
                  variants={ItemVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                >
                  <NewsCard>
                    <NewsImage />
                    <NewsSection>
                      <DecoBox />
                      <NewsContent>
                        <NewsTitle>{`${news.title.substring(
                          0,
                          40
                        )}...`}</NewsTitle>
                        <NewsDetail>{`${news.content.substring(
                          0,
                          70
                        )}...`}</NewsDetail>
                      </NewsContent>
                    </NewsSection>
                  </NewsCard>
                </Item>
              ))}
          </Items>
        </AnimatePresence>
      </Slider>
    </Containier>
  );
}

export default NewsSlider;
