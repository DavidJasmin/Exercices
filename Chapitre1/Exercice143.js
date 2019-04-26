let tabConversion=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

let entree = "941e985075825e09de53b08cdd346bb67075ef0ce5c94f98853292d4bf94c10d010000006b483045022100ab44ef425e6d85c03cf301bc16465e3176b55bba9727706819eaf07cf84cf52d02203f7dc7ae9ab36bead14dd3c83c8c030bf8ce596e692021b66441b39b4b35e64e012102f63ae3eba460a8ed1be568b0c9a6c947abe9f079bcf861a7fdb2fd577ed48a81Feffffff"

let valeur = []
let longueur = 0

valeur[0] = entree.slice(0,64)
entree = entree.slice(64)
valeur[1] = entree.slice(0,8)
entree = entree.slice(8)
valeur[2] = entree.slice(0,2)
entree = entree.slice(2)

longueur = parseInt(valeur[2],16)

valeur[3] = entree.slice(0,2*longueur)
entree = entree.slice(2*longueur)
valeur[4] = entree.slice(0,8)
entree = entree.slice(8)


/*
valeur[4] = entree.slice(-8)
entree = entree.slice(0,-8)
valeur[3] = entree
*/
console.log(valeur);
console.log(entree);
console.log(valeur[3].length);
