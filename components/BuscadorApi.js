import { Input } from 'antd';
import { Select } from 'antd';
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from 'react';
import Link from 'next/link';

function BuscadorApi(props) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("title");

    const getBookGoogle = async () => {
        const results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`, {
            method: "GET",
        }).then((response) => response.json());
        if (results.items === undefined) {
            return;
        }
        const books = results.items.map((result, index) => {
            const id = result.id;
            const title = result.volumeInfo.subtitle != undefined ? result.volumeInfo.title + " " + result.volumeInfo.subtitle : result.volumeInfo.title;
            const author = result.volumeInfo.authors;
            const language = result.volumeInfo.language;
            const description = result.volumeInfo.description;
            const filtrado = Array.isArray(result.volumeInfo.industryIdentifiers) ? result.volumeInfo.industryIdentifiers.filter((isbn) => isbn.type === "ISBN_13") : [];
            const isbn = filtrado.length > 0 ? filtrado[0].identifier : undefined;
            const year = result.volumeInfo.publisherDate;
            const pages = result.volumeInfo.pageCount;
            const genre = result.volumeInfo.categories;
            const publisher = result.volumeInfo.publisher;
            const raw = result;
            const image = Array.isArray(result.volumeInfo.imageLinks) ? result.volumeInfo.imageLinks.thumbnail : result.volumeInfo.imageLinks;
            return { id, title, author, language, description, isbn, year, pages, genre, publisher, raw, image }
        });

        const booksfiltered = books.filter((book) => book.isbn != undefined);
        const booksfiltered2 = booksfiltered.filter((book) => book.image != undefined);
        props.setDatabooks(booksfiltered2);

    };

    const getBookFromDB = async () => {
        if (value==="") return;
        const send = { type: type, value: value };
        const results = await fetch("/api/findbook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        props.setBooksMyDB(newResults);
    };


    const buscar = () => {
        getBookFromDB();
        console.log("buscando");
        getBookGoogle();
    }

    const changeSelect = (type) => {
        setType(type);
    };

    const changeInput = (e) => {
        setValue(e.target.value);
    }


    return (
        <>
            <div className="buscadorApi">
                <div className="buscadorApi_titulo">
                    <h3>¡¡Busca el libro que quieras vender!!</h3>
                </div>

                <div className='buscadorApi_input'>
                    <Input placeholder="Eg. Harry Potter" onChange={changeInput} />
                    <Select
                        defaultValue="Título"
                        style={{
                            width: 120,
                        }}
                        onChange={changeSelect}
                        options={[
                            {
                                value: 'title',
                                label: 'Título',
                            },
                            {
                                value: 'author',
                                label: 'Autor',
                            },
                            {
                                value: 'isbn',
                                label: 'ISBN',
                            },
                        ]}
                    />

                    <div className="search" style={{ width: "80px" }} onClick={buscar}>
                        <FiSearch size={30} color='white' />
                    </div>
                </div>


            </div>

        </>
    )
}
export default BuscadorApi;