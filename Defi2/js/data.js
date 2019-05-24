let contractAddress = "0x603e92ff33bcff98433a2b7b83d9dcb08d7ab844"
let contractABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "numDemande",
				"type": "uint256"
			},
			{
				"name": "dessinateur",
				"type": "address"
			}
		],
		"name": "accepterIllustrateur",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rem",
				"type": "uint256"
			},
			{
				"name": "delai",
				"type": "uint256"
			},
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "repMini",
				"type": "uint256"
			}
		],
		"name": "ajouterDemande",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "nom",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "reputation",
				"type": "uint256"
			}
		],
		"name": "inscription",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "rem",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "delai",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "desc",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "repMini",
				"type": "uint256"
			}
		],
		"name": "AjouterDemande",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "nom",
				"type": "string"
			},
			{
				"name": "reputation",
				"type": "uint256"
			}
		],
		"name": "Inscription",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "numDemande",
				"type": "uint256"
			},
			{
				"name": "travail",
				"type": "bytes32"
			}
		],
		"name": "livraisonTravail",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "numDemande",
				"type": "uint256"
			}
		],
		"name": "postuler",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "numDemande",
				"type": "uint256"
			}
		],
		"name": "Postuler",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "numDemande",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "dessinateur",
				"type": "address"
			}
		],
		"name": "AccepterIllustrateur",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "numDemande",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "travail",
				"type": "bytes32"
			}
		],
		"name": "LivraisonTravail",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Demandes",
		"outputs": [
			{
				"name": "remuneration",
				"type": "uint256"
			},
			{
				"name": "delai",
				"type": "uint256"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "etat",
				"type": "uint256"
			},
			{
				"name": "reputation_mini",
				"type": "uint256"
			},
			{
				"name": "identifiant",
				"type": "address"
			},
			{
				"name": "travail",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "numDemande",
				"type": "uint256"
			}
		],
		"name": "estCandidat",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "numDemande",
				"type": "uint256"
			},
			{
				"name": "dessinateur",
				"type": "address"
			}
		],
		"name": "estDemandeCandidat",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "dessinateur",
				"type": "address"
			}
		],
		"name": "estIllustrateur",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "illustrateurs",
		"outputs": [
			{
				"name": "nom",
				"type": "string"
			},
			{
				"name": "reputation",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listIllustrateurs",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nbDemandes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nbIllustrateurs",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "url",
				"type": "string"
			}
		],
		"name": "produireHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
]