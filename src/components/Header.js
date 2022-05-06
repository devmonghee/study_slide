import styled from "styled-components";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Headercontainer = styled.div`
  width: 100%;
  height: 150px;

  position: relative;
`;
const Navbar = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .menubar-icon {
    height: 22px;
  }
  .logo {
    width: 200px;
  }
`;
const Menubar = styled.div`
  width: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const MenuList = styled.div`
  color: white;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Img = styled.img`
  height: 70px;
  &:hover {
    cursor: pointer;
  }
`;

const EdgeMenu = styled.div`
  display: none;
  position: absolute;
  right: 1px;
  top: 90px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 20px;
  z-index: 999;
  @media screen and (max-width: 768px) {
    display: block;
    color: white;
  }
`;

function Header() {
  const [click, setClick] = useState(false); // 엣지열기
  const [media, setMedia] = useState(1258); // 창크기
  // 창크기 감지
  window.onresize = function () {
    setMedia(window.innerWidth);
  };
  const Click = () => {
    setClick(!click);
  };
  useEffect(() => {
    // 768px 전에 감지된 click 무마
    setClick(false);
  }, [media < 769]);

  //useHistory -> useNavigate 변경 (react-router v6)

  console.log(click);
  console.log(window.innerWidth); //nember
  return (
    <Headercontainer>
      <Navbar>
        <Img src={require("../image/header/Logo.png")} />
        <Menubar>
          <MenuList>
            <Menu id="aboutodn" title="about odn" />
            <Menu id="metaocean" title="meta ocean" />
            <Menu id="product" title="product" />
            <Menu id="Certificate" title="Certificate" />
            <Menu id="News" title="News" />
          </MenuList>
        </Menubar>

        <Img
          className="menubar-icon"
          src={require("../image/header/menu.png")}
          onClick={Click}
        />
        {click ? null : (
          <EdgeMenu>
            <Menu id="aboutodn" title="about odn" />
            <Menu id="metaocean" title="meta ocean" />
            <Menu id="product" title="product" />
            <Menu id="Certificate" title="Certificate" />
            <Menu id="News" title="News" />
          </EdgeMenu>
        )}
      </Navbar>
    </Headercontainer>
  );
}

export default Header;
