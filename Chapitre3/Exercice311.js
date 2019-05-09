  function passerArtisteSuivant() public {
    if (tour < (12 - creneauxLibres)) {
      tour += 1;
    }
  }

  function artisteEnCours () public constant returns (string) {
    if (tour < (12 - creneauxLibres)) {
      return passagesArtistes[tour];
    }
    else {
      return "FIN";
    }
  }
