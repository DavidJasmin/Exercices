pragma solidity ^0.5.7;
contract Assemblee {
 string public nomAssemblee;
 address[] admins;
 address[] membres;
 struct Decision {
   string description;
   bool open;
   uint votesPour;
   uint votesContre;
   mapping (address => bool) aVote;
 }
 Decision[] decisions;
 

 constructor (string memory nom) public {
   nomAssemblee = nom;
   admins.push(msg.sender);
 }

 function estAdmin(address utilisateur) public view returns (bool) {
    bool retour = false;
    for (uint i=0; i<admins.length; i++) {
      if(utilisateur == admins[i]) {
          retour = true;
      }
    }
    return retour;
 }

 function nommerAdmin(address utilisateur) public {
    require(estAdmin(msg.sender));
    admins.push(utilisateur);
 }
 
 function demissionnerAdmin() public {
    require(estAdmin(msg.sender));
    supprimerAdmin(msg.sender);
 }
 
 function supprimerAdmin(address utilisateur) public {
    require(admins.length > 2);
    bool found = false;
    for (uint i=0; i<admins.length; i++) {
      if(utilisateur == admins[i]) {
          found = true;
      }
      if(found && i < admins.length-1) {
          admins[i]=admins[i+1];
      }
    }
    if(found) {
        delete admins[admins.length-1];
        admins.length--;
    }
 }
 
 function rejoindre() public {
   membres.push(msg.sender);
 }
 
 function estMembre(address utilisateur) public view returns (bool) {
    bool retour = false;
    for (uint i=0; i<membres.length; i++) {
      if(utilisateur == membres[i]) {
          retour = true;
      }
    }
    return retour;
 }
 
 function proposerDecision(string memory description) public {
   if(estMembre(msg.sender)){
    decisions.push(Decision(description,true,0,0));
   }
 }
 
    function cloturerVotes(uint vote) public {
        require(decisions[vote].open,"le vote est déjà fermé");
        require(estAdmin(msg.sender),"il faut etre un admin");
        decisions[vote].open=false;
    }

 
 function voter(uint vote,bool sens)public {
     require(decisions[vote].open,"le vote est fermé");
     require(decisions[vote].aVote[msg.sender],"A déjà voté");
     if(sens) {
         decisions[vote].votesPour++;
     } 
     else {
         decisions[vote].votesContre++;
     }
     decisions[vote].aVote[msg.sender]=true;
}

function comptabiliser(uint indice) public view returns (int){
    return int(decisions[indice].votesPour - decisions[indice].votesContre);
}

}