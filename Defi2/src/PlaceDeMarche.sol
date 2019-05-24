pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract PlaceDeMarche {
    
    event inscription(string nom, uint256 reputation);
    event AjouterDemande(uint256 rem, uint256 delai, string desc, uint256 repMini);
    event Postuler(uint256 numDemande);
    event AccepterIllustrateur(uint256 numDemande, address dessinateur);
    event LivraisonTravail(uint256 numDemande, bytes32 travail);
    
    using SafeMath for uint256;
   
    struct Illustrateur {
        string nom;
        uint256 reputation;
    }
    mapping(address => Illustrateur) public illustrateurs;
    address[] public listIllustrateurs;
    uint256 public nbIllustrateurs;
    
   
    struct Demande {
        uint256 remuneration;
        uint256 delai;
        string description;
        uint etat;
        uint256 reputation_mini;
        address identifiant;
        bytes32 travail;
        mapping(address => uint) listCandidat;
    }
    Demande[] public Demandes;
    uint256 public nbDemandes;


    function Inscription(string memory nom, uint256 reputation) public {
        require(reputation>0);
        illustrateurs[msg.sender] = Illustrateur(nom, reputation);
        listIllustrateurs.push(msg.sender);
        nbIllustrateurs++;
        emit inscription(nom,reputation);
    }

    function ajouterDemande(uint256 rem, uint256 delai, string memory desc, uint256 repMini) public payable {
        require(rem>0 && delai>0 && repMini>0);
        require(msg.value>= rem.mul(102).div(100));
        Demandes.push(Demande(rem, delai, desc, 0,repMini,msg.sender,0));
        nbDemandes++;
        emit AjouterDemande(rem,delai,desc,repMini);
    }
   
    function estCandidat(uint256 numDemande) public view returns (uint) {
        return Demandes[numDemande].listCandidat[msg.sender];
    }

    function estDemandeCandidat(uint256 numDemande,address dessinateur) public view returns (uint) {
        return Demandes[numDemande].listCandidat[dessinateur];
    }

    function estIllustrateur(address dessinateur) public view returns (bool) {
        return illustrateurs[dessinateur].reputation>0;
    }

    function postuler(uint256 numDemande) public {
        require(estIllustrateur(msg.sender));
        require(illustrateurs[msg.sender].reputation >= Demandes[numDemande].reputation_mini );
        require(Demandes[numDemande].etat == 0 );
        Demandes[numDemande].listCandidat[msg.sender] = 1;
        emit Postuler(numDemande);
    }

    function accepterIllustrateur(uint256 numDemande, address dessinateur) public {
        require(estIllustrateur(dessinateur));
        require(Demandes[numDemande].etat == 0 );
        require(illustrateurs[dessinateur].reputation>0);
        Demandes[numDemande].listCandidat[dessinateur] = 2;
        Demandes[numDemande].etat = 1;
        emit AccepterIllustrateur(numDemande,dessinateur);
    }
    
    function produireHash(string memory url) public pure returns (bytes32) {
       return keccak256(bytes(url));
    }
   
    function livraisonTravail(uint256 numDemande, bytes32 travail) public {
        Demandes[numDemande].travail = travail;
        illustrateurs[msg.sender].reputation += 1;
        Demandes[numDemande].etat = 2;
        msg.sender.transfer(Demandes[numDemande].remuneration);
        emit LivraisonTravail(numDemande,travail);
   }



}
