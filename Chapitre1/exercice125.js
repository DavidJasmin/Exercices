console.log("Creation de la classe Noeud");

class Noeud {

    constructor(v,p) {
      this.gauche = null;
      this.droit = null;
      this.valeur = v;
      this.parent = p;
    }

}

console.log("Creation de la classe Arbre");

class Arbre {

    constructor() {
      this.racine = null;
    }

    ajouter(val) {
      if(this.racine === null) {
        this.racine = new Noeud(val,null);
      }
      else {
        this._ajouter(val, this.racine);
      }
    }

    _ajouter(val, nd) {
        if(val < nd.valeur  ) {
            if(nd.gauche !== null) {
                this._ajouter(val, nd.gauche);
            }
            else {
                nd.gauche = new Noeud(val, nd.valeur);
              }
         }
         else {
            if(nd.droit !== null) {
                this._ajouter(val, nd.droit);
            }
            else {
              nd.droit = new Noeud(val,nd.valeur);
            }
        }
    }

    rechercher(val) {
//      console.log(" rechercher ",val);
      if(this.racine === null) {
        return false;
      }
      else {
        return this._rechercher(val, this.racine);
      }
    }

    _rechercher(val, nd) {
//        console.log(" _rechercher ",val," un noeud", nd.valeur);
        if(nd.valeur == val) {
          return nd;
        }
        else if(val < nd.valeur  ) {
          if(nd.gauche !== null) {
            return this._rechercher(val, nd.gauche)
          }
          else {
            return false;
          }
       }
       else {
         if(nd.droit !== null) {
           return this._rechercher(val, nd.droit)
         }
         else {
           return false;
         }
      }
    }

    afficherArbreInfixe() {
      if(this.racine === null) {
        return false;
      }
      else {
        return this._afficherArbreInfixe(this.racine);
      }

    }

    _afficherArbreInfixe(nd) {
      let str1 = '';
      if(nd.gauche !== null) {
        str1 = this._afficherArbreInfixe(nd.gauche);
      }
      let str2 = '';
      if(nd.droit !== null) {
        str2 = this._afficherArbreInfixe(nd.droit);
      }
      return str1.concat(" ",nd.valeur," ",str2);
    }

    supprimerNoeud(val) {
      let nd = this.rechercher(val)
      let ndParent = this.rechercher(nd.parent)
      if(nd.gauche === null && nd.droit === null) {//cas d'une feuille
        if(ndParent.valeur > val) {
          ndParent.gauche = null
        }
        else if (ndParent.valeur < val) {
          ndParent.droit = null
        }
      }
      //cas noeud a droite uniquement
      else if(nd.gauche === null) {
        nd.droit.parent = nd.parent
        if(ndParent.valeur > val) {
          ndParent.gauche = nd.droit
        }
        else if (ndParent.valeur < val) {
          ndParent.droit = nd.droit
        }
      }
      //cas du noeud a gauche uniquement
      else if(nd.droit === null) {
        nd.gauche.parent = nd.parent
        if(ndParent.valeur > val) {
          ndParent.gauche = nd.gauche
        }
        else if (ndParent.valeur < val) {
          ndParent.droit = nd.gauche
        }
      }
      // cas 2 noeuds
      else {
        let ndDroit = nd.droit
        let ndGauche = nd.gauche
        while (ndDroit.gauche !== null || ndGauche.droit !== null) {
          if(ndDroit.gauche !== null) {
            ndDroit = ndDroit.gauche
          }
          if(ndGauche.droit !== null) {
            ndGauche = ndGauche.droit
          }
        }
        let newVal = val
        if(val <= (ndDroit.valeur+ndGauche.valeur)/2) {
          newVal=ndGauche.valeur
        } else {
          newVal=ndDroit.valeur
        }
        this.supprimerNoeud(newVal)
        nd.valeur = newVal
        nd.gauche.parent = newVal
        nd.droit.parent = newVal
      }

    }




}

let tabArbre = [];
tabArbre = [4,6,5,7,9,8,11];
tabArbre = [3,5,7,1,2,6,4,8,12,10,14,9,11,15,13];
console.log(tabArbre);

let monArbre = new Arbre();
let nbI=tabArbre.length;
let mid = Math.floor((tabArbre.length)/2);
for(i=0;i<nbI;i++) {
//  console.log(mid);
  monArbre.ajouter(tabArbre[mid]);
  tabArbre.splice(mid,1);
//  console.log(tabArbre);
  mid = Math.floor((tabArbre.length)/2);
}

// Recherche une valeur dans l'arbre
console.log(monArbre);
let valRech = 12;
let resultRech = monArbre.rechercher(valRech)
if(resultRech !== false) {
  console.log(valRech," est dans mon Arbre");
  console.log(resultRech)
}
else {
  console.log(valRech," n'est pas dans mon Arbre");
}

console.log("Mon arbre en lecture infixe :", monArbre.afficherArbreInfixe());


monArbre.supprimerNoeud(11)
console.log(" 11 supprimé de mon arbre",monArbre.afficherArbreInfixe());
monArbre.supprimerNoeud(12)
console.log(" 12 supprimé de mon arbre",monArbre.afficherArbreInfixe());
