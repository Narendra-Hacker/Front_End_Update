import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Outlet } from "react-router-dom";


const FeeDetails = () => {
  const { memberId } = useParams();
  //console.log(memberId);
  const [feeData, setFeeData] = useState(null);
  const navigate = useNavigate();


  const getfeeId = async () => {
    var memid = localStorage.getItem("clientID");
    var response = await axios.get(
      `https://localhost:7114/api/FeeDetails/getfeeid/${memid}`
    );
    // setFeeData(response.data);
    // console.log(response.data.feeId)
    return response.data.feeId;
  };

  const bill = async () => {
    var feeId = await getfeeId();
    navigate(`/receipt/${feeId}`);
  };

  const payment =async ()=>{
    var feeId = await getfeeId();
    navigate(`/memberFeePayment/${feeId}`);
  }



useEffect(() => {
  const fetchFeeDetails = async () => {
    try {        
      // Use memberId instead of memid here
      const response = await axios.get(`https://localhost:7114/api/FeeDetails/getfeeid/${memberId}`);
      setFeeData(response.data);
      //console.log(response.data);

      } catch (error) {
      console.error("Error fetching fee details:", error);
    }
  };
    
  fetchFeeDetails();
}, [memberId]);




return (
    
      <div>
          <div style={styles.container}>
          <div className="container mt-4" style={styles.cardContainer}>  
          {feeData ? (
            <div>

            <h3><u> Fee Details </u> </h3>
            <br></br>
            <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                  <strong> Subscription: </strong> {feeData.subscription} Months

                  </li>
                  <li className="list-group-item">
                  <strong> Monthly Fees: </strong> 3500
                  </li>
                  
                  <li className="list-group-item">
                  <strong>Total Fee: </strong> {feeData.totalFees}
                  </li>
                  <li className="list-group-item">
                    <strong>Amount Paid: </strong> {feeData.amountPaid}
                  </li>
                  <li className="list-group-item">
                    <strong>Fee Due: </strong> {feeData.feeDue}
                  </li>
                  <li className="list-group-item">
                    <strong>Status: </strong> {feeData.status}
                  </li>
                  
                </ul> 

            <br></br>
            <button type="button" className="btn btn-primary mx-2" onClick={bill}>
              Download
            </button> 

            <button type="button" className="btn btn-primary mx-2" onClick={payment}> Make Payment </button>       
            </div>                    
          ) : (
            <div className="center-container">
              <h1 className="centered-text">You have not been assigned any fee yet</h1>
            </div>
          )}

          <br></br>

          {/* {feeData ? (
            <button type="button" className="btn btn-primary mx-2" onClick={bill}>
              Download
            </button>
          ) : (
            <p></p>
          )} */}

          
          <Outlet/>
          </div>
        </div>


      </div>

  );
};

export default FeeDetails;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',    
    height: '100vh',
    backgroundColor: '#f4f4f4',
    //testAlign: 'center',
  },
  cardContainer: {
    maxWidth: '400px',
    textAlign:'center',
  },
};


