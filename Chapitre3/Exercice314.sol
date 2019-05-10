pragma solidity ^0.5.7;
contract Assemblee {
 address[] membres;

 struct Decision {
   string description;
   uint votesPour;
   uint votesContre;
   mapping (address => bool) aVote;
 }


 Decision[] decisions;

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
    decisions.push(Decision(description,0,0));
   }
 }
 
 function voter(uint vote,bool sens)public {
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