let tabConversion = []
for (i=65;i<=90;i++) {
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

function chiffreVigenere(str,cle1) {
  str = str.split(' ').join('')
  let retourChiffre = ""
  for(j=0;j<str.length;j++) {
//    console.log(str[j], cle1[j % cle1.length], tabConversion.indexOf(cle1.charCodeAt(j%cle1.length)) % tabConversion.length)
    retourChiffre += chiffreCesar(str[j], tabConversion.indexOf(cle1.charCodeAt(j%cle1.length)) % tabConversion.length)
  }
  return retourChiffre
}

function dechiffreVigenere(str2,cle2) {
  str2 = str2.split(' ').join('')
  let retourDechiffre = ""
  for(k=0;k<str2.length;k++) {
//    console.log(str[j], cle1[j % cle1.length], tabConversion.indexOf(cle1.charCodeAt(j%cle1.length)) % tabConversion.length)
    retourDechiffre += chiffreCesar(str2[k], (-tabConversion.indexOf(cle2.charCodeAt(k%cle2.length))) % tabConversion.length)
  }
  return retourDechiffre
}

let cle = "ABC"
let message = "VOICI UN MESSAGE"
let message2 = chiffreVigenere(message,cle);
console.log(`chiffreVigenere("${message}",${cle}) -> `,message2 );

console.log(`dechiffreVigenere("${message2}",${cle}) -> `,dechiffreVigenere(message2,cle) );

function regroupement(str3,n) {
  str3 = str3.split(' ').join('').toUpperCase()
  let retourRegroupement = []
  for (var i = 0; i < str3.length; i++) {
    if(i<n){
      retourRegroupement.push(str3[i])
    }
    else {
      retourRegroupement[i%n]+=str3[i]
    }
  }
  return retourRegroupement
}

console.log("regroupement ('Mes vieilles tantes', 3) - > ",regroupement ("Mes vieilles tantes", 3));
/*
for(i=0;i<256;i++) {
  console.log("code ", i, " =>     ", String.fromCharCode(i))
}
*/
