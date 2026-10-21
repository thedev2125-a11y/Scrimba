import react, { useState, useEffect } from "react"
import Input from "./Input"
export default function Main() {
     const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    // const handleChange = (e) => setMeme({ ...meme, topText: e.target.value })
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
    }
    return (
        <main>
            <div className="form">
                <Input
                    label="Top Text"
                    placeholder="One does not simply"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <Input
                    label="Bottom Text"
                    placeholder="Walk into Mordor"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}