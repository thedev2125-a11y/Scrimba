import './index.css'
import Header from './components/Header'
import Entry from './components/Entry'
import Data from './Data'
export default function App() {
  const entries = Data.map(entry => {
    return (<Entry 
        key={entry.id}
        {...entry}
        // imageSrc={entry.img.src}
        // alt={entry.img.alt}
        // markerSrc="../images/marker.png"
        // country={entry.country}
        // mapsUrl={entry.googleMapsLink}
        // title={entry.title}
        // dates={entry.dates}
        // text={entry.text}
      /> )})
  return (
    <div className='All-wrapper'>
      <Header />
      {entries}
    </div>
  )
}


