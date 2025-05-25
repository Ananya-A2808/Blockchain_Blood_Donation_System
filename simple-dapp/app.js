
const contractAddress = "0x62C18B489E7B2b21C4880587800f24184b075ad5";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "storedValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.addEventListener("load", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const input = document.getElementById("inputValue");
  const setButton = document.getElementById("setButton");
  const getButton = document.getElementById("getButton");
  const storedValueSpan = document.getElementById("storedValue");

  setButton.onclick = async () => {
    try {
      const value = input.value;
      const tx = await contract.set(value);
      await tx.wait();
      alert("Value stored!");
    } catch (err) {
      console.error(err);
      alert("Error storing value");
    }
  };

  getButton.onclick = async () => {
    try {
      const value = await contract.get();
      storedValueSpan.innerText = value.toString();
    } catch (err) {
      console.error(err);
      alert("Error fetching value");
    }
  };
});
