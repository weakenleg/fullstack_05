import React from 'react'
import '../Notification.css'

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }

  return (
    <div className={`notification ${error ? 'error' : 'success'}`}>
      {message && <p className="notification-message">{message}</p>}
      {error && <p className="notification-error">{error}</p>}
    </div>
  )
}

export default Notification


