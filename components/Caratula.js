import Link from 'next/link'
function Caratula(props) {

    return (


        <div className="caratula">
            <Link 
            href={{
                pathname: "/item",
                query: { isbn: props.book.isbn }
            }}
            >
                <img src={props.book.image} className="caratula_img" alt="" />
            </Link>
        </div>

    )


}
export default Caratula;