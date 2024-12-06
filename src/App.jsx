import { useState,useEffect } from 'react'
import './App.css'
import { ethers } from 'ethers'
import  Buy  from "./Components/Buy"
import  Memos  from "./Components/Memos"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setaccount] = useState("Not Connected")
 useEffect(() => {
   const template = async() => {
     // Your smart contract ABI
     const abi = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"buychai","inputs":[{"name":"name","type":"string","internalType":"string"},{"name":"message","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"getMemos","inputs":[],"outputs":[{"name":"","type":"tuple[]","internalType":"struct Chai.Memo[]","components":[{"name":"memo","type":"string","internalType":"string"},{"name":"message","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"from","type":"address","internalType":"address"}]}],"stateMutability":"view"},{"type":"error","name":"InsufficientAmount","inputs":[]}];
       
     // Your smart contract address
     const address = "0xf612d9cf2d13cf9a4d9f8e1a02212293a81916e4";
      try {
          const { ethereum } = window;

          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        
        // reload when account is changed
        window.ethereum.on("accounts changed", () => { 
          window.location.reload();
        })
          setaccount(account);

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        // console.log(contract);
          setState({ provider, signer, contract });
      } catch (error) {
        alert(error.message)
      }
   
   }
   template()
 }, [])
 
  return (
    //root@DESKTOP-9HU6DH7:~/BlockhainApp#
    <>
      <img
        src="./resized_banner_with_increased_height.png"
        className="img-fluid"
        alt=".."
        width="100%"
      />
      <p
        className="text-center m-3 text-danger"
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        Connected Account - <small className="text-success"> {account}</small>
      </p>
      <Buy state={state} />
      <Memos state={state} />
    </>
  );
}

export default App
