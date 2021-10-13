import React from 'react';
import { ethers } from 'ethers';

const TxList = ({ txs }) => {
    if (txs.length === 0) return null;
  
    return (
      <>
        {txs.map((item) => (
          <div key={item} className="alert alert-info mt-5">
            <div className="flex-1">
              <label className="text-wrap">{`From Address: ${item?.from}`}</label>
            </div>
            <div className="flex-1">
              <label className="text-wrap">{`To Address: ${item?.to}`}</label>
            </div>
            <div className="flex-1">
              <label className="text-wrap">{`Value: ${ parseFloat(ethers.utils.formatEther(item?.value))} Ether`}</label>
            </div>
            <div className="flex-1">
              <label className="text-wrap">{`Hash: ${item?.hash}`}</label>
            </div>
          </div>
        ))}
      </>
    );
  }

  export default TxList;