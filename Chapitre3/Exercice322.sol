pragma solidity ^0.5.7;

contract Cogere {

    mapping (address => uint) organisateurs;
    mapping (address => bool) festivaliers;
    string[] sponsors;
    uint nbSponsorsMax = 10;
    uint private depensesTotales;
    uint private creditTotales;
    uint placesRestantes = 1000;
    

    constructor() internal {
        organisateurs[msg.sender] = 100;   
    }

    function transfererOrga(address orga, uint parts) public {
        require(organisateurs[msg.sender] > parts,"Vous avez deplacer trop de responsabilit�");
        organisateurs[orga] = parts;
        organisateurs[msg.sender] = organisateurs[msg.sender] - parts;
    }
    
    function estOrga(address orga) public view returns (bool){
       return organisateurs[orga] > 0;
    }

    function comptabiliserDepense(uint montant) private {
        depensesTotales += montant;
    }
 
    function comptabiliserCredit(uint montant) private {
        creditTotales += montant;
    }
 
}

contract CagnotteFestival is Cogere {

    function sponsoriser(string memory nom) public payable {
        require(msg.value>= 30 ether,"Sponsoring minimum de 30 Ethers");
        require(sponsors.length < nbSponsorsMax,"Plus de nouveaux Sponsor");
        sponsors.push(nom);
    }
   
    function acheterTicket() public payable {
        require(msg.value>= 500 finney,"Place � 0.5 Ethers");
        require(placesRestantes>0,"Plus de places !");
        festivaliers[msg.sender]=true;
    }
    
    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender));
        require(destinataire != address(0));
        require(montant > 0);
        destinataire.transfer(montant);
    }
    
}