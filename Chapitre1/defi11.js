let tabConvHex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

function ConvHexToDec(s) {
  let retour = 0
  if(s.substring(0,2) == "0x") {
    s = s.substring(2)
  }
  for (var i = 0; i < s.length; i++) {
//  console.log(i," => ",n[i], " =>  ",tabConvHex.indexOf(n[i]), " => ",16 ** (n.length-i))
    retour += tabConvHex.indexOf(s[i])*16**(s.length-i-1)
  }
//  console.log(retour)
  return retour
}

function ConvDecToHex(n) {
  let retour = ""
  let rTemp = 0
  while(n!=0) {
  	var r=n%256;
    rTemp = r%16
    retour = tabConvHex[(r-rTemp)/16] + tabConvHex[rTemp] + retour
  	n=(n-r)/256;
  }
  return "0x" + retour
}


function ConvHexLEToHex(s) {
  let retour = ""
  if(s.substring(0,2) == "0x") {
    s = s.substring(2)
  }
  while(s.length>0) {
    retour = s.substring(0,2) + retour
    s = s.substring(2)
  }
  return "0x" + retour
}

function ConvVarIntToDec(s) {
  let retour = ""
  if(s.substring(0,2) == "0x") {
    s = s.substring(2)
  }

  let nbTour = 0
  switch (s.substring(0,2)) {
    case "ff":
      nbTour = 8
      s = s.substring(2)
      break;
    case "fe":
      nbTour = 4
      s = s.substring(2)
      break;
    case "fd":
      nbTour = 2
      s = s.substring(2)
      break;
    default:
      nbTour = 1
      break;
  }

  for(i=0;i<nbTour;i++) {
    retour += s.substring(0,2)
    s = s.substring(2)
  }
  return [ConvHexToDec(ConvHexLEToHex(retour)),s]
}

function ConvChampsBitsToCibleVal(s) {
  let exposant = ConvHexToDec(s.substring(0,2))
  s = s.substring(2)
  let coefficient = ConvHexToDec(s.substring(0,6))
  console.log(coefficient,exposant)
  return coefficient * 2 ** (8*(exposant-3))
}

function ConvChampsBitsToCible(s) {
  let exposant = ConvHexToDec(s.substring(0,2))
  s = s.substring(2)
  let retour = ""
  retour += s.substring(0,6)
  for(i=exposant*2;i<64;i++) {
    retour = "0" + retour
  }
  for(i=0;i<(exposant-3)*2;i++) {
    retour += "0"
  }
  return retour
}

function ConvCibleToDifficulty(cible) {
  let cibleMax = ((2 ** 16 - 1) * 2 ** 208)
  return cibleMax/cible
}

function ConvChaineHexaToTransaction(entree) {
  let valeur = []
  let retour = {}
  let nbTransaction = 0
  let longueurTransaction = 0
  let i = 0
  let transaction = {}

  console.log(entree);

  valeur[0] = entree.slice(0,8)
  retour.version = valeur[0]
  entree = entree.slice(8)
//  console.log(entree.length);
  var data = ConvVarIntToDec(entree)
  nbTransaction = data[0]
  entree = data[1]
//  console.log(entree.length);
  retour.nbTransaction = nbTransaction
//  console.log(entree);

//  console.log(valeur);
  retour.vin = []
  while(i<nbTransaction) {
    transaction = {}
    transaction.txid = entree.slice(0,64)
    entree = entree.slice(64)
//    console.log(entree.slice(0,8));
    transaction.vout = ConvHexToDec(ConvHexLEToHex(entree.slice(0,8)))
    entree = entree.slice(8)
    data = ConvVarIntToDec(entree)
    longueurScriptSig = data[0]
    entree = data[1]
    data = ConvVarIntToDec(entree)
    longueurSig = data[0]
    entree = data[1]
//    console.log(i," => ", longueurSig, entree);
    transaction.lenSigScript = longueurSig
    transaction.SigScript = entree.slice(0, 2*longueurSig)
    entree = entree.slice(2*longueurSig)

    data = ConvVarIntToDec(entree)
    longueurPubKey = data[0]
    entree = data[1]
    transaction.lenPubKey = longueurPubKey
    transaction.ScriptKey = entree.slice(0, 2*longueurPubKey)
    entree = entree.slice(2*longueurPubKey)
    transaction.sequence = entree.slice(0,8)
    entree = entree.slice(8)
    retour.vin[i] = transaction
    i++
//    console.log(entree.length);

  }

  data = ConvVarIntToDec(entree)
  nbOutputs = data[0]
  entree = data[1]
  retour.nbOutputs = nbOutputs
//  console.log(entree);

//  console.log(valeur);
  retour.vout = []
  i = 0
  while(i<nbOutputs) {
    vout = {}
    vout.montant = ConvHexLEToHex(entree.slice(0,8))/(10**8)
    entree = entree.slice(8)
    vout.numeroOutput = i
    entree = entree.slice(8)
    data = ConvVarIntToDec(entree)
    longueurScriptPubKey = data[0]
    entree = data[1]
//    console.log(i," => ", longueurScriptPubKey);
    vout.ScriptPubKey = entree.slice(0, 2*longueurScriptPubKey)
    entree = entree.slice(2*longueurScriptPubKey)
//    console.log(vout);
    retour.vout[i] = vout
    i++
  }

//  console.log(entree);

//  console.log(valeur);
  return retour

}
