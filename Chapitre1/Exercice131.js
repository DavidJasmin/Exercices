let tabConversion = []
for (i=48;i<=90;i++) {
  tabConversion.push(i)
}
for (i=97;i<=122;i++) {
  tabConversion.push(i)
}
//console.log(tabConversion.length);

function chiffreCesar(chaine, decalage) {
  let retour = ""
  let index = 0
  for(i=0;i<chaine.length;i++) {
    index = (tabConversion.indexOf(chaine.charCodeAt(i)) + decalage) % tabConversion.length
    retour += String.fromCharCode(tabConversion[index])
  }
  return retour
}

let decalage = 138
let str = "ASbvv;gjk?"
console.log(`chiffreCesar("${str}",${decalage}) -> `,chiffreCesar(str,decalage) );

/*
for(i=0;i<256;i++) {
  console.log("code ", i, " =>     ", String.fromCharCode(i))
}
*/
