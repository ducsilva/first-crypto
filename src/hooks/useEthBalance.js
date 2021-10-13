import { useCallback, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default function useEthBalance(addr = '') {
  // addr = "0xff383a2b2c6349a463e46c4965eddc43f79fcc65" 
  const [error, setError] = useState();
  const [balance, setBalance] = useState(0);

  const prevBalanceRef = useRef(0);

  const fetchBalance = useCallback(async () => {
    try {
       const rawBalance = await provider.getBalance(addr);
       const value = parseFloat(ethers.utils.formatEther(rawBalance));
       
       if (value !== prevBalanceRef.current) {
         prevBalanceRef.current = value;
         setBalance(value);
        }
     
    } catch (err) {
      setError(err.message)
    }
  }, [addr]);

  useEffect(() => {
    if (addr) {
      fetchBalance();
    }
  }, [addr, fetchBalance]);

  useEffect(() => {
    if (addr) {
      provider.on('block', fetchBalance);

      return () => {
        provider.off('block', fetchBalance);
      };
    }
  }, [addr, fetchBalance]);

  return { balance, errorAcc: error };
}
