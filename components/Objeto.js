import { useState, useEffect } from 'react'
import { Select } from 'antd';
import { Button } from 'antd';
function Objeto({ books, itembookHistorial , comprar}) {
    const [isDefined, setIsDefined] = useState(false)
    const [options, setOptions] = useState([])
    const [cantidad, setCantidad] = useState(0)
    const [bookselected, setBookselected] = useState([])
    const [precio, setPrecio] = useState(0)
    const comprobante=true
    //cosas select
    const onChange = (value) => {
        console.log(`selected ${value}`);
        setBookselected(value)
        setPrecio(labelToPrice(value))
    };

    const labelToPrice = (value) => {
        let price = 0
        itembookHistorial.map((bookshistorial) => {
            if (bookshistorial._id === value) {
                price = bookshistorial.price
            }
        })
        return price
    }
    

    
    useEffect(() => {
        if (itembookHistorial !== undefined && itembookHistorial.length > 0) {
            setCantidad(itembookHistorial.length)
            setOptions(itembookHistorial.map((bookshistorial, index) => {
                return { 
                    value: bookshistorial._id, 
                    label: bookshistorial.envio != undefined ? bookshistorial.price + " €" + " + " + bookshistorial.envio + " € de envío" : bookshistorial.price, 
                    key: index, 
                }
            }
            ))
        }else{
            setCantidad(0)
        }
    }, [itembookHistorial])
    useEffect(() => {
        console.log("bookselected", bookselected)
    }, [bookselected])


    useEffect(() => {
        console.log("options", options)
    }, [options])

    useEffect(() => {
        if (books !== undefined && books.length > 0) {
            setIsDefined(true)
        } else {
            setIsDefined(false)
        }
    }, [books])





    return (
        <>
            <div className="content_item">
                <div className="ficha_item">
                    <div className="imagen_item" style={{ objectFit: "scale-down" }}>
                        <img src={isDefined && books[0].image.thumbnail != undefined ? books[0].image.thumbnail : "Imagen"} className="caratula_img" alt='' />
                    </div>
                    <div className="datos_item">
                        <div className="descripcion_item">
                            <div className="titulo_item">
                                <h1>{isDefined && books[0].title}</h1>
                            </div>

                            <h2>{isDefined && books[0].author}</h2>
                            <h5>{isDefined && books[0].isbn}</h5>
                            <h4>{isDefined && books[0].genre}</h4>
                            <h3>Sinopsis de {isDefined && books[0].title}:</h3>
                            <p>{isDefined && books[0].description}</p>

                        </div>
                        <div className="botones_item">
                            <div className="boton_item" >
                                <h3>En venta: <span style={{color:cantidad>0?"green":"red"}}>{cantidad}</span></h3>
                            </div>
                            <Select
                                style={{ width: 200 }}
                                showSearch
                                placeholder="Opciones"
                                onChange={onChange}
                                options={options}
                            />
                                <Button type="primary" onClick={() => comprar(bookselected,comprobante,precio) }>Comprar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}

export default Objeto;