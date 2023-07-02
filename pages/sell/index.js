import BuscadorApi from "@/components/BuscadorApi"
import { Divider, Radio, Table } from 'antd';
import { useEffect, useState } from 'react';


export default function About() {
    const [databooks, setDatabooks] = useState([]);
    const [book, setBook] = useState([]);

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
    // Guardar libros mongo
    const getBook = async () => {
console.log("selectedbokinsidegetbook",book)
        if (!book) return;
        const send = { 
            book_id: book.id ,
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
            raw: book.raw
        };
        console.log("cosas que envío",send)
        const results = await fetch("/api/getbook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        setBook(newResults);
        console.log (book);
        console.log("cosas")
    };
    // Venta
    function Venta () {
        getBook();
    }


    return (
        <div className="content">
            <BuscadorApi setDatabooks={setDatabooks} />
           

            <div className="results_books" style={{ padding: "10px 20px", width: "100%" }}>

                {databooks.length > 0 ? <Table
                    style={{ width: "100%" }}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={databooks}
                    expandable={{
                        expandedRowRender: (record) => (<>
                            <p style={{ margin: 0 }}>Resumen:</p>
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                {record.description}
                            </p></>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                /> : null}

            </div>
            <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
            <button type="primary" onClick={Venta}>
                Confirmar venta.
            </button>
            </div>
            
        </div>
        


    )
}