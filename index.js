const address = "0xe9769d9977914d368a74d9f58eB301A0C7B5Ac55";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "Msg",
    type: "event",
  },
  {
    inputs: [],
    name: "participate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "declareWinner",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
];

document.addEventListener("DOMContentLoaded", function (event) {
  if (window.ethereum) {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => console.log("we are ready"))
      .catch((err) => console.error(err.message));

    ethereum.on("chainChanged", () => window.location.reload());

    ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        console.log(`Using account ${accounts[0]}`);
      } else {
        console.error("0 accounts.");
      }
    });

    ethereum.on("message", (message) => console.log(message));

    ethereum.on("connect", (info) => {
      console.log(`Connected to network ${info}`);
    });

    ethereum.on("disconnect", (error) => {
      console.log(`Disconnected from network ${error}`);
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    document.getElementById("part").addEventListener("click", function () {
      console.log("clicked on participate button");
      const har_har_bhole = { value: "0xDE0B6B3A7640000" };
      contract
        .participate(har_har_bhole)
        .then((tx) => {
          console.log("transaction occured : ", tx.hash);
          return tx
            .wait()
            .then(() => {
              console.log("participated successfully");
            })
            .catch((err) =>
              console.log(
                "Printing error msg in participation-1: ",
                err.message
              )
            );
        })
        .catch((err) => {
          console.log("Printing error msg in participation-2: ", err.message);
        });

      // const transactionObject = {
      //   from: ethereum.selectedAddress,
      //   value: "0xDE0B6B3A7640000",
      // };
    });

    document.getElementById("dec").addEventListener("click", function () {
      console.log("clicked on declare result button");
      // contract.methods.declareWinner().send({
      //   from: ethereum.selectedAddress,
      // });

      contract
        .declareWinner()
        .then((tx) => {
          console.log("transaction occured : ", tx.hash);
          return tx
            .wait()
            .then(() => {
              console.log("text overwritten successfully");
            })
            .catch((err) =>
              console.log(
                "Printing error msg in declare winner -1: ",
                err.message
              )
            );
        })
        .catch((err) => {
          console.log("Printing error msg in declare winner -2: ", err.message);
        });
    });
  } else {
    console.error("Install MetaMask.");
  }
});
