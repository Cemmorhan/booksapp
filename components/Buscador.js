import { Input } from 'antd';
import { Select } from 'antd';
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from 'react';
import TarjetaLibro from './TarjetaLibro';

function Buscador(props) {
    const [value, setValue] = useState(props.value !== undefined ? props.value : "");
    const [type, setType] = useState(props.type !== undefined ? props.type : "title");
    const [booksMyDB, setBooksMyDB] = useState([]);
    const [renderizado, setRenderizado] = useState(false);

    const getBookFromDB = async () => {
        if (value === "") return;
        const send = { type: type, value: value };
        const results = await fetch("/api/findbook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        console.log(newResults);
        setBooksMyDB(newResults);
    };

    useEffect(() => {
        setRenderizado(true);
    }, []);
    useEffect(() => {
        if (renderizado === true && props.value !== undefined && props.type !== undefined) {
            setValue(props.value);
            setType(props.type);
            console.log("buscando1: " + value + " " + type);
        }
    }, [props.value, props.type]);
    useEffect(() => {
        if (value !== "" && type !== undefined) {
            getBookFromDB();
            console.log("buscando2: " + value + " " + type);
        }
    }, [value, type]);

    const buscar = () => {
        getBookFromDB();
        console.log("buscando");
    }

    const changeSelect = (type) => {
        setType(type);
    };

    const changeInput = (e) => {
        setValue(e.target.value);
    }
    function pruebas() {
        console.log(booksMyDB);
    }

    function printBooksMyDB() {
        if (booksMyDB === undefined) {
            return (null
            )
        } else {
            if (booksMyDB.length === 0) {
                return (null
                )
            } else {
                return (
                    <div className='card_container'>
                        {booksMyDB.map((book, index) => {
                            return (
                                <TarjetaLibro book={book} key={index}/>
                            )
                        })}
                    </div>

                )
            }
        }
    }



    return (
        <>
            <div className="buscadorApi">
                <div className="buscadorApi_titulo">
                    <h3>¡Encuentra el libro que buscas!</h3>
                </div>

                <div className='buscadorApi_input'>
                    <Input placeholder="Eg. Harry Potter" onChange={changeInput} defaultValue={value} />
                    <Select
                        defaultValue={type}
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

                    <div className="search"  onClick={buscar}>
                            <FiSearch size={20} color='white' />
                    </div>
                </div>
                {printBooksMyDB()}
                {/* 
                <button onClick={pruebas}>pruebas</button> */}


            </div>

        </>
    )
}
export default Buscador;