const program = require('commander')

let inputData = []
let pile = []
let resultat = 0
let operant = 0


program
  .version("1.0.0")
  .arguments('<data...> ')
  .action(function (data) {

   console.log("Data :",data)
    inputData = data

    for(i=0; i<inputData.length; i++ )
    {
      console.log(pile);
      switch (inputData[i]) {
        case "+":
          operant = pile.pop()
          resultat = pile.pop() + operant
          pile.push(resultat)
          break;
        case "-":
          operant = pile.pop()
          resultat = pile.pop() - operant
          pile.push(resultat)
          break;
        case "*":
          operant = pile.pop()
          resultat = pile.pop() * operant
          pile.push(resultat)
          break;
        case "/":
          operant = pile.pop()
          resultat = pile.pop() / operant
          pile.push(resultat)
          break;
        default:
          pile.push(inputData[i])
      }
    }
    console.log(resultat)

  })

  program.parse(process.argv)
