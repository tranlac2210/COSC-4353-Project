import { FaGithub, FaUserTie, } from 'react-icons/fa';
import React from 'react';
const sublinks = [
  // {
  //   page: 'products',
  //   links: [
  //     { label: 'payment', icon: <FaCreditCard />, url: '/products' },
  //     { label: 'terminal', icon: <FaCreditCard />, url: '/products' },
  //     { label: 'connect', icon: <FaCreditCard />, url: '/products' },
  //   ],
  // },
  {
    page: 'developers',
    links: [
      { label: 'Lac Tran', icon: <FaUserTie />, url: 'https://www.linkedin.com/in/lac-tran-a7798a20b/' },
      { label: 'Charles Tran', icon: <FaUserTie />, url: '/products' },
      { label: 'Chuong Tran', icon: <FaUserTie />, url: '/products' },
      { label: 'Phat Tran', icon: <FaUserTie />, url: '/products' },
    ],
  },
  {
    page: 'about',
    links: [
      { label: 'Source Code', icon: <FaGithub />, url: 'https://github.com/tranlac2210/COSC-4353-Project/tree/Development' },
    ],
  },
];

export default sublinks;
