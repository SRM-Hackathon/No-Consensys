pragma solidity ^0.4.21;



contract NewRequest {
    
    address public manager;
    uint public totalContribution;
    uint public contriRecieved;
    uint public minimumContribution;
    mapping(address=>bool) donors;
    
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
    
    Request[] requests;
    
    constructor (uint totalCon) public
    {
        totalContribution=totalCon;
        minimumContribution=uint(totalCon/20);
        manager=msg.sender;
        contriRecieved=0;
    }
    
    function donateMoney () payable public
    {
        require(msg.value> minimumContribution);
        donors[msg.sender]=true;
        
        contriRecieved=this.balance;
    }
    function createRequest(string description,uint monReq, address Merchant)
    {
        Request memory newReq= Request({
            description:description,
            monReq:monReq,
            Merchant:Merchant,
            appCount:0,
            complete:false
        });
    }
    
}