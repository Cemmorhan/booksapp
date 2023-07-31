import { Input } from 'antd';
import { Select } from 'antd';
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Buscadorredireccion(props) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("title");

    const buscar = () => {
        console.log("buscando");
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
                    <h3>Encuentra el libro que buscas!!</h3>
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
                        <Link
                            href={{
                                pathname: "/search",
                                query: { value: value, type: type}
                            }}
                        >
                            <FiSearch size={30} color='white' />
                        </Link>

                    </div>
                </div>


            </div>

        </>
    )
}
export default Buscadorredireccion;