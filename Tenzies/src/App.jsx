import React ,{useState, useEffect, useRef} from 'react'
import Die from './components/Die'
import { nanoid } from "nanoid"
import {useWindowSize} from 'react-use'
import Confetti from 'react-confetti'

function App() {
  const {width, height} = useWindowSize();
  const [dice, setDice] = useState(() => generateAllNewDies());
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);
  const buttonRef = useRef(null)
  useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])
  // anotherway of wrtting a function of an array
    // function generateAllNewDice() {
    //     return new Array(10)
    //         .fill(0)
    //         .map(() => Math.ceil(Math.random() * 6))
    // }
   function rollDice() {
    if(!gameWon){
     setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
    }
    else{
      setDice(generateAllNewDies())
    }
  }
  function holdDice(id) {
     setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
    // console.log(id)
   }
   function generateAllNewDies(){
        let newnum = [];
        for(let i = 0; i < 10 ; i++){
            const rand = Math.floor(Math.random() * 6) + 1;
            newnum.push(rand);
        }
        return newnum.map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }))
    }
    
      const dieElements = dice.map((die) => {
        return (
           <Die 
             key={die.id} 
             value={die.value} 
             isHeld={die.isHeld} 
             holdDice={holdDice} 
             id={die.id}
           />
          )
    })
    // console.log(generateAllNewDies())
  return (
   <main>
      {gameWon && <Confetti width={width} height={height} />}
     <h1 className="title">Tenzies</h1>
     <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className="dice-container">
      {dieElements}
     </div>
     <button ref={buttonRef} onClick={rollDice} className="roll-dice">{gameWon ? "New Game" : "Roll"}</button>
   </main>
  )
}

export default App
