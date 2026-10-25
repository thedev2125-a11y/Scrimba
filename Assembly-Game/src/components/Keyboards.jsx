import React ,{useState} from 'react'
import { Keyboard, languages } from '../languages'
import {getFarewellText, getRandomWord} from '../utils'
import {clsx} from 'clsx'
import {useWindowSize} from 'react-use'
import Confetti from 'react-confetti'
 

export default function Keyboards({ onWrongGuessChange }) {

    //State Values
    const [currentWord , setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters , setGuessedLetters] = useState([])
    const {width, height} = useWindowSize();

    //Derived Values
    const maxWrongGuessed = languages.length -1 ;
    const wrongGuessesCount = guessedLetters.filter(
          letter => !currentWord.includes(letter)
        ).length;
     const isGameWon =  currentWord.split("").every(letter => guessedLetters.includes(letter))
     const isGameLost = wrongGuessesCount >= maxWrongGuessed;
     const isGameOver = isGameWon || isGameLost 
     const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
     const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    //Static Values
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    // function addGuessedLetter(letter) {
        
    //     setGuessedLetters(prevLetters =>{
    //         return (
    //         prevLetters.includes(letter) ?
    //             prevLetters :
    //             [...prevLetters, letter] )
    //             //Another way of writng the upper return
    //         // const lettersSet = new Set(prevLetters)
    //         // lettersSet.add(letter)
    //         // return Array.from(lettersSet)
    //     })
    // }
        function addGuessedLetter(letter) {
        // 1. Exit immediately if the letter was already guessed 
        if (guessedLetters.includes(letter)) return;

        // 2. Track the letter locally
        setGuessedLetters(prevLetters => [...prevLetters, letter]);

        // 3. If it's a wrong guess, calculate the next integer and send it up
        if (!currentWord.includes(letter)) {
            const nextWrongCount = wrongGuessesCount + 1;
            onWrongGuessChange(nextWrongCount);
        }
    }


    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })
    // This is another way to map words from a given javascript 
    // it were imported and then maped and then dispalyed
    // const alphabets = Keyboard.map(alpha => {
    //         const styles = {
    //             backgroundColor: "#fcba29",
    //             color: "black"
    //         }
    //         return (
    //             <button
    //               className="alpha" 
    //               style={styles}
    //               key={alpha.code}
    //             >
    //                 {alpha.label}
    //             </button>
    //         )
    //     })
     const keyboardElements = alphabet.split("").map(letter => {
         
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return (
        <button 
           className={className}
           key={letter}
           disabled={isGameOver}
           aria-disabled={guessedLetters.includes(letter)}
           aria-label={`Letter ${letter}`}
           onClick={() => addGuessedLetter(letter)}
        >
         {letter.toUpperCase()}
        </button>
        )
    })
   
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })
    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
               <p className="farewell-message"
               >
                {getFarewellText(languages[wrongGuessesCount - 1].name)}
            </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } if(isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }
    function newGame(){
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
        onWrongGuessChange(0);
    }
  return (
    <>
       {isGameWon && <Confetti width={width} height={height} />}
        <section className={gameStatusClass}>
                {/* {isGameOver ? (
                    isGameWon ? (
                        <>
                            <h2>You win!</h2>
                            <p>Well done! 🎉</p>
                        </>
                    ) : (
                        <>
                            <h2>Game over!</h2>
                            <p>You lose! Better start learning Assembly 😭</p>
                        </>
                    )
                ) : (
                        null
                    )
                } */}
                {renderGameStatus()}
        </section>
         <section className="word">
                {letterElements}
        </section>
        <section className="alphabets">
            {keyboardElements}
        </section>
         {isGameOver && <button onClick={newGame} className="new-game">New Game</button>}
    </>
  )
}
