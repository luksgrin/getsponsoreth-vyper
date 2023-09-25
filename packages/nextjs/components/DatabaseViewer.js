// components/DatabaseViewer.js

import React, { useState } from 'react';
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

// Define a template with a placeholder
const template = `<div>
  <h3>{name}</h3>
  <h3>{title}</h3>
  <p>{content}</p>
  <p>{contributions}</p>
</div>
`;

function DatabaseViewer({ data }) {
  const [selectedKey, setSelectedKey] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  var pledgeID = "";
  var user = null;

  // Function to update a struct by ID and return the updated array
  function updateStructById(arrayToUpdate, idToUpdate, updatedFields) {
    // Clone the array to avoid mutating the original
    const updatedArray = [...arrayToUpdate];

    // Find the index of the struct with the desired ID
    const indexToUpdate = updatedArray.findIndex((item) => item.pledgeID === idToUpdate);

    // Check if the struct with the ID exists
    if (indexToUpdate !== -1) {
      // Clone the struct to avoid mutating the original
      const updatedStruct = { ...updatedArray[indexToUpdate] };

      updatedStruct.contributions.push(updatedFields);
      updatedArray[indexToUpdate] = updatedStruct;
    }

    return updatedArray;
  }

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "GetSponsorETH",
    functionName: "fund",
    args: [
      BigInt(pledgeID),
      "0x0000000000000000000000000000000000000000",
      false,
      inputValue,
      "ZEPP",
      inputMessage
    ],
    value: inputValue,
    onBlockConfirmation: async (txnReceipt) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);

      var response = await fetch('/api/database');
      const database = await response.json();

      user = txnReceipt.from;

      const updatedData = updateStructById(
        database[selectedKey],
        pledgeID,
        {tx: txnReceipt.transactionHash, user: user, message: inputMessage}
      );

      database[selectedKey] = updatedData;

      response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(database),
      });
      const result = await response.json();
      console.log("result", result);
    },
  });

  const handleClick = (key) => {
    setSelectedKey(key);
  };

  const handleInputChange1 = (event) => {
    // Update the inputValue state as the user types
    setInputValue(event.target.value);
  };

  const handleInputChange2 = (event) => {
    // Update the inputValue state as the user types
    setInputMessage(event.target.value);
  };

  const handleInputSubmit = () => {
    // Perform your specific task based on the selectedKey and inputValue
    // For example, you can log both values to the console
    pledgeID = data[selectedKey][0].pledgeID; // Hacky but good enough for demo
    console.log(`Selected Key: ${selectedKey}`);
    console.log(`Input Value: ${inputValue}`);
    console.log(
      pledgeID
    );
    writeAsync();
  };

  // Check if selectedKey is valid before mapping
  const filledTemplates = selectedKey && data[selectedKey]
    ? data[selectedKey].map((item) => {
        // Fill the template for each element
        const filledTemplate = template
          .replace('{name}', item.name)
          .replace('{title}', item.title)
          .replace('{content}', item.pledge)
          .replace('{contributions}', JSON.stringify(item.contributions, undefined, 2));

        return filledTemplate;
      }).join('<br><hr /></br>')
    : '<p>No content</p>';

  return (
    <div>
      <h2>Active pledges</h2>
      <table>
        <thead>
          <tr>
            <th>Askers</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key} onClick={() => handleClick(key)}>
              <td>{key}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selectedKey && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: filledTemplates }} />
            <input
              type="number"
              placeholder="Enter a value"
              value={inputValue}
              onChange={handleInputChange1}
              required
              style={{
                color: 'black',
                padding: '1rem 2rem',
                width: '100%',
                margin: '1rem 0.5rem'
              }}
            />
            <input
              type="text"
              placeholder="Your message"
              value={user}
              onChange={handleInputChange2}
              required
              style={{
                color: 'black',
                padding: '1rem 2rem',
                width: '100%',
                margin: '1rem 0.5rem'
              }}
            />
            <button onClick={handleInputSubmit}>Sponsor this cause!</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatabaseViewer;

