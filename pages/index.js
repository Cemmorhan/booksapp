import Scroll from '@/components/Scroll';
import Recomendados from '@/components/Recomendados';
import Buscadorredireccion from '@/components/Buscadorredireccion';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Home(props) {
  const [bookhistorial, setBookhistorial] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksOtrosResultados, setBooksOtrosResultados] = useState([]);
  const [topventas, setTopventas] = useState([]);
  const [booksEnVenta, setBooksEnVenta] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [booksEnVentaRandom, setBooksEnVentaRandom] = useState([]);

  useEffect(() => {
    getbooks();
    getenventa();
  }, []);
  // metodo getbooks (todos los libros de la base de datos)
  const getbooks = async () => {
    const send = { books_id: "0" }
    const results = await fetch("/api/getbooks", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const books = results.map((result) => {
      return { ...result }
    });
    setBooks(books); 
  };
  // randomizar books (para mostrar libros aleatorios en la seccion de otros resultados)
  useEffect(() => {
    if (books !== undefined && books.length > 0) {
      const booksrandom = shuffle(books);
      setBooksOtrosResultados(booksrandom); 
    }
  }, [books]);

  // metodo getenventa (todos los libros en venta en el historial)
  const getenventa = async () => {
    const send = { books_id: "0" }
    const results = await fetch("/api/getenventa", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const books = results.map((result) => {
      return { ...result }
    });
    setBookhistorial(books);
  };
  useEffect(() => {
    // devuelve libros en venta (filtrando libros de la base de datos con los del historial en venta)
    if (bookhistorial !== undefined && bookhistorial.length > 0 && books !== undefined && books.length > 0) {
      const result = books.map((book) => {
        const result = bookhistorial.find((bookhistorial) => bookhistorial.isbn === book.isbn);
        if (result !== undefined) {
          return { ...book }
        }
      });
      const books1 = result.filter((book) => book !== undefined);
      setBooksEnVenta(books1);
    }
      // randomizar books (para mostrar libros aleatorios en la seccion de otros resultados)
    if (booksEnVenta !== undefined && booksEnVenta.length > 0) {
      const booksrandom = shuffle(booksEnVenta);
      setBooksOtrosResultados(booksrandom); 
    }
    //concatenar informacion del objeto booksEnVenta con el objeto bookhistorial (para mostrar los libros mas recientes)
    console.log("bookhistorial", bookhistorial)
    console.log("books", books)
    console.log("booksEnVenta", booksEnVenta)


  }, [bookhistorial, books]);

  useEffect(() => {

    if(bookhistorial !== undefined && bookhistorial.length > 0 && books !== undefined && books.length > 0 && booksEnVenta !== undefined && booksEnVenta.length > 0){
      console.log("intento leer recientes")
      const result = bookhistorial.map((book) => {
        const result = booksEnVenta.find((booksEnVenta) => booksEnVenta.isbn === book.isbn);
        if (result !== undefined) {
          return { ...book, ...result }
        }
      });
      const books3 = result.filter((book) => book !== undefined);
      //ahora quitar los isbn repetidos de book3
      const books4 = books3.filter((book, index, self) =>
        index === self.findIndex((t) => (
          t.isbn === book.isbn
        ))
      )
      console.log("books4", books4)
      setRecientes(books4);
    }
  }, [bookhistorial, books, booksEnVenta]);


    // metodo shuffle (randomizar array)
    const shuffle = (array) => { 
      return array.map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value); 
  }; 
 
  function pruebas() {
    console.log("books", books);
    console.log("booksOtrosResultados", booksOtrosResultados);
    console.log ("bookhistorial", bookhistorial)
    console.log("booksEnVenta", booksEnVenta);
    console.log("recientes", recientes);

  }

  useEffect(() => {
/*   pruebas()
 */  }, [books, booksOtrosResultados, bookhistorial, booksEnVenta, recientes]);

  return (
    <>
      <div className="content">
        <Buscadorredireccion />
        <Scroll books={books} titulo='Mas vendidos' />
        <Scroll books={recientes} titulo='Ultimos añadidos' />
        <Scroll books={booksOtrosResultados} titulo='Otros resultados' />
        <button onClick={() => pruebas()}>pruebas</button>
        <Recomendados titulo='Recomendados' />
      </div >
    </>
  )
}
