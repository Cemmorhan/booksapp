
import books from '../public/books.json'
import Caratula from './Caratula'

function Scroll({ titulo }) {
  console.log(titulo)

  return (
    <>
      <div className="selector_scroll">
        <div className="selector_title">
          <h3>{titulo}</h3>
        </div>
        <div className="scrollX">
{
          books.map((book,index) => (<Caratula book={book} key={index}/>))
          
}
          


        </div>
      </div>
    </>
  )
}

export default Scroll;