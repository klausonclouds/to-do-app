import React, { useState } from 'react';
import './todolist.css';
import Popup from '../popup/Popup';

const Todolist = () => {
  const [updatePopup, setUpdatePopup] = useState(false);

  const handleUpdatePopup = () => {
    setUpdatePopup((prevUpdatePopup) => !prevUpdatePopup);
  };

  return (
    <div>
      todo list
      <button className="update-btn" onClick={handleUpdatePopup}>
        Update
      </button>
      <Popup type="update" onClick={handleUpdatePopup} isPopup={updatePopup} />
    </div>
  );
};

export default Todolist;
