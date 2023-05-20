import Scroll from "@/components/Scroll"

export default function Cesta() {
    return (
        <>
            <div className="contenedor_carrito">
                <div className="articulos_carrito">
                    <h1>Articulos</h1>
                </div>

                <div className="compra_carrito">
                    <div className="total_carrito">
                        <h1>Total</h1>
                    </div>
                </div>
            </div>
            <Scroll titulo='Vistos recientemente' />
            <Scroll titulo='Similares' />
            <Scroll titulo='Otros libros' />



        </>
    )
}