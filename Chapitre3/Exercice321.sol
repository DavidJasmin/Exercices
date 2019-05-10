pragma solidity ^0.5.7;
contract CagnotteFestival{

    mapping (address => uint) organisateurs;
    uint256 nbOrga = 0;

    constructor() public {
        organisateurs[msg.sender] = 100;
        nbOrga++;
    }
    
    function transfererOrga(address orga, uint parts) public {
        require(organisateurs[msg.sender] > parts,"Vous avez deplacer trop de responsabilité");
        organisateurs[orga] = parts;
        nbOrga++;
        organisateurs[msg.sender] = organisateurs[msg.sender] - parts;
    }
    
    function estOrga(address orga) public view returns (bool){
       return organisateurs[orga] > 0;
    }
    
}