import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 30px;
  text-decoration: none;
  font-size: 12px;
  &:hover {
    background: #252831;
    border-left: 4px solid #15cdfc;
    cursor: pointer;
    color: #256ce1;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;


const DropDownMenu = ({ item }) => {

  return (
    <>
      <SidebarLink to={item.path}>
        <div>
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default DropDownMenu;