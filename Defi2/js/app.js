let user = {}
let dapp = {}

async function listerIllustrateur(){
  document.getElementById("listIllustrateur").innerHTML ="";
  let illustrateurEncours = "";
  let nbIllustrateur = await dapp.Contrat.nbIllustrateurs();
  console.log("nbIllstrateur=",nbIllustrateur)
  for (var i = 0; i < nbIllustrateur; i++) {
//    console.log("passage ",i);
    illustrateurAddress = await dapp.Contrat.listIllustrateurs(i);
//    console.log("Illustrateur ",i," => ",illustrateurAddress);
    illustrateurEncours = await dapp.Contrat.illustrateurs(illustrateurAddress);
//    console.log("Illustrateur ",illustrateurAddress," => ",illustrateurEncours);
    document.getElementById("listIllustrateur").innerHTML += '<tr><th scope="row"><small>'+illustrateurAddress+'</small><br />'+illustrateurEncours.nom+'<br /><small class="float-right">Réputation : <b>'+illustrateurEncours.reputation+'</b></small></th></tr>';
  }

  
}

/*
async function listerDemandeCandidat(numDem) {

  let illustrateurEncours = "";
  let message="";
  let nbIllustrateur = await dapp.Contrat.nbIllustrateurs();
//  console.log("nbIllstrateur=",nbIllustrateur)
  for (var i = 0; i < nbIllustrateur; i++) {
//    console.log("passage ",i);
    illustrateurAddress = await dapp.Contrat.listIllustrateurs(i);
    statusCandidat = await dapp.ContratSigner.Demandes[numDem].listCandidat[illustrateurAddress];
    console.log("demande ",numDem," Adddress : ",illustrateurAddress," => Status = ", statusCandidat)
    if(statusCandidat>0) {
//    console.log("Illustrateur ",i," => ",illustrateurAddress);
      illustrateurEncours = await dapp.Contrat.illustrateurs(illustrateurAddress);
//    console.log("Illustrateur ",illustrateurAddress," => ",illustrateurEncours);
      message += '<div>'+illustrateurAddress+'<br />'+illustrateurEncours.nom+'<br /><small class="float-right">Réputation : <b>'+illustrateurEncours.reputation+'</b></small></div>';
    }
  }
  return message;

}
*/

async function inscrireIllustrateur(){
  let nomIllustrateur = document.getElementById("nomIllustrateur").value
  let repIllustrateur = document.getElementById("repIllustrateur").value
  await dapp.ContratSigner.Inscription(nomIllustrateur,repIllustrateur);
}


async function listerDemande(){
  document.getElementById("listDemande").innerHTML ="";
  let demandeEncours = "";
  let nbDemande = await dapp.Contrat.nbDemandes();
  let statusCandidat = 0;
  for (var i = 0; i < nbDemande; i++) {
    demandeEncours = await dapp.Contrat.Demandes(i);
    if(demandeEncours.identifiant.toLowerCase() != user.address) {
      statusCandidat = await dapp.ContratSigner.estCandidat(i);
      statutCan = statusCandidat.toNumber();
//      console.log("Demande ",i," statut=",statutCan," => ",demandeEncours);
      afficheDemande(demandeEncours, i, statutCan,"listDemande");
/*      
        document.getElementById("mesOffres").className = "jumbotron jumbotron-fluid bg-light visible"
        afficheDemande(demandeEncours, i, statutCan,"listMesDemande");
*/
    }
  }
}

function afficheDemande(dem, i, statusCandidat) {
  let bgClass = "";
  switch (dem.etat.toNumber()) {
    case 1:
        bgClass = "table-warning";
      break;
    case 2:
      bgClass = "table-success";
    break;

    default:
      bgClass = "";
      break;
  }
  let message = '<tr class="'+bgClass+'"><th scope="row">'+(i+1)+'</th>';
  message += '<td><small>'+dem.identifiant+'</small><br />'+nl2br(dem.description)+'</td>';
  message += '<td class="text-right">'+dem.delai+'</td>';
  message += '<td class="text-right">'+dem.reputation_mini+'</td>';
  message += '<td class="text-right">'+ethers.utils.formatEther(dem.remuneration)+' Eth</td>';
  switch (statusCandidat) {
    case 1:
      if(dem.etat.toNumber() == 0)
      {
        message += '<td class="text-right"><small>Déjà postulé<br />en attente</small></td>';
      }
      else
      {
        message += '<td class="text-right"><small>Désolé<br />vous n\'avez pas été retenu</small></td>';
      }
      break;
    case 2:
      if(dem.etat.toNumber() == 2)
      {
        message += '<td class="text-right"><small>Votre travail a été reçu<small></td>';
      }
      else {
        message += '<td class="text-right"><small>Votre candidature a été accepté<small><br /><button class="btn btn-success btn-sm" onclick="remettreTravail('+i+');">Remettre un travail</button></td>';
      }
      break;
  
    default:
//      console.log(user.reputation," < ",dem.reputation_mini.toNumber())
      if(user.reputation<dem.reputation_mini.toNumber()) {
        message += '<td class="text-center text-danger"><small>Vous ne pouvez pas postuler</small></td>';
      }
      else {
        if (dem.etat == 0){
          message += '<td class="text-right"><button type="button" class="btn btn-info btn-sm" onclick="postuler('+i+')">Postuler</button></td>';
        }
        else {
          message += '<td class="text-right">Déjà attribué</td>';
        }
      }
      break;
  }
  message += '</tr>';
  if(dem.etat == 2){
    message += '<tr class="table-success"><td colspan="6"><small>Travail: '+ dem.travail +'</small></td></tr>'
  }
  document.getElementById("listDemande").innerHTML += message;
}

