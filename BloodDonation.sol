// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BloodDonation {
    struct Donor {
        string name;
        uint256 age;
        string gender;
        string medicalId;
        string bloodGroup;
        uint256 weight;
        bool verified;
    }

    struct Patient {
        string name;
        uint256 age;
        string gender;
        string medicalId;
        string bloodGroup;
        uint256 weight;
    }

    Donor[] private donors;
    Patient[] private patients;

    mapping(string => uint256) private donorIndexByMedicalId;
    mapping(string => uint256) private patientIndexByMedicalId;
    mapping(string => bool) private donorExists;
    mapping(string => bool) private patientExists;

    event DonorRegistered(string medicalId);
    event PatientRegistered(string medicalId);
    event DonorVerified(string medicalId);
    event PledgeVerified(string medicalId);

    constructor() {
        // Initialize mappings with zero index meaning non-existence
    }

    function registerDonor(
        string memory name,
        uint256 age,
        string memory gender,
        string memory medicalId,
        string memory bloodGroup,
        uint256 weight
    ) public {
        require(!donorExists[medicalId], "Donor already registered");
        Donor memory newDonor = Donor(name, age, gender, medicalId, bloodGroup, weight, false);
        donors.push(newDonor);
        donorIndexByMedicalId[medicalId] = donors.length - 1;
        donorExists[medicalId] = true;
        emit DonorRegistered(medicalId);
    }

    function registerPatient(
        string memory name,
        uint256 age,
        string memory gender,
        string memory medicalId,
        string memory bloodGroup,
        uint256 weight
    ) public {
        require(!patientExists[medicalId], "Patient already registered");
        Patient memory newPatient = Patient(name, age, gender, medicalId, bloodGroup, weight);
        patients.push(newPatient);
        patientIndexByMedicalId[medicalId] = patients.length - 1;
        patientExists[medicalId] = true;
        emit PatientRegistered(medicalId);
    }

    function getAllDonors() public view returns (Donor[] memory) {
        return donors;
    }

    function getAllPatients() public view returns (Patient[] memory) {
        return patients;
    }

    function verifyDonor(string memory medicalId) public {
        require(donorExists[medicalId], "Donor not found");
        uint256 index = donorIndexByMedicalId[medicalId];
        donors[index].verified = true;
        emit DonorVerified(medicalId);
    }

    function verifyPledge(string memory medicalId) public {
        // For simplicity, treat pledge verification same as donor verification
        require(donorExists[medicalId], "Donor not found");
        uint256 index = donorIndexByMedicalId[medicalId];
        donors[index].verified = true;
        emit PledgeVerified(medicalId);
    }
}
