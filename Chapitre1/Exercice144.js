let tabConversion=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

let entree = "0100000001f129de033c57582efb464e94ad438fff493cc4de4481729b85971236858275c2010000006a4730440220155a2ea4a702cadf37052c87bfe46f0bd24809759acff8d8a7206979610e46f6022052b688b784fa1dcb1cffeef89e7486344b814b0c578133a7b0bce5be978a9208012103915170b588170cbcf6380ef701d19bd18a526611c0c69c62d2c29ff6863d501affffffff02ccaec817000000001976a9142527ce7f0300330012d6f97672d9acb5130ec4f888ac18411a000000000017a9140b8372dffcb39943c7bfca84f9c40763b8fa9a068700000000"

let valeur = []
let nbTransaction = 0
let longueurTransaction = 0
let i = 0


valeur[0] = entree.slice(0,2)
entree = entree.slice(2)
nbTransaction = parseInt(valeur[0],16)
console.log(valeur);
while(i<nbTransaction) {
  valeur[3*i+1] = entree.slice(0,16)
  entree = entree.slice(16)
  valeur[3*i+2] = entree.slice(0,2)
  entree = entree.slice(2)
  longueurTransaction = parseInt(valeur[3*i+2],16)
  valeur[3*i+3] = entree.slice(0, 2*longueurTransaction)
  entree = entree.slice(2*longueurTransaction)
  i++

}
console.log(entree);

console.log(valeur);
