import React from 'react'
import { useNavigate } from 'react-router'
import payment from './Paymentsuccessful.png';
 
function Paymentsuccess() {
  const navigate = useNavigate();
  return (
    <div style={{position:"absolute",top:"20vh",right:"20vw"}}>
    <img src={payment} alt=""/>
    <br></br>
    <button className='btn btn-warning' onClick={()=>navigate(-2)}>Back to Fee Details Page</button>&nbsp;&nbsp;&nbsp;&nbsp;
   
    </div>
  )
}
 
export default Paymentsuccess;