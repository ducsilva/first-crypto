import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./components/ErrorMessage";
import TxList from "./components/TxList";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    
    setTxs([tx]);
  } catch (err) {
    if(err?.data){
      setError(err?.data?.message);

    } else setError(err?.message);
  }
};

const Transaction = () => {
  const [error, setError] = useState('');
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const addr = data.get("addr");
    const ether = data.get("ether");
    if(addr && ether){
      await startPayment({
        setError,
        setTxs,
        ether,
        addr
      });
    } else {
      setError("Recipient Address and Amount in ETH should be not empty!")
    }
  };

  return (
    <form className="m-4 form-group" onSubmit={handleSubmit}>
      <div className="w-50 shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h3 className="text-center">
            Send Ether
          </h3>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input w-100 border border-primary rounded-3 p-1 form-control"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input w-100 border border-primary rounded-3 p-1 form-control"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="px-4 pb-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-100"
          >
            Pay now
          </button>
          {
            error && <ErrorMessage message={error} />
          }
          
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}

export default Transaction;