async function postuler(num) {
//  alert(num);
  await dapp.ContratSigner.postuler(num);
//  alert("Vous avez postuler pour cette demande.")

}

function nl2br (str) {

//  var breakTag = (isXhtml) ? '<br />' : '<br>';
//  var replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />');
}

async function deposerDemande(){
  let Desc = document.getElementById("demandeDesc").value;
  let Rem = document.getElementById("demandeRem").value*document.getElementById("demandeDevise").value;
  Rem = ethers.utils.parseEther(Rem.toString());
  let Delai = document.getElementById("demandeDelai").value;
  let Rep = document.getElementById("demandeRep").value;
  let Cout = document.getElementById("demandeCout").value;
  let overrides = {
    value: ethers.utils.parseEther(document.getElementById('demandeCout').innerHTML),
  }
  await dapp.ContratSigner.ajouterDemande(Rem,Delai,Desc,Rep,overrides);
}

async function accepterIllustrateur(numDem, candidatAddress){
  await dapp.ContratSigner.accepterIllustrateur(numDem, candidatAddress);
}


async function monCompteIllustrateur() {
  try {
    if(await dapp.Contrat.estIllustrateur(user.address)) {
      let candidat = await dapp.Contrat.illustrateurs(user.address);
      user.nom = candidat.nom
      user.reputation = candidat.reputation.toNumber()
      document.getElementById("sincrire").className = "invisible"
      document.getElementById("monEspace").innerHTML = '<div class="alert alert-success"><h3>'+candidat.nom+'</h3><small>'+user.address+'</small><div class="text-right">Réputation : '+user.reputation+'</div></div><div class="d-none" id="remettreTravailForm"></div>'
    }
    
  } catch (err) {
    console.error(err);
  }
}

async function mesDemandes() {
  try {
      let dem = "";
      document.getElementById("listMesDemandes").innerHTML="";
      let nbIllustrateur = await dapp.Contrat.nbIllustrateurs();
      let nbDemande = await dapp.Contrat.nbDemandes();
      for (var i = 0; i < nbDemande; i++) {
        dem = await dapp.Contrat.Demandes(i);
        console.log("Demande ",i," ",dem);
        if(dem.identifiant.toLowerCase() == user.address) {
          document.getElementById("mesDemandes").className = ""
          let bgClass = "";
          switch (dem.etat.toNumber()) {
            case 1:
                bgClass = "table-warning";
              break;
            case 2:
              bgClass = "table-success";
            break;
        
            default:
              bgClass = "";
              break;
          }
          let message = '<tr class="'+bgClass+'"><td>';
          message += nl2br(dem.description)+'<br />Délai : <b>'+dem.delai+'s</b> <br />';
          message += 'Réputation : <b>'+dem.reputation_mini+'</b><br />Rémunération : <b>'+ethers.utils.formatEther(dem.remuneration)+' Eth</b>';
          message += '</td>';
          message += '<td>';
          switch (dem.etat.toNumber()) {
            case 0:
              for (var j = 0; j < nbIllustrateur; j++) {
                //    console.log("passage ",j);
                illustrateurAddress = await dapp.Contrat.listIllustrateurs(j);
                let estCand = await dapp.ContratSigner.estDemandeCandidat(i,illustrateurAddress);
                if(estCand>0) {
                  let candidat = await dapp.Contrat.illustrateurs(illustrateurAddress); 
                  message += '<div class="alert alert-warning">'+illustrateurAddress+'<br />';
                  message += candidat.nom+'<br />Rep : '+candidat.reputation;
                  message += ' <button onclick="accepterIllustrateur(\''+i+'\',\''+illustrateurAddress+'\')" class="btn btn-primary btn-sm">Choisir</button></div>';
                }
              }
              break;
          
            case 1:
              for (var j = 0; j < nbIllustrateur; j++) {
                //    console.log("passage ",j);
                illustrateurAddress = await dapp.Contrat.listIllustrateurs(j);
                let estCand = await dapp.ContratSigner.estDemandeCandidat(i,illustrateurAddress);
                if(estCand==2) {
                  let candidat = await dapp.Contrat.illustrateurs(illustrateurAddress); 
                  message += '<div class="alert alert-warning">'+illustrateurAddress+'<br />';
                  message += candidat.nom+'<br />Rep : '+candidat.reputation;
                  message += '<br /><em>En attente du travail</em></div>';
                }
              }
              break;
          
            case 2:
              for (var j = 0; j < nbIllustrateur; j++) {
                //    console.log("passage ",j);
                illustrateurAddress = await dapp.Contrat.listIllustrateurs(j);
                let estCand = await dapp.ContratSigner.estDemandeCandidat(i,illustrateurAddress);
                if(estCand==2) {
                  let candidat = await dapp.Contrat.illustrateurs(illustrateurAddress); 
                  message += '<div class="alert alert-succes">'+illustrateurAddress+'<br />';
                  message += candidat.nom+'<br />Rep : '+candidat.reputation;
                  message += '<br />Travail : <small>'+dem.travail+'</small></div>';
                }
              }
              break;
          
            default:
              break;
          }
            
          message += '</td>';
          message += '</tr>';
                
          document.getElementById("listMesDemandes").innerHTML+=message;
//          console.log("Demande ",i," => ",dem);
        }
      }
    } catch (err) {
    console.error(err);
  }
}

