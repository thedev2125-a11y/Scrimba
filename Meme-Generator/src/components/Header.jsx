import trollFace from "./images/trollface.png"

export default function Header() {
    return (
        <header className="header">
            <img 
            src={trollFace}
               alt="troll face"  
            />
            <h1>Meme Generator</h1>
        </header>
    )
}