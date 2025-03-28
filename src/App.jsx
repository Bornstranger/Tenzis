import React from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
export default function App () {

  let [dice, setDice] = React.useState(() => random())

  let gameWon = dice.every(die => die.isHeld) && 
                dice.every(die => die.value === dice[0].value)

function hold(id) {
    setDice(prevDice=> prevDice.map(die => 
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
}  

function random() {
  return new Array(10)
          .fill(0)
          .map(() =>
             ({value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid()
          }))
}



let diceElements = dice.map(obj =>( 
                  <Die 
                  value={obj.value}
                  key= {obj.id}
                  isHeld= {obj.isHeld}
                  hold={() => hold(obj.id)}
                  />))

function roll() {
  if (!gameWon) {
    setDice(prevDice =>prevDice.map(die => 
      die.isHeld ? die : {...die, value:Math.ceil(Math.random() * 6)}
    ))
  }else {
    setDice(random())
  }
}                  

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{diceElements}</div>

      <button
       className="roll-dice"
       onClick={roll}
       >{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}