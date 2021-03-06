pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Credibilite {
  
   using SafeMath for uint256;
  
   mapping (address => uint256) public cred;
   bytes32[] private devoirs;
   
   function produireHash(string memory url) public pure returns (bytes32) {
       return keccak256(bytes(url));
   }
   
   function transfer(address destinataire, uint256 valeur) public {
       require(cred[msg.sender] > valeur);
       cred[msg.sender] -= valeur;
       cred[destinataire] += valeur;
   }
   
   function remettre(bytes32 dev) public returns (uint256) {
       uint256 nbDevoirs = devoirs.length;
       uint nbCred = 10; 
       if (nbDevoirs == 0) {
           nbCred += 20;
       }
       if (nbDevoirs == 1) {
           nbCred += 10;
       }
       devoirs.push(dev);
       cred[msg.sender] = nbCred;
       return nbDevoirs+1;
   }

}
