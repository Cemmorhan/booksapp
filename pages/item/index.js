import Objeto from "../../components/Objeto";
import Scroll from "../../components/Scroll";
import { use, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { message } from 'antd';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Item(props) {
    const [renderizado, setRenderizado] = useState(false);
    const { user, error, isLoading } = useUser();
    const [itembook, setItembook] = useState([]);
    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState("0");
    const [itembookHistorial, setItembookHistorial] = useState([]);
    const [bookselected, setBookselected] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [vendedor, setVendedor] = useState([]);
    const [usuariovendedor, setUsuariovendedor] = useState([]);
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
        const send = { isbn: isbn, state: "en venta" }
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

    // recuperar usuario vendedor
    const getVendedor = async () => {
        const send = { book_id: bookselected, state: "en venta" };
        const results = await fetch("/api/getvendedor", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        console.log("vendedor", newResults);
        setVendedor(newResults);
    };
    // recuperar usuario vendedor
    const getUsersVendedor = async () => {
        if (!user) return;
        const send = { user_id: vendedor[0].userSell.sub, user_email: vendedor[0].userSell.name };
        const results = await fetch("/api/getuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        }); console.log("usuariovendedor", newResults);
        setUsuariovendedor(newResults[0]);
    };

    //recuperar libro seleccionado para compra


    useEffect(() => {
        if (renderizado) {
            if (bookselected !== undefined) {
                getVendedor();
            } else {
                errorMessage1();
            }
        }
    }, [ bookselected]);

    useEffect(() => {
        if (renderizado){
        if (vendedor !== undefined && vendedor.length > 0 && vendedor[0].state === "en venta") {
            getUsersVendedor();
        }
        else {
            errorMessage3();
        }}}
    , [vendedor]);

    useEffect(() => {
        if(renderizado){
        console.log("usuariovendedoren" + usuariovendedor.saldo + "es mayor que" + precio);

        if (usuariovendedor!= undefined && usuariovendedor !== null) {
            if (usuariovendedor.saldo >= precio) {
                setValues();
                setValuesComprador();
                setValuesVendedor();
                success();
            }else {
                errorMessage2();
            }
        } else {
            errorMessage3();
        }}
    }, [usuariovendedor]);


    // comprar libro
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
        actualizarlibro({
            set: { state: "vendido", salesdata: { userbuy: user, selldate: book_selldate, selldate2: book_selldate2 } }
        });
    }


    //descontar saldo
    const actualizarUsuario = async (values) => {
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
    };

    function setValuesComprador() {
        actualizarUsuario({
            inc: { saldo: -precio }
        });
    }
    //aumentar saldo saldo
    const actualizarUsuarioVendedor = async (values) => {
        if (!user) return;
        const send = {
            user_id: vendedor[0].userSell.sub,
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
    };

    function setValuesVendedor() {
        actualizarUsuarioVendedor({
            inc: { saldo: precio }
        });
    }
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Compra realizada con éxito',
        });
    };
    const errorMessage1 = () => {
        messageApi.open({
            type: 'error',
            content: 'Seleccione un libro',
        });
    };
    const errorMessage2 = () => {
        messageApi.open({
            type: 'error',
            content: 'No tienes suficiente saldo suficiente',
        });
    };

    const errorMessage3 = () => {
        messageApi.open({
            type: 'error',
            content: 'No se pudo realizar la compra, el libro ya no se encuentra en venta',
        });
    };
   
    useEffect(() => {
        setRenderizado(true);
    }, []);


    return (
        <>
            {contextHolder}
            <div className="content">
                {itembook.length > 0 ? <Objeto books={itembook} itembookHistorial={itembookHistorial} setBookselected={setBookselected} setPrecio={setPrecio}/> : <h2>No se encuentra el libro</h2>}
                <Scroll books={books} titulo='Vistos recientemente' />
            </div>
        </>


    )
})
