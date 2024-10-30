import React, { useEffect, useRef } from "react";
import "./alert.css"; // Importing the CSS for styling
import { useSelector } from "react-redux";
import { myEventsSelector } from "../../store/selectors"; // Selector to get event data
import config from "../../config.json"; // Configuration settings for the app

const Alert = () => {
  const alertRef = useRef(null); // Reference for the alert box
  const overlayRef = useRef(null); // Reference for the overlay
  const event = useSelector(myEventsSelector); // Getting the current event from the Redux store
  const isPending = useSelector((state) => state.medical.transaction.isPending); // Checking if a transaction is pending
  const isError = useSelector((state) => state.medical.transaction.isError); // Checking if there is an error in the transaction
  const chainId = useSelector((state) => state.provider.chainId); // Getting the current blockchain's chain ID

  // Handler to remove the alert
  const removeHandler = async (e) => {
    alertRef.current.className = "alertBox--remove"; // Apply removal class to alert box
    overlayRef.current.className = "overlay--remove"; // Apply removal class to overlay
  };

  // Effect to display the alert when a transaction is pending
  useEffect(() => {
    if (isPending) {
      alertRef.current.className = "alertBox"; // Show alert box
      overlayRef.current.className = "overlay"; // Show overlay
    }
  }, [isPending]); // Dependency array includes isPending

  // Render the alert based on the transaction state
  return (
    <div>
      {isPending ? (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alertBox--remove" ref={alertRef}>
            <h2>Transaction in Progress<span className="blinking">...</span></h2>
            <p>Please wait while we process your request.</p>
          </div>
        </div>
      ) : isError ? (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alertBox--remove" ref={alertRef}>
            <h2>Transaction Failed</h2>
            <p>There was an issue processing your request. Please try again.</p>
          </div>
        </div>
      ) : !isPending && event[0] ? (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alertBox--remove" ref={alertRef}>
            <h2>Transaction Successful</h2>
            <p>Your action has been successfully completed.</p>
            <div className="transactionHashOut">
              <a
                className="transactionHash"
                href={
                  config[chainId]
                    ? `${config[chainId].explorerURL}tx/${event[0].transactionHash}`
                    : `#`
                }
                target="_blank"
                rel="noreferrer"
              >
                View Transaction: {event[0].transactionHash.slice(0, 6) + "..." + event[0].transactionHash.slice(60, 66)}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Alert;
