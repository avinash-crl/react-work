import React from 'react'

const button = ({name,onClick}) => {
  return (
    <>
        <button  onClick={onClick}>{name}</button> 
    </>
);
};

export default button;