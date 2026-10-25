import { useState } from 'react'
import Header  from './components/Header'
import Chips from './components/Chips'
import Keyboards from './components/Keyboards'
import { languages } from './languages'
import './index.css'

function App() {
 const [wrongGuessesCount, setWrongGuessesCount] = useState(0)
  
 return (
    <main>
      <section>
       <Header />
       <Chips 
         languages={languages} 
         wrongGuessesCount={wrongGuessesCount}
       />
       <Keyboards 
         onWrongGuessChange={setWrongGuessesCount}
       />
      </section>
    </main>
  )
}

export default App