async function remettreTravail(numDem) {
  let message = "";
  let dem = await dapp.Contrat.Demandes(numDem);
  message += '<div class="container"><h4>'+nl2br(dem.description)+'</h4>';
  message += '<div class="form-group"><label for="travailUrl">Lien du travail</label>';
  message += '<input type="text" class="form-control form-control" id="travailUrl" placeholder="url"/></div>';
  message += '<div class="form-group text-right"><button onclick="livraisonTravail('+numDem+')" class="btn btn-primary btn-sm">Livrer Travail</button> <button onclick="document.getElementById(\'remettreTravailForm\').className = \'d-none\';" class="btn btn-danger btn-sm">annuler</button></div></div>';

  document.getElementById("remettreTravailForm").innerHTML = message;
  document.getElementById("remettreTravailForm").className = "alert alert-warning";
}

async function livraisonTravail(numDem) {
  let message = "";
  let url = document.getElementById('travailUrl').value;
  let hash = await dapp.Contrat.produireHash(url);
  await dapp.ContratSigner.livraisonTravail(numDem,hash);
  document.getElementById("remettreTravailForm").innerHTML = "";
  document.getElementById("remettreTravailForm").className = "d-none";
}

async function connectMetamask() {
  try {
    const addresses = await ethereum.enable()
    user.address = addresses[0]

    const provider = new ethers.providers.Web3Provider(ethereum)
    let Contrat=new ethers.Contract(contractAddress, contractABI, provider)

    let ContratSigner=Contrat.connect(provider.getSigner(user.address))

    dapp = { provider, Contrat, ContratSigner}

    console.log("DApp ready: ", dapp)
    console.log("User ready: ", user)


    
    listerDemande().then(
      mesDemandes()
    )
    listerIllustrateur().then(
      monCompteIllustrateur()
    )

/*
    let illustrateurEncours = await dapp.Contrat.Illustrateurs(1);
    console.log(illustrateurEncours.nom,parseInt(illustrateurEncours.reputation,16),illustrateurEncours.identifiant);
    Contrat.on('Remettre', (emetteur, devoir, rang, nbCred) => {
      let message = "Adresse du dépositaire : " + emetteur + "<br />";
      message += "Hash du devoir : " + devoir + "<br />";
      message += "Rang : " + rang + " => " + nbCred + " Cred <br /><br />";
      document.getElementById("remettre").innerHTML += message;
    });
*/
    provider.getNetwork().then(
      ntw => {
      console.log(ntw);
    }
    )

  } catch(err) {
    console.error(err);
  }
}
connectMetamask().then(() => {


  //listerIllustrateur();
  document.getElementById('demandeRem').addEventListener('input', function(){
    document.getElementById('demandeCout').innerHTML = (this.value*1.02*document.getElementById('demandeDevise').value).toFixed(6);
  })
  document.getElementById('demandeDevise').addEventListener('input', function(){
    document.getElementById('demandeCout').innerHTML = (document.getElementById('demandeRem').value*1.02*this.value).toFixed(6);
  })

  dapp.Contrat.on('inscription', (nom,reputation) => {
    listerIllustrateur();
    listerDemande();
    monCompteIllustrateur();
  });
  dapp.Contrat.on('AjouterDemande', (rem,delai,desc,repMini) => {
    listerDemande();
    mesDemandes();
  });
  dapp.Contrat.on('Postuler', (numDemande) => {
    listerDemande();
    mesDemandes();
  });
  dapp.Contrat.on('AccepterIllustrateur', (numDemande,dessinateur) => {
    listerDemande();
    mesDemandes();
  });
  dapp.Contrat.on('LivraisonTravail', (numDemande,travail) => {
    listerDemande();
    mesDemandes();
  });
})
