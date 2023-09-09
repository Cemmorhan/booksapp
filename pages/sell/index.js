
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import BuscadorApi from "@/components/BuscadorApi"
import { Divider, Radio, Table } from 'antd';
import { useEffect, useState } from 'react';
import { message, Button, Modal } from 'antd';
import ObjetoModal from "../../components/ObjetoModal";


export default withPageAuthRequired(function Sell(props) {
    const { user, error, isLoading } = useUser();
    const [renderizado, setRenderizado] = useState(false);
    const [databooks, setDatabooks] = useState([]);
    const [book, setBook] = useState(undefined);
    const [booksMyDB, setBooksMyDB] = useState([]);
    const [booksInTable, setBooksInTable] = useState([]);
    const [showMoreBooks, setShowMoreBooks] = useState(false);
    const [modaldata, setModaldata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [book_price, setBook_price] = useState(0);
    const [comprobante, setComprobante] = useState(false);

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Autor',
            dataIndex: 'author',
        },
        {
            title: 'Idioma',
            dataIndex: 'language',
        }
    ];
    // fecha de puesta en venta
    const book_updatedate = new Date();
    const book_updatedate2 =book_updatedate.getTime();


    // rowSelection object indicates the need for row selection
    const rowSeletionTable = {

        book,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setBook(selectedRows[0]);
        },

    };

    //recibir precio del modal
    const enviarPrecio = (precio, vendible) => {
        console.log("es vendible?", vendible);
        console.log("precio sell", precio);
        setBook_price(precio);
        setComprobante(vendible);
    };

    useEffect(() => {
        if (book_price > 0) {
            console.log("precio book price", book_price);
            console.log("comprobante", comprobante);
        }
    }, [book_price]);
    useEffect(() => {
        if (comprobante && book_price > 0) {
            getBook();
            success();
            setIsModalOpen(false);
            setComprobante(false);
        }
    }, [comprobante, book_price]);

    // Guardar libros mongo
    const getBook = async () => {
        console.log("selectedbokinsidegetbook", book)
        if (!book) return;
        const send = {
            book_id: book.id,
            title: book.title,
            author: book.author,
            language: book.language,
            description: book.description,
            isbn: book.isbn,
            year: book.year,
            pages: book.pages,
            genre: book.genre,
            publisher: book.publisher,
            image: book.image,
            raw: book.raw,
            userSell: user,
            price: book_price,
            updatedate: book_updatedate,
            updatedate2: book_updatedate2,
        };

        console.log("cosas que envío", send)
        const results = await fetch("/api/createbook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        setBook(newResults);
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
        setRenderizado(true);
    }, []);

    useEffect(() => {
        if (renderizado) {
            getUsers();
        }
    }, [renderizado]);

    useEffect(() => {
        if (renderizado && showMoreBooks) {
            const booksShown = [...booksMyDB, ...databooks];
            const bookskey1 = booksShown.map((result, index) => { return { ...result, key: index } });
            setBooksInTable(bookskey1);
        }
        else if (renderizado && !showMoreBooks) {
            const bookskey2 = booksMyDB.map((result, index) => { return { ...result, key: index } });
            setBooksInTable(bookskey2);
        }

    }, [renderizado, showMoreBooks, databooks, booksMyDB]);
    useEffect(() => {
        if (renderizado) {
            setModaldata(book != undefined ? <ObjetoModal books={[book]} enviarPrecio={enviarPrecio} ></ObjetoModal> : <h2>No se encuentra el libro</h2>)
        }
    }, [renderizado, book,]);

    // Venta
    function Venta() {
        showModal();
    }
    function showMore() {
        setShowMoreBooks(true);
    }

    // Mensajes
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '¡Libro puesto en venta con exito!',
        });
    };

    // mensaje modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            {contextHolder}
            <div className="content">
                <BuscadorApi setDatabooks={setDatabooks} setBooksMyDB={setBooksMyDB} />
                <div className="results_books" style={{ padding: "10px 20px", width: "100%" }}>

                    {booksInTable.length > 0 ? <Table

                        style={{ width: "100%" }}
                        rowSelection={{
                            type: "radio",
                            ...rowSeletionTable,
                        }}
                        columns={columns}
                        dataSource={booksInTable}
                        expandable={{
                            expandedRowRender: (record) => (<>
                                <p style={{ margin: 0 }}>Resumen:</p>
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.description}
                                </p>
                                <p style={{ margin: 0 }}>ISBN:</p>
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.isbn}
                                </p>
                            </>

                            ),
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                    /> : null}

                </div>
                {databooks.length > 0 ? <div style={{ display: "flex", justifyContent: "right", alignItems: "center", flexDirection: "column" }}>
                    <h4>
                        ¿No encuentras el libro? Impórtalo de Google Books y añádelo a la biblioteca</h4>

                    <Button type="primary" onClick={showMore} style={{ margin: "20px 0px" }}>
                        Mostrar más
                    </Button>
                </div> : null}

                <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                    <Button type="primary" onClick={Venta}>
                        Vender
                    </Button>
                </div>
            </div>
            
            <Modal title="Es este tu libro? Véndelo!"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}


                    width={800}
                >
                    {modaldata}
                </Modal>
        </>



    )
})