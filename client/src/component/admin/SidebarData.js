import React from 'react';
import { MdDashboard, MdPeople } from "react-icons/md";
import { SiSmartthings } from "react-icons/si";
import  { RiLuggageDepositLine } from "react-icons/ri";
import { IoPeopleCircleOutline } from "react-icons/io5";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard />
  },
  {
    title: 'All Products',
    path: '/admin/products',
    icon: <SiSmartthings />
  },
  {
    title: 'All Orders',
    path: '/admin/orders',
    icon: <RiLuggageDepositLine />,
  },
  {
    title: 'All Farmers',
    path: '/admin/farmers',
    icon: <MdPeople />
  },
  {
    title: 'All Customers',
    path: '/admin/customers',
    icon: <IoPeopleCircleOutline />
  }
];