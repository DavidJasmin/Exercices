let tailleMax = 6000;
let pourboireMax = 0;
let transationMax = [];
let transaction = [[2000,13000],[6000,9000],[800,2000],[700,1500],[1200,3500],[1000,2800],[1300,5000],[600,1500]];

//Une boucle qui va créer toutes les combinaisaons possibles
for(i=0; i < 2**transaction.length; i++) {
  // Transcries la combinaison possible en binaire [1,1,1,0,1,0,1]
  let uneTransaction = [];
  var n=i;
  while(n!=0) {
  	var r=n%2;
  	uneTransaction.push(r);
  	n=(n-r)/2;
  }

// 10 => [0,1,0,1] => 1010
  // uneTransaction contient la combinaison binaire a tester
  var sommeOctet = 0;
  var sommePourboire = 0;
  for(var j=uneTransaction.length-1;j>=0;j--) {
    if(uneTransaction[j]==1) {
      sommeOctet += transaction[j][0];
      sommePourboire += transaction[j][1];
    }
  }

  //On assigne le meilleur résultat vérifiant les conditions dans transationMax
  if(sommeOctet<=tailleMax && sommePourboire>pourboireMax) {
    pourboireMax=sommePourboire;
    transationMax=uneTransaction;
  }
}

sommeOctet=0;
sommePourboire=0;

//On affiche le meilleur résultat
console.log("Voici les paquets a prendre");
for(var j=transationMax.length-1;j>=0;j--) {
  if(transationMax[j]==1) {
    sommeOctet+=transaction[j][0];
    sommePourboire+=transaction[j][1];
    console.log(transaction[j][0]," octets => ",transaction[j][1]," satoshis");
  }
}

console.log("Soit ",sommeOctet," octets cumulés pour ",sommePourboire," satoshis");
