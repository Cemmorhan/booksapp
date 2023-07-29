import Scroll from '@/components/Scroll';
import Recomendados from '@/components/Recomendados';
import Buscador from '@/components/Buscador';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Home(props) {
  const [bookhistorial, setBookhistorial] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksOtrosResultados, setBooksOtrosResultados] = useState([]);
  const [topventas, setTopventas] = useState([]);
  const [booksEnVenta, setBooksEnVenta] = useState([]);
  const [recientes, setRecientes] = useState([]);

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

      console.log("books", books);
      const booksrandom = shuffle(books);
      console.log("booksrandom", booksrandom);
      setBooksOtrosResultados(booksrandom); 
    }
  }, [books]);

  // metodo getenventa (todos los libros en venta en el historial)
  const getenventa = async () => {
    const send = {state: "en venta" }
    const results = await fetch("/api/getenventa", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const books = results.map((result) => {
      return { ...result }
    });
    setBookhistorial(books);
  };
  // devuelve libros en venta (filtrando libros de la base de datos con los del historial en venta)
  useEffect(() => {
    if (bookhistorial !== undefined && bookhistorial.length > 0 && books !== undefined && books.length > 0) {
      const result = books.map((book) => {
        const result = bookhistorial.find((bookhistorial) => bookhistorial.isbn === book.isbn);
        if (result !== undefined) {
          return { ...book }
        }
      });
      const books3 = result.filter((book) => book !== undefined);
      console.log("books en venta", books3);
      setBooksEnVenta(books3);
    }
  }, [bookhistorial, books]);
    // metodo shuffle (randomizar array)
    const shuffle = (array) => { 
      return array.map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value); 
  }; 
  
  function pruebas() {
    getenventa();
    console.log("pruebas", bookhistorial);
  }

  return (
    <>
      <div className="content">
        <Buscador />
        <Scroll books={books} titulo='Mas vendidos' />
        <Scroll books={booksEnVenta} titulo='Ultimos añadidos' />
        <Scroll books={booksOtrosResultados} titulo='Otros resultados' />
        <button onClick={() => pruebas()}>getbooks</button>
        <Recomendados titulo='Recomendados' />
      </div >
    </>
  )
}
