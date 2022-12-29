import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Nav = styled.nav`
    background: black;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw-1000px)/2);
    z-index: 10;
`;

export const NavLink = styled(Link)`
    color: white;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active{
        color: #15cdfc;
    };

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;
        &:hover {
          color: #4b59f7;
          transition: all 0.3s ease;
        }
        &.active{
            color: #15cdfc;
        }
    }
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

// export const Bars = styled(FaBars)`
//     display: none;
//     color: white;

//     @media screen and (max-width: 768px){
//         display: block;
//         position: absolute;
//         top: 0;
//         right: 0;
//         transform: translate(-100%,75%);
//         font-size: 1.8rem;
//         cursor: pointer;
//     }
// `;

export const NavMenu = styled.div`
    display: flex;
    // position: fixed;
    // right: 0;
    align-items: center;

    @media screen and (max-width: 960px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80vh;
        overflow: scroll;
        position: absolute;
        top: 80px;
        left: ${({ click }) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background: #101522;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        margin-right: 0px;
        align-items: center;
        width: 100%;
        height: 120px;
        padding: 5px;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #0DB8DE;
    };
    @media screen and (max-width: 960px) {
        width: 100%;
        text-align: center;
        border-radius: none;
    }
`;

export const DropdownItem = styled.nav`
    display: flex;
    flex-direction: column;
    background-color: black;
    padding: 5px;
    position: fixed;
    top: 80px;
    width: 100%
`;