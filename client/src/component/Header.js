import React, { useContext, useState } from 'react';
// import "../App.css";
// import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, DropdownItem, MobileIcon } from './HeaderEle';
// import { IconContext } from 'react-icons/lib';
// import {FaTimes} from "react-icons/fa";
// import {FaBars} from "react-icons/fa";
// import DMenu from './DropDownMenu';
// import { DropdownData } from './DropDownData';
// import { UserContext } from '../App';
import Crops from "../component/Images/crop.jpg";
import { ReactNavbar } from "overlay-navbar";
import {BsFilePersonFill} from "react-icons/bs";
import {BsFillCartFill} from "react-icons/bs";

const Header = () => {
  // const { state, dispatch } = useContext(UserContext);

  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

  // const [click, setClick] = useState(false);

  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);



  // const RenderMenu = () => {
  //   if (state) {
  //     return (
  //       <>
  //         <NavLink to="/" activeStyle>
  //           <i className="bi bi-house-door-fill" style={{ marginRight: '3px' }} />
  //           Home
  //         </NavLink>
  //         <NavLink to="/about" activeStyle>
  //           <i className="bi bi-people-fill" style={{ marginRight: '3px' }} />
  //           About us
  //         </NavLink>
  //         <NavBtn>
  //           <NavBtnLink to='/logout'>Logout</NavBtnLink>
  //         </NavBtn>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <NavLink to="/" activeStyle>
  //           <i className="bi bi-house-door-fill" style={{ marginRight: '3px' }} />
  //           Home
  //         </NavLink>
  //         <NavLink to="/about" activeStyle>
  //           <i className="bi bi-people-fill" style={{ marginRight: '3px' }} />
  //           About us
  //         </NavLink>
  //         <NavBtn>
  //           <NavBtnLink onClick={showSidebar} to='#'>Log-in</NavBtnLink>
  //         </NavBtn>
  //       </>
  //     );
  //   }
  // };

  // return (
  //   <>
  //     <IconContext.Provider value={{ color: '#fff' }}>
  //       <Nav className="navbar">
  //         <h4 style={{ color: '#15cdfc', margin: '5px' }}>Complain Managment System</h4>
  //         <MobileIcon onClick={handleClick}>
  //           {click ? <FaTimes /> : <FaBars />}
  //         </MobileIcon>
  //         <NavMenu onClick={handleClick} click={click}>
  //           <RenderMenu onClick={closeMobileMenu} />
  //         </NavMenu>
  //         {sidebar && <DropdownItem onClick={showSidebar}>
  //           {DropdownData.map((item, index) => {
  //             return <DMenu item={item} key={index} />;
  //           })}
  //         </DropdownItem>}
  //       </Nav>
  //     </IconContext.Provider>

  //   </>
  // );
  return (
    <ReactNavbar
      bugerColor="red"
      burgerColorHover="green"
      navColor1="rgba(0,0,0,0.8)"
      logo={Crops}
      logoWidth="20vmax"
      logoHoverSize="10px"
      logoHoverColor="#006400"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      link1Text="Home"
      link2Text="About"
      link3Text="SignUp"
      link4Text="Login"
      link1Url="/"
      link2Url="/about"
      link3Url="/register"
      link4Url="/login"
      link1Size="2vmax"
      link2Margin="1vmax"
      link3Margin="0"
      link4Margin="1vmax"
      link1Color=""
      link1ColorHover=""
      link2Color=""
      link2ColorHover=""
      link3Color=""
      link3ColorHover=""
      link4Color=""
      link4ColorHover=""     
      cartIcon={true}
      CartIconElement={BsFillCartFill}
      cartIconMargin="0"
      cartIconUrl="/account"
      cartIconSize="2vmax"
      cartIconColor="white"
      cartIconColorHover="red"
      cartIconAnimationTime="2"
      profileIcon={true}
      ProfileIconElement={BsFilePersonFill}
      profileIconMargin="2vmax"
      profileIconUrl="/account"
      profileIconSize="2vmax"
      profileIconColor="white"
      profileIconColorHover="red"
      profileIconAnimationTime="3"
     />
  );
}

export default Header