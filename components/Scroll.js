import Caratula from './Caratula'
import { useState, useEffect } from 'react'

function Scroll({ titulo, books }) {
  const [isDefined, setIsDefined] = useState(false) /* variable que comprueba si books es undefined o no */

  /*comprueba si books es undefined y si lo es, cambia el estado de isDefined a false, si no, lo cambia a true*/
  useEffect(() => {
    if (books!==undefined) {
      setIsDefined(true)
    }else{
      setIsDefined(false)
    }
  }, [books])

  return (
    <>
      <div className="selector_scroll">
        <div className="selector_title">
          <h3>{titulo}</h3>

        </div>
        <div className="scrollX">
          {
            /* comprueba si isDefined es true y si lo es, mapea los libros y crea un componente Caratula por cada libro */
            isDefined && books.map((book, index) => (<Caratula book={book} key={index} />))
            }




        </div>
      </div>
    </>
  )
}

export default Scroll;