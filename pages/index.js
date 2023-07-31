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
  const [recientes2, setRecientes2] = useState([]);

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
  // metodo getrecientes (libros en venta ordenados por fecha de actualizacion)
  const getrecientes = async () => {
    const send = { isbn: recientes2}
    console.log("send", send);
    const results = await fetch("/api/getrecientes", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const books = results.map((result) => {
      return { ...result }
    });
    setRecientes(books);
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
      const books1 = result.filter((book) => book !== undefined);
      setBooksEnVenta(books1);
    }
  }, [bookhistorial, books]);
  // ordenar historial por fecha de actualizacion
  useEffect(() => {
    if (bookhistorial !== undefined && bookhistorial.length > 0 && books !== undefined && books.length > 0) {
      const result = bookhistorial.sort((a, b) => a.updatedate2 - b.updatedate2);
      const isbn= result.map((book => book.isbn));
      setRecientes2(isbn);
    }
  }, [bookhistorial, books]);
  

    // metodo shuffle (randomizar array)
    const shuffle = (array) => { 
      return array.map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value); 
  }; 
 
  function pruebas() {
    getrecientes();
    console.log("books", books);
    console.log("booksOtrosResultados", booksOtrosResultados);
    console.log("booksEnVenta", booksEnVenta);
    console.log("recientes", recientes);
    console.log("recientes2", recientes2);

  }

  return (
    <>
      <div className="content">
        <Buscadorredireccion />
        <Scroll books={booksEnVenta} titulo='Mas vendidos' />
        <Scroll books={booksOtrosResultados} titulo='Ultimos añadidos' />
        <Scroll books={booksOtrosResultados} titulo='Otros resultados' />
        <button onClick={() => pruebas()}>pruebas</button>
        <Recomendados titulo='Recomendados' />
      </div >
    </>
  )
}
