import { useEffect, useRef, useState } from "react";
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

export const SubmissionFormContractInteraction = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    duration: '',
    pledge: '',
    expiry: false,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  var time_to_expiry = BigInt(0);

  if (formData.expiry) {
    time_to_expiry = BigInt(formData.duration);
  } else {
    time_to_expiry = BigInt(0);
  }

  const is_perpetual = true;

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "GetSponsorETH",
    functionName: "createSponsor",
    args: [
      time_to_expiry,
      formData.pledge,
      is_perpetual,
      [
        "content",
        "here would the IPFS hash go",
        "pledge",
        formData.pledge,
        "author",
        formData.name,
      ]
    ],
    onBlockConfirmation: async (txnReceipt) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);

      var response = await fetch('/api/database');
      const database = await response.json();

      const sender = txnReceipt.from;
      const pledgeData = {
        "name": formData.name,
        "title": formData.title,
        "duration": formData.duration,
        "pledge": formData.pledge,
        "expiry": formData.expiry,
        "txHash": txnReceipt.transactionHash,
        "pledgeID": txnReceipt.logs[0].topics[1].toString(),
        "contributions": [],
      };

      if (database.hasOwnProperty(sender)) {
        database[sender].push(pledgeData);
      } else {
        database[sender] = [pledgeData];
      }

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

  const handleSubmit = (e:any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    writeAsync(); // Call your asynchronous form submission logic
  };

/*  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "totalCounter",
  });*/

/*  const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "greeting",
  });*/

/*  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "GreetingChange",
    listener: logs => {
      logs.map(log => {
        const { greetingSetter, value, premium, newGreeting } = log.args;
        console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
      });
    },
  });*/

/*  const {
    data: myGreetingChangeEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { greetingSetter: address },
    blockData: true,
  });*/

/*  console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);*/

/*  const { data: yourContract } = useScaffoldContract({ contractName: "YourContract" });*/
  /*console.log("yourContract: ", yourContract);*/

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:<br></br></label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            color: 'black',
            padding: '1rem 2rem',
            width: '100%',
            margin: '1rem 0.5rem'
          }}
        />
        <br></br>
      </div>

      <div>
        <label htmlFor="title">Title:<br></br></label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            color: 'black',
            padding: '1rem 2rem',
            width: '100%',
            margin: '1rem 0.5rem'
          }}
        />
        <br></br>
      </div>

      <div>
        <label htmlFor="duration">Duration:<br></br></label>
        <textarea
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          style={{
            color: 'black',
            padding: '1rem 2rem',
            width: '100%',
            margin: '1rem 0.5rem'
          }}
        />
        <br></br>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="expiry"
            checked={formData.expiry}
            onChange={handleChange}
            style={{
                color: 'black',
                padding: '1rem 2rem',
                margin: '1rem 0.5rem'
            }}
          />
          This pledge expires
        </label>
      </div>

      <div>
        <label htmlFor="pledge">Pledge:<br></br></label>
        <textarea
          id="pledge"
          name="pledge"
          value={formData.pledge}
          onChange={handleChange}
          required
          style={{
            color: 'black',
            padding: '1rem 2rem',
            width: '100%',
            margin: '1rem 0.5rem'
          }}
        />
        <br></br>
      </div>

      <button
      type="submit"
      style={{
        backgroundColor: '#007BFF',  // Background color
        color: '#ffffff',           // Text color
        padding: '10px 20px',       // Padding
        border: 'none',            // Remove default border
        borderRadius: '5px',        // Rounded corners
        cursor: 'pointer',         // Cursor style on hover
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Box shadow
        transition: 'background-color 0.3s, transform 0.2s',  // Smooth transitions
      }}
      >Submit</button>
    </form>
  );
};
