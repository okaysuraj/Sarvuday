import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './StripePaymentModal.module.css';

const CheckoutForm = ({ onSuccess, onCancel, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // Redirect here if redirect-based payment
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      // Payment successful
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <h3 className={styles.title}>Complete Payment</h3>
      <p className={styles.amountText}>Amount Due: ₹{amount}</p>
      
      <div className={styles.cardContainer}>
         <PaymentElement />
      </div>

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.actions}>
        <button 
          type="button" 
          onClick={onCancel} 
          className={styles.cancelBtn}
          disabled={isProcessing}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={!stripe || isProcessing} 
          className={styles.payBtn}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};

const StripePaymentModal = ({ clientSecret, publishableKey, amount, onSuccess, onCancel }) => {
  if (!clientSecret || !publishableKey) return null;

  const stripePromise = loadStripe(publishableKey);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} amount={amount} />
        </Elements>
      </div>
    </div>
  );
};

export default StripePaymentModal;
