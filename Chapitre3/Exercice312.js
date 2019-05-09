 function estMembre(address utilisateur) public view returns (bool) {
    bool retour = false;
    for (uint i=0; i<membres.length; i++) {
      if(utilisateur == membres[i]) {
          retour = true;
      }
    }
    return retour;
 }
