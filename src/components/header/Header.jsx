import React from 'react';
import './header.css';
import Popup from '../popup/Popup';

const Header = (props) => {
  return (
    <div>
      <button className="addNew-btn" onClick={props.onClick}>
        Add New Task
      </button>
      <Popup type="add" onClick={props.onClick} isPopup={props.isPopup} />
    </div>
  );
};

export default Header;
