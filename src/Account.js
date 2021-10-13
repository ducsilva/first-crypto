import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import useEthBalance from './hooks/useEthBalance';
import AccountDetail from "./components/AccountDetail";


const Account = () => {
  const [address, setAddress] = useState('');
  const { balance, errorAcc } = useEthBalance(address);
  const [error, setError] = useState(errorAcc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const addr = data.get("addr");
    if(addr){
      setError();
      setAddress(data.get("addr"));
    } else {
      setError("Please fill your address");
    }
  };

  return (
    <form className="m-4 form-group" onSubmit={handleSubmit}>
      <div className="w-50 shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h3 className="text-center">
            Check balance
          </h3>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input w-100 border border-primary rounded-3 p-1 form-control"
                placeholder="Your Address"
              />
            </div>
          </div>
        </main>
        <footer className="px-4 pb-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-100 form-control"
          >
            Check now
          </button>
          {
            error ? <ErrorMessage message={error} /> : (address ? <AccountDetail balance={balance} address={address}/> : null)
          }
          
        </footer>
      </div>
    </form>
  );
}

export default Account;