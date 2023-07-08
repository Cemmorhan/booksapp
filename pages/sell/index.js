
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import BuscadorApi from "@/components/BuscadorApi"
import { Divider, Radio, Table } from 'antd';
import { useEffect, useState } from 'react';
import { message, Button } from 'antd';
import { useFileSystemPublicRoutes } from '@/next.config';


export default withPageAuthRequired(function sell(props) {
    const { user, error, isLoading } = useUser();
    const [renderizado, setRenderizado] = useState(false);
    const [databooks, setDatabooks] = useState([]);
    const [book, setBook] = useState([]);
    const [booksMyDB, setBooksMyDB] = useState([]);
    const [booksInTable, setBooksInTable] = useState([]);
    const [showMoreBooks, setShowMoreBooks] = useState(false);
    


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

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setBook(selectedRows[0]);
        },

    };

    const rowSelectionDB = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setBook(selectedRows[0]);
        },

    };

    const rowSeletionTable = {
        
        book,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setBook(selectedRows[0]);
        },

    };

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
            user: user,
            /*
            price: book_price,
            updatedate: book_updatedate,
            selldate: book_selldate,
            state: book_state*/
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
        else if(renderizado && !showMoreBooks) {
            const bookskey2 = booksMyDB.map((result, index) => { return { ...result, key: index } });
            setBooksInTable(bookskey2);
        }

    }, [renderizado, showMoreBooks, databooks, booksMyDB]);



    useEffect(() => {
        console.log("booksMyDB", booksMyDB);
        console.log("dataBooks", databooks);
        console.log("booksInTable", booksInTable);
    }, [booksMyDB, databooks, booksInTable]);


    // Venta
    function Venta() {
        getBook();
    }
    function showMore() {
        setShowMoreBooks(true);
    }

    // Mensajes
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
 useEffect(() => {
    console.log("rowselection", rowSeletionTable)
    }, [rowSeletionTable])

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
                        No encuentras el libro? Impórtalo de Google Books y añádelo a tu biblioteca</h4>

                    <Button type="primary" onClick={showMore} style={{ margin: "20px 0px" }}>
                        Mostrar
                    </Button>
                </div> : null}

                <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                    <Button type="primary" onClick={Venta}>
                        vender
                    </Button>
                </div>
            </div>
        </>



    )
})