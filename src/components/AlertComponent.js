import React from 'react'
import { Alert } from 'react-bootstrap';

const AlertComponent = ({alert}) => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase()+str.slice(1);
  }
  if (alert.type) {
    return (
      <Alert variant={alert.type} className="d-flex align-items-center">
        <strong>{alert.type==='danger'?"Error":capitalize(alert.type)}!&nbsp;</strong>{alert.message}
      </Alert>
    );
  }
  else{
    return(
      <div style={{height:"58px", marginBottom:'1rem'}}></div>
    );
  }
}
export default AlertComponent;
