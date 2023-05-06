import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
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
import {BiSearchAlt2} from "react-icons/bi"
import {BiBookAdd} from "react-icons/bi";
import { logout } from "../actions/userActions";
import { icons } from 'react-icons/lib';

const Header = () => {

  const { isAuthenticated, customer } = useSelector((state) => state.userDetail);


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
      burgerColor="green"
      burgerColorHover="white"
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
      link3Text={isAuthenticated ? (customer.role === "customer" ? "Orders" : (customer.role === "farmer" ? "Products" : "")) :  "SignUp"}
      link4Text={isAuthenticated ? "Logout" :  "Login"}
      link1Url="/"
      link2Url="/about"
      link3Url={isAuthenticated ? (customer.role === "customer" ? "/orders" : "/myProducts") : "/register"}
      link4Url={isAuthenticated ? "/logout" : "/login"}
      link1Size="2vmax"
      link2Margin="1vmax"
      link3Margin="0"
      link4Margin="1vmax"
      link1Color="white"
      link1ColorHover="green"
      link2Color="white"
      link2ColorHover="green"
      link3Color="white"
      link3ColorHover="green"
      link4Color="white"
      link4ColorHover="green"     
      cartIcon={isAuthenticated && customer.role !== "admin" ? true : false}
      CartIconElement={isAuthenticated && customer.role === "customer" ? BsFillCartFill : BiBookAdd}
      cartIconMargin="0"
      cartIconUrl={isAuthenticated && customer.role === "customer" ? "/cart" : "/product/create"}
      cartIconSize="2vmax"
      cartIconColor="white"
      cartIconColorHover="green"
      cartIconAnimationTime="2"
      profileIcon={isAuthenticated && customer.role !== "admin" ? true : false}
      ProfileIconElement={BsFilePersonFill}
      profileIconMargin="2vmax"
      profileIconUrl={isAuthenticated && customer.role === "customer" ? "/profile" : "/farmProfile"}
      profileIconSize="2vmax"
      profileIconColor="white"
      profileIconColorHover="green"
      profileIconAnimationTime="3"
      searchIcon={isAuthenticated && customer.role !== "farmer" ?  true : false}
      SearchIconElement={isAuthenticated && customer.role === "customer" ? BiSearchAlt2 : BsFilePersonFill}
      searchIconMargin="2vmax"
      searchIconUrl={isAuthenticated && customer.role === "customer" ? "/search" : "/admnProfile"}
      searchIconSize="2vmax"
      searchIconColor="white"
      searchIconColorHover="green"
      searchIconAnimationTime="4"
     />
  );
}

export default Header