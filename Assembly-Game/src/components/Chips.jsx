import React from 'react'
import {languages} from '../languages'
import {clsx} from 'clsx'
import Keyboards from './Keyboards'

export default function Chips({ languages, wrongGuessesCount }) {

        const languageElements = languages.map((lang,index) => {
          const isLanguageLost = index < wrongGuessesCount
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span 
              // className={`chip ${isLanguageLost ? "lost" : ""}`}
              className={className}
              style={styles}
              key={lang.name}
            >
                {lang.name}
            </span>
        )
    })
  return (
    <section className="language-chips">
        {languageElements}
    </section>
  )
}
