import { ethers } from 'ethers'
import React, { useState } from 'react'
import "./Memos.css";

const Buy = ({state}) => {
    const [name, setname] = useState("")
    const [Message, setMessage] = useState("")
    const buyChai = async (e) => {
      e.preventDefault();

      if (!state.contract) {
        alert("Contract is not initialized!");
        return;
      }

      const { contract } = state;
      const amount = { value: ethers.utils.parseEther("0.01") };

      try {
        const transaction = await contract.buychai(name, Message, amount);
        await transaction.wait();
          alert("Transaction successful!");
          window.location.reload();
      } catch (error) {
        alert("Transaction failed: " + error.message);
      }
    };

    console.log(name, Message);
  return (
      <div  className='text-center underline'>
          <h3 className='text-info'>Buy Some Cofee</h3>
          <p>Ensure you have metamask installed,do not use real money</p>
          <div className="d-flex justify-content-center">
              
      <form onSubmit={buyChai}>
        <label className="form-label">Name:</label>
        <input
          type="text"
          placeholder="Enter Name"
          className="form-control"
          required
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label>Message:</label>
        <input
          type="text"
          placeholder="Enter Message"
          className="form-control"
          required
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn logo mt-2 "
            style={{ width: "100px" }}
          >
            Buy
          </button>
        </div>
      </form>
          </div>
    </div>
  );
}

export default Buy