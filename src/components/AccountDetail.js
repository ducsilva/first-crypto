import React from 'react';

const AccountDetail = ({ balance, address }) => {
  return (
    <div className="mt-5">
      <p>Your address: <span className="fw-bold">{address}</span></p>
      <p> Your current balance: <span className="fw-bold">{balance} Ether</span></p>
    </div>
  )
}

export default AccountDetail;