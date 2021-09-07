import React, {useState} from 'react'
import { Alert } from 'react-bootstrap';

const AlertComponent = (props) => {
    const [show, setShow] = useState(props.type!==""?true:false);

  if (show) {
    return (
      <Alert variant={props.type} onClose={() => setShow(false)} dismissible className="d-flex align-items-center">
        <strong>{props.type}</strong> {props.message}
      </Alert>
    );
  }
  else{
    return(
      <div style={{height:"58px"}}></div>
    );
  }
}
export default AlertComponent;
