console.log("Creation de la classe Cercle");

class  cercle {

    constructor(rayon) {
        this.rayon = rayon;
    }

    aire() {
        return (Math.PI * this.rayon ** 2).toFixed(2);
    }


    perimetre() {
        return (this.rayon * 2 * Math.PI).toFixed(2);
    }
}

let entree = window.prompt("Entrez le rayon du cercle (en cm) ?");
let mon_cercle = new cercle(entree);
console.log("L'aire de mon cercle de rayon ",mon_cercle.rayon," est de ",mon_cercle.aire());
console.log("Le périmètre de mon cercle de rayon ",mon_cercle.rayon," est de ",mon_cercle.perimetre());
window.alert("Mon cercle de rayon " + mon_cercle.rayon + " cm a pour\n - Aire : " + mon_cercle.aire() + "cm²\n - Périmètre : " + mon_cercle.perimetre() + "cm.")
