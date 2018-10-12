pragma solidity ^0.4.21;

contract Factory
{
    address ngoAdd;
    uint reqDonation;
    
    constructor (uint reqDon)
    {
        reqDonation=reqDon;
        ngoAdd=msg.sender;
    }
}

contract NewRequest {
    
    address public manager;
    uint public totalContribution;
    uint public contriRecieved;
    uint public minimumContribution;
    mapping(address=>bool) donors;
    
    address contractAddress;
    
    uint public donationRecived;
    
    uint donorCount;
    
    struct Request{
        string description;
        uint monReq;
        address Merchant;
        bool complete;
        uint appCount;
        mapping(address=>bool) approved;
    }
    
    Request[] public requests;
    
    constructor (uint totalCon) public
    {
        totalContribution=totalCon;
        minimumContribution=uint(totalCon/20);
        manager=msg.sender;
        contriRecieved=0;
        contractAddress=this;
        donorCount=0;
    }
    
    modifier onlyManager
    {
        require(msg.sender == manager);
        _;
    }
    
    function donateMoney () payable public
    {
        require(msg.value> minimumContribution);
        donors[msg.sender]=true;
        
        contriRecieved=contractAddress.balance;
        donorCount+=1;
    }
    function createRequest(string description,uint monReq, address Merchant) onlyManager public
    {
        
        Request memory newReq= Request({
            description:description,
            monReq:monReq,
            Merchant:Merchant,
            appCount:0,
            complete:false
        });
        requests.push(newReq);
    }
    function approveRequest(uint index) public
    {
        require(donors[msg.sender]);
        require(!requests[index].approved[msg.sender]);
        requests[index].approved[msg.sender]=true;
        requests[index].appCount+=1;
        
    }
    
    function finalizeRequest(uint index) public onlyManager
    {
            require(requests[index].appCount > donorCount/2);
            require(!requests[index].complete);
            requests[index].Merchant.transfer(requests[index].monReq);
            requests[index].complete=true;
    }
    
    
}