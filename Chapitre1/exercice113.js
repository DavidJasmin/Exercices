function palindrome(texte) {
  let retour = true;
  if (texte.length>0 && texte != " ") {
    texte = texte.toLowerCase().split(' ').join('').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    for (var i = 0; i < Math.floor(texte.length/2); i++) {
      if (texte[i]!=texte[texte.length-1-i]) {
        retour=false
      }
    }
  }
  else {
    retour = false;
  }
  return retour;
}

let entree = window.prompt("Vérifier un mot ou une phrase est un palindrome ?");

if(palindrome(entree)) {
  window.alert(entree + " est un PALINDROME !!");
  console.log(entree, " est un PALINDROME !!");
} else {
  window.alert(entree + " n'est pas un palindrome !!");
  console.log(entree, " n'est pas un palindrome !!");
}
