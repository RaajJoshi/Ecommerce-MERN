import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import { SidebarData } from './SidebarData.js';
import SubMenu from './SubMenu.js';
import { IconContext } from 'react-icons/lib';

const NavIcon = styled(Link)`
    font-size: 3rem;
    position : fixed;
    right : 1.5rem;
    margin-top : 35px;
    width: 60px;
    height: 60px;
`;

const SidebarNav = styled.nav`
  overflow-x: hidden;
  background: black;
  width: 270px;
  height: 80vh;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  position: fixed;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  margin-top: 85px;
`;



const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                {/* <Nav> */}
                {!sidebar &&
                    <NavIcon to='#'>
                        <BsIcons.BsBoxArrowLeft style={{ color: "red" }} onClick={showSidebar} />
                    </NavIcon>
                }
                <SidebarNav sidebar={sidebar}>
                    {sidebar &&
                        <NavIcon to='#'>
                            <BsIcons.BsBoxArrowRight style={{ color: "red" }} onClick={showSidebar} />
                        </NavIcon>
                    }
                    <SidebarWrap>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;