let tabConversion=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

function conversion(n,format) {
  let retour = ""
  let rTemp = 0
  while(n!=0) {
  	var r=n%256;
    rTemp = r%16
    switch (format) {
      case "big":
        retour = " " + tabConversion[(r-rTemp)/16] + tabConversion[rTemp] + retour

        break;
        case "little":
          retour += " " + tabConversion[(r-rTemp)/16] + tabConversion[rTemp]

          break;
      default:

    }
  	n=(n-r)/256;
  }
  return "0x" + retour
}


let num = 466321


console.log(num, " -> ",conversion(num,"big"), " en (big endian)");

console.log(num, " -> ",conversion(num,"little"), " en (little endian)");
