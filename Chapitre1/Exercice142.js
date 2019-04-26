let tabConversion=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

function conversion(n,format) {
  let retour = ""
  let prefixe = "0x"
  let nTemp = n
  let rTemp = 0
  let iTour = 0
  while(nTemp!=0) {
  	var r=nTemp%256;
    rTemp = r%16
    switch (format) {
      case "big":
        retour = " " + tabConversion[(r-rTemp)/16] + tabConversion[rTemp] + retour

        break;
      case "little":
        retour += " " + tabConversion[(r-rTemp)/16] + tabConversion[rTemp]

        break;
      default:
        retour += " " + tabConversion[(r-rTemp)/16] + tabConversion[rTemp]

        break;

    }
  	nTemp=(nTemp-r)/256;
    iTour++
  }
//  console.log(format," ",n," ",iTour);
  if(format == "varInt" && n > 253) {
    let nbTour = 0
    if(iTour>4) {
      prefixe = "0x ff"
      nbTour = 8
    }
    else if (iTour>2) {
      prefixe = "0x fe"
      nbTour = 4
    }
    else {
      prefixe = "0x fd"
      nbTour = 2
    }
    for(i=iTour;i<nbTour;i++) {
      retour += " 00"
    }
  }
  return prefixe + retour
}


let num = 131


console.log(num, " -> ",conversion(num,"big"), " en (big endian)");

console.log(num, " -> ",conversion(num,"little"), " en (little endian)");
console.log(num, " -> ",conversion(num,"varInt"), " en notation variable (little endian)");
