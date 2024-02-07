import React,{ useState,useEffect } from "react";
import { Outlet, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CLIENT_ID } from '../Config/Config'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const MemberFeePayment = () => {

    const { feeId } = useParams();
    //console.log("ID from useParams:", feeId);
    const [feeData, setFeeData] = useState(null);
    const navigate = useNavigate();
    const [member, setMember] = useState([]);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const [amountPaid, setAmountPaid] = useState('');

    
  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order.create({
        purchase_units: [
            {                
              amount: {
                currency_code: "USD",
                value: amountPaid,
              },
            },
        ],
    }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
};

// check Approval
const onApprove = (data, actions) => {
  return actions.order.capture().then(function (details) {
    const { payer } = details;
    setSuccess(true);

    // Call the function to update fee details
    updateFeeDetails();
  });
};

//capture likely error
const onError = (data, actions) => {
  setErrorMessage("An Error occured with your payment ");
};

useEffect(() => {
  if (success) {
    //alert("Payment successful!!");
    console.log('Order successful. Your order id is--', orderID);
    navigate("/paymentsucess");
  }
}, [success]);



    useEffect(() => {
      const fetchFeeDetails = async () => {
        try {
          // Use memberId instead of memid here
          const response = await axios.get(`https://localhost:7114/api/FeeDetails/GetFeeDetails/${feeId}`);
          const feesData = response.data;

          setFeeData(feesData);
          console.log(response.data);

          // Check if feeData is not null before accessing memberId
          //console.log("member Id :", feesData?.memberId);

          if (feesData.memberId) {
            const response = await axios.get(
              `https://localhost:7114/api/MemberRegt/GetMember/${feesData.memberId}`
            );
            const memberData = response.data;
            setMember(memberData);
            console.log("Member Data:", memberData);
          }
          else {
            setError("Member Details Not Fetching Properly");
          }

          } catch (error) {
            console.error("Error fetching fee details:", error);
            setError("Error fetching data. Please try again.");
          }
        };
  
        fetchFeeDetails();        
      }, [feeId]);


 

    // const handleSubmit = () => {        
    //     console.log('Amount Paid:', amountPaid);
    //     resetForm();
    //     navigate(-1);
    //   };
 
    //   const resetForm = () => {
    //     setAmountPaid('');
    //   };   

    const resetForm = () => {
      setAmountPaid('');
    };

    const updateFeeDetails = async () => {
      try {
        const newFeeDue = parseInt(feeData.amountPaid) + parseInt(amountPaid);

    
        // Make an API call to update fee details
        console.log("data",feeData);


        console.log("Amount entered into text box:", amountPaid);
        console.log("Details Fetched",feeData.amountPaid);
        console.log("new fee",newFeeDue);
        
        await axios.put(`https://localhost:7114/api/FeeDetails/Update/${feeData.feeId}`, {
         // feeId:feeData.feeId,
          memberId: feeData.memberId,
          subscription: feeData.subscription,
          amountPaid: newFeeDue,
        });
       
    
        // Optionally, you can refetch the updated fee details
        // to reflect the changes in your local state
        const response = await axios.get(`https://localhost:7114/api/FeeDetails/GetFeeDetails/${feeData.feeId}`);
        const updatedFeeData = response.data;
        setFeeData(updatedFeeData);
      } catch (error) {
        console.error("Error updating fee details:", error);
      }
    };
     

return(
  <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
  <div>   
    <div style={styles.container}>
    
      <div className="container mt-4" style={styles.cardContainer}>  
      <h2> <u>"Welcome to the payment page {member.firstName} {member.lastName}" </u></h2>
      <br></br>

      {feeData ? (
        <div>
        <ul className="list-group list-group-flush">
{/*               
              <li className="list-group-item">
              <strong>Total Fee: </strong> {feeData.totalFees}
              </li>
              <li className="list-group-item">
                <strong>Amount Paid: </strong> {feeData.amountPaid}
              </li> */}
              <li className="list-group-item"  style={{fontSize:30}}>
               <span style={{fontWeight:"bold"}}> Fee Due :  </span> {feeData.feeDue}
              </li>            
              
            </ul>         
        </div>
                
      ) : (
        <h1>You have not been assigned any fee yet</h1>
      )}     

    <div className="container mt-5">
        <form className="row g-3">
            <div className="col-md-7">
            <label htmlFor="amountPaid" className="form-label">
                Enter The Amount That You Want To Pay:
            </label>
            </div>
            <div className="col-md-5">
            <input
                type="number"
                id="amountPaid"
                name="amountPaid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="form-control"
                required
            />
            </div>

            <div className="col-md-9 offset-md-3">
            <button type="button" className="btn btn-primary mx-2" onClick={() => setShow(true)}>
                Submit
            </button>
            <button type="button" className="btn btn-secondary mx-2" onClick={()=>navigate(-1)}>
                Cancel Payment
            </button>
            </div>
        </form>

        <br></br>
        {show ? (
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        ) : null} 
    
        </div>
        </div>      
    </div>
    </div>   
    
        </PayPalScriptProvider>
    );

}

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',    
      height: '100vh',
      backgroundColor: '#f4f4f4',
      //testAlign: 'center',
    },
    cardContainer: {
      maxWidth: '630px',
      textAlign:'center',
    },
  };

export default MemberFeePayment;

