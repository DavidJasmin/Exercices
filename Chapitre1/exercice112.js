let solution = window.prompt("Choisissez un nombre compris en 1 et 100");
let essai = 1;
let sol_min = 1;
let sol_max = 100;
let estimation = 50;

while (estimation != solution) {
  console.log("Essai n", essai, "on essaye ",estimation," une valeur en ",sol_min," et ",sol_max);
  if(estimation < solution) {
    sol_min = estimation;
    estimation = Math.floor((sol_min+sol_max)/2)+1;
  }
  else {
    sol_max = estimation;
    estimation = Math.floor((sol_min+sol_max)/2);
  }
  essai++;
}

window.alert("la solution est " + estimation + ". Trouvé après " + essai + " essai(s)");
console.log("la solution est ",estimation," essai ",essai);
