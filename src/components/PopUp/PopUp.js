import React from 'react'
import './PopUp.css'

function PopUp({deleteUser, toggle}) {
  return (
      <div className="popup">
        <div className="popup__content">
          <span className="close" onClick={toggle}>
          &times;
          </span>
          <h3>Are you sure to delete this user?</h3>
          <button onClick={deleteUser}>Delete</button>
          <button onClick={toggle}>Cancel</button>
        </div>
    </div>
  )
}

export default PopUp
