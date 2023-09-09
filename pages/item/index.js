import Objeto from "../../components/Objeto";
import Scroll from "../../components/Scroll";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Item(props) {
    const [renderizado, setRenderizado] = useState(false);
    const { user, error, isLoading } = useUser();
    const [itembook, setItembook] = useState([]);
    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState("0");
    const [itembookHistorial, setItembookHistorial] = useState([]);
    const [bookselected, setBookselected] = useState([]);
    const [comprobante, setComprobante] = useState(false);
    const [precio, setPrecio] = useState(0);
    const router = useRouter();

    // fecha de compra
    const book_selldate = new Date();
    const book_selldate2 = book_selldate.getTime();



    useEffect(() => {
        setIsbn(router.query.isbn)
    }, [router.query.isbn]);

    useEffect(() => {
        console.log(isbn);
        getbooks();
        getonebookbyisbn();
        gethistorial();
    }, [isbn]);

    useEffect(() => {
        console.log(books);
    }, [books]);

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

    const getonebookbyisbn = async () => {
        if (isbn === undefined) {
            return;
        }
        if (isbn === "0") {
            return;
        }
        const send = { isbn: isbn }
        const results = await fetch("/api/getonebook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const books = results.map((result) => {
            return { ...result }
        });
        setItembook(books);
    };
    //buscar libros historial
    const gethistorial = async () => {
        if (isbn === undefined) {
            return;
        }
        if (isbn === "0") {
            return;
        }
        const send = { isbn: isbn }
        const results = await fetch("/api/gethistorial", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const books = results.map((result) => {
            return { ...result }
        });
        setItembookHistorial(books);
    };

    //metodo post para recuperar datos o crear usuario
    const getUsers = async () => {
        if (!user) return;
        const send = { user_id: user.sub, user_email: user.name };
        const results = await fetch("/api/getuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        props.setUsuarioAdquirido(newResults[0]);
    };

    useEffect(() => {
        if (renderizado) {
            getUsers();
        }
    }, [renderizado]);

    function pruebas() {
        updateBook();
    }
    //recuperar libro seleccionado para compra
    const recuperar = (bookselected, comprobante, precio) => {
        console.log("recuperar", bookselected);
        console.log("comprobante", comprobante);
        console.log("user", user);
        console.log("book_selldate", book_selldate);
        console.log("book_selldate2", book_selldate2);
        console.log("precio", precio);
        setBookselected(bookselected);
        setComprobante(comprobante);
        setPrecio(precio);
    };

    useEffect(() => {
        if (comprobante && bookselected !== undefined) {
            //updateBook();
            //setValues();
            setComprobante(false);
            //setValuesComprador();
        }
    }, [comprobante, bookselected]);

    // Comprar libro
    const updateBook = async () => {
        if (!user) return;
        const send = {
            book_id: bookselected,
            userbuy: user,
            selldate: book_selldate,
            selldate2: book_selldate2,
        };
        const results = await fetch("/api/comprar", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
    };
    // comprar libro2
    const actualizarlibro = async (values) => {
        if (!user) return;
        const send = {
            book_id: bookselected,
            set: values.set === undefined ? {} : values.set,
            push: values.push === undefined ? {} : values.push,
            inc: values.inc === undefined ? {} : values.inc,
        };
        const results = await fetch("/api/updatebook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
    };

    function setValues() {
        console.log("valueando");
        actualizarlibro({
            push: {salesdata: {userbuy: user, selldate: book_selldate, selldate2: book_selldate2}},
            set: {state: "vendido"}
        });
    }

    //descontar saldo
    const actualizarusuario = async (values) => {
        if (!user) return;
        const send = {
            user_id: user.sub,
            set: values.set === undefined ? {} : values.set,
            push: values.push === undefined ? {} : values.push,
            inc: values.inc === undefined ? {} : values.inc,
        };
        const results = await fetch("/api/updateuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        props.setUsuarioAdquirido(newResults);
    };

    function setValuesComprador() {
        console.log("valueando usuario");
        actualizarusuario({
            inc: {saldo: -precio}
        });
    }



    return (
        <div className="content">
            {itembook.length > 0 ? <Objeto books={itembook} itembookHistorial={itembookHistorial} comprar={recuperar} /> : <h2>No se encuentra el libro</h2>}
            <Scroll books={books} titulo='Vistos recientemente' />
            <button onClick={pruebas}>pruebas</button>
        </div>


    )
})
