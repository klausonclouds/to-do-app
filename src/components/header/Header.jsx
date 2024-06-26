import React from 'react';
import './header.css';
import Popup from '../popup/Popup';

const Header = ({ onClick, isPopup }) => {
  return (
    <div>
      <button className="addNew-btn" onClick={onClick}>
        Add New Task
      </button>
      <Popup type="add" onClick={onClick} isPopup={isPopup} />
    </div>
  );
};

export default Header;
