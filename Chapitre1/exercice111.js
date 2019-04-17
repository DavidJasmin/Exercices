let solution = Math.floor(Math.random()*100)+1;
let entree = window.prompt("Devinez un nombre compris en 1 et 100 ?");

while (entree != solution && entree != 0) {
  if (Math.abs(entree-solution)<=5) {
    entree = window.prompt("Vous êtes très proche de la solution (<= 5). Essayez encore ",entree);
  }
  else if (Math.abs(entree-solution)<=10) {
    entree = window.prompt("Vous êtes proche de la solution (6 à 10). Essayez encore",entree);
  }
  else {
    entree = window.prompt("Vous êtes loin de la solution (>10). Essayez encore ",entree);
  }
  console.log("la solution est ",solution," vous avez saisi ",entree);
}

if (solution == entree) {
  window.alert("Bravo vous avez trouvé le nombre recherché " + entree);
}
else {
  window.alert("Vous avez arrêté la recherche de la solution ");
}

console.log("la solution est ",solution," vous avez saisi ",entree);
