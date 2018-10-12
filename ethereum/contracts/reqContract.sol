pragma solidity ^0.4.21;

contract Factory
{
    address[] public deployedCampaigns;
    uint reqDonation;
    
    function CreateNewDonationRequest (uint reqDonationAmount) public
    {
     require (findNgo(msg.sender));
     address newDonationRequest=new NewDonationRequest(reqDonationAmount,msg.sender);
     deployedCampaigns.push(newDonationRequest);
    }
    
    mapping(address=>bool) donors;
    mapping(address=>bool) ngos;
    mapping(address=>bool) merchants;
    
    function registerDonor() public{
        
        
        donors[msg.sender]=true;
    }
    
    function registerNgo() public{
        
        ngos[msg.sender]=true;
    }
    
    function registerMerchant() public{
        
        merchants[msg.sender]=true;
    }
    
    function findDonor(address Address) public view returns(bool) {
        return donors[Address];
    }
    
    function findNgo(address Address) public view returns(bool) {
        return ngos[Address];
    }
    
    function findMerchant(address Address) public view returns(bool) {
        return merchants[Address];
    }
    
}

contract NewDonationRequest {
    
    address public ngo; //address of the ngo account
    uint public reqDonationAmount;
    
    uint public minimumContribution;
    mapping(address=>bool) donors;
    
    //Address of the donation Contract
    address contractAddress;
    
    uint public donationRecived;
    
    uint donorCount;// no of donors
    
    struct Request{
        string description;
        uint amountRequired;
        address Merchant;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvers;
    }
    
    Request[] public requests;
    
    constructor (uint totalCon,address man) public
    {
        reqDonationAmount=totalCon;
        minimumContribution=uint(totalCon/20);
        ngo=man;
        donationRecived=0;
        contractAddress=this;
        donorCount=0;
    }
    
    modifier onlyManager
    {
        require(msg.sender == ngo);
        _;
    }
    
    function donateMoney () payable public
    {
        require(msg.value >= minimumContribution);
        donors[msg.sender]=true;
        
        donationRecived=contractAddress.balance;
        donorCount+=1;
    }
    function utilizeDonation(string description,uint amountRequired, address Merchant) onlyManager public
    {
        
        Request memory newReq= Request({
            description:description,
            amountRequired:amountRequired,
            Merchant:Merchant,
            approvalCount:0,
            complete:false
        });
        requests.push(newReq);
    }
    function approveRequest(uint index) public
    {
        require(donors[msg.sender]);
        require(!requests[index].approvers[msg.sender]);
        requests[index].approvers[msg.sender]=true;
        requests[index].approvalCount+=1;
        
    }
    
    function finalizeRequest(uint index) public onlyManager
    {
        require(requests[index].approvalCount > donorCount/2);
        require(!requests[index].complete);
        requests[index].Merchant.transfer(requests[index].amountRequired);
        requests[index].complete=true;
    }
    
    
}

