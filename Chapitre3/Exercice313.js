 function voter(uint vote,bool sens)public {
     if(sens) {
         votesPour[vote]++;
     } 
     else {
         votesContre[vote]++;
     }
     
}

function comptabiliser(uint indice) public view returns (int){
    return int(votesPour[indice] - votesContre[indice]);
}

