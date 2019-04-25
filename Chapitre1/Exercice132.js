function frequences(chaine) {
  let retour = []
  for(i=0;i<chaine.length;i++) {
    if(retour[chaine.charAt(i)]) {
      retour[chaine.charAt(i)]++
    }
    else {
      retour[chaine.charAt(i)] = 1
    }
  }
  return retour
}

let str = "Etre contesté, c'est être constaté"
console.log(`frequences("${str}") -> `,"\n",frequences(str) );
