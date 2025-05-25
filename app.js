const contractAddress = "0x8568c46c76846e42208A79F3592cDC7D7c4A4BE4";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			}
		],
		"name": "DonorRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			}
		],
		"name": "DonorVerified",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			}
		],
		"name": "PatientRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			}
		],
		"name": "PledgeVerified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			}
		],
		"name": "registerDonor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			}
		],
		"name": "registerPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			}
		],
		"name": "verifyDonor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "medicalId",
				"type": "string"
			}
		],
		"name": "verifyPledge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllDonors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "gender",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medicalId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodGroup",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "weight",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct Blooddonation.Donor[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPatients",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "gender",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medicalId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodGroup",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "weight",
						"type": "uint256"
					}
				],
				"internalType": "struct Blooddonation.Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let contract;
let provider;
let signer;

window.contractReady = new Promise(async (resolve, reject) => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    reject(new Error("MetaMask not installed"));
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    resolve();
  } catch (err) {
    console.error(err);
    alert("Failed to initialize contract.");
    reject(err);
  }
});

async function registerDonor() {
  const name = document.getElementById("donorName").value;
  const age = parseInt(document.getElementById("donorAge").value);
  const gender = document.querySelector('input[name="donorGender"]:checked')?.value;
  const medicalId = document.getElementById("donorMedicalId").value;
  const bloodGroup = document.getElementById("donorBloodGroup").value;
  const weight = parseInt(document.getElementById("donorWeight").value);

  if (!name || !age || !gender || !medicalId || !bloodGroup || !weight) {
    alert("Please fill all donor fields.");
    return;
  }

  try {
    const tx = await contract.registerDonor(name, age, gender, medicalId, bloodGroup, weight);
    await tx.wait();
    alert("Donor registered successfully!");
    document.getElementById("donorForm").reset();
  } catch (err) {
    console.error(err);
    alert("Failed to register donor.");
  }
}

async function registerPatient() {
  const name = document.getElementById("patientName").value;
  const age = parseInt(document.getElementById("patientAge").value);
  const gender = document.querySelector('input[name="patientGender"]:checked')?.value;
  const medicalId = document.getElementById("patientMedicalId").value;
  const bloodGroup = document.getElementById("patientBloodGroup").value;
  const weight = parseInt(document.getElementById("patientWeight").value);

  if (!name || !age || !gender || !medicalId || !bloodGroup || !weight) {
    alert("Please fill all patient fields.");
    return;
  }

  try {
    const tx = await contract.registerPatient(name, age, gender, medicalId, bloodGroup, weight);
    await tx.wait();
    alert("Patient registered successfully!");
    document.getElementById("patientForm").reset();
  } catch (err) {
    console.error(err);
    alert("Failed to register patient.");
  }
}

async function viewDonors() {
  try {
    const donors = await contract.getAllDonors();
    const output = document.getElementById("output");
    output.innerHTML = `
      <h2></h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Medical ID</th>
            <th>Blood Group</th>
            <th>Weight (kg)</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          ${donors.map(d => `
            <tr>
              <td>${d.name}</td>
              <td>${d.age}</td>
              <td>${d.gender}</td>
              <td>${d.medicalId}</td>
              <td>${d.bloodGroup}</td>
              <td>${d.weight}</td>
              <td>${d.verified ? "Yes" : "No"}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.error(err);
    alert("Failed to fetch donors.");
  }
}

async function viewPatients() {
  try {
    const patients = await contract.getAllPatients();
    const output = document.getElementById("output");
    output.innerHTML = `
      <h2></h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Medical ID</th>
            <th>Blood Group</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          ${patients.map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.age}</td>
              <td>${p.gender}</td>
              <td>${p.medicalId}</td>
              <td>${p.bloodGroup}</td>
              <td>${p.weight}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.error(err);
    alert("Failed to fetch patients.");
  }
}

async function verifyPledges() {
  // Deprecated function, replaced by verifyPledgeFromInput
}

async function verifyPledgeFromInput() {
  const medicalId = document.getElementById("medicalIdInput").value.trim();
  const resultDiv = document.getElementById("verifyResult");
  resultDiv.textContent = "";
  if (!medicalId) {
    resultDiv.textContent = "Please enter a Medical ID.";
    return;
  }

  try {
    const tx = await contract.verifyPledge(medicalId);
    await tx.wait();
    resultDiv.textContent = "Pledge verified successfully!";
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Failed to verify pledge.";
  }
}

async function bloodMatch() {
  try {
    const patients = await contract.getAllPatients();
    const donors = await contract.getAllDonors();

    const bloodGroup = prompt("Enter blood group to match:");
    if (!bloodGroup) return;

    const matchedPatients = patients.filter(p => p.bloodGroup === bloodGroup);
    const matchedDonors = donors.filter(d => d.bloodGroup === bloodGroup && d.verified);

    const output = document.getElementById("output");
    output.innerHTML = "<h2>Blood Match Results</h2>";
    output.innerHTML += '<div class="match-container">';
    output.innerHTML += '<div class="match-list"><h3>Patients</h3>';
    if (matchedPatients.length === 0) {
      output.innerHTML += "<p>No patients found with this blood group.</p>";
    } else {
      matchedPatients.forEach(p => {
        output.innerHTML += `
          <div class="match-item">
            <strong>Name:</strong> ${p.name}<br/>
            <strong>Age:</strong> ${p.age}<br/>
            <strong>Gender:</strong> ${p.gender}<br/>
            <strong>Medical ID:</strong> ${p.medicalId}<br/>
            <strong>Weight:</strong> ${p.weight} kg
          </div>
        `;
      });
    }
    output.innerHTML += '</div>';

    output.innerHTML += '<div class="match-list"><h3>Donors</h3>';
    if (matchedDonors.length === 0) {
      output.innerHTML += "<p>No verified donors found with this blood group.</p>";
    } else {
      matchedDonors.forEach(d => {
        output.innerHTML += `
          <div class="match-item">
            <strong>Name:</strong> ${d.name}<br/>
            <strong>Age:</strong> ${d.age}<br/>
            <strong>Gender:</strong> ${d.gender}<br/>
            <strong>Medical ID:</strong> ${d.medicalId}<br/>
            <strong>Weight:</strong> ${d.weight} kg
          </div>
        `;
      });
    }
    output.innerHTML += '</div></div>';
  } catch (err) {
    console.error(err);
    alert("Failed to perform blood match.");
  }
}
