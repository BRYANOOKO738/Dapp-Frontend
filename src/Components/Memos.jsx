import React, { useState, useEffect } from "react";
import { ethers } from "ethers";


const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memoMessage = async () => {
      try {
        const memos = await contract.getMemos(); // Fetching memos
        const formattedMemos = memos.map((memo) => ({
          name: memo.memo, // Assuming 'memo' contains the name
          message: memo.message,
          timestamp: ethers.BigNumber.from(memo.timestamp).toNumber(),
          from: memo.from,
        }));
        setMemos(formattedMemos); // Update state with formatted memos
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    contract && memoMessage();
  }, [contract]);

  return (
    <div className="container mt-4">
      <h3 className="text-warning text-center">Transactions</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-primary">Name</th>
            <th className="text-primary">Message</th>
            <th className="text-primary">Timestamp</th>
            <th className="text-primary">From</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo, index) => (
            <tr key={index}>
              <td>{memo.name}</td>
              <td>{memo.message}</td>
              <td>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
              <td>{memo.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memos;
