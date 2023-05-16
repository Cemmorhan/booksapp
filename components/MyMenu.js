import Link from 'next/link'

function MyMenu() {
    return (
        <>
            <div className="menu">

                <div style={{ backgroundColor: "red" }}>
                    cosa A
                </div>

                <div className="menu_opciones">
                    <Link href="/">
                        <div className="menu_item">
                            Home
                        </div>
                    </Link>
                    <Link href="/perfil">
                        <div className="menu_item">
                            Perfil
                        </div>
                    </Link>
                    <Link href="/cesta">
                        <div className="menu_item">
                            Cesta
                        </div>
                    </Link>
                    <Link href="/about">
                        <div className="menu_item">
                            Conócenos
                        </div>
                    </Link>
                </div>
            </div>
            <div className="menu_bottom">
            <Link href="/">
                <div className="menu_item_bottom">
                    A
                </div>
            </Link>
            <Link href="/perfil">
                <div className="menu_item_bottom">
                    B
                </div>
            </Link>
            <Link href="/cesta">
                <div className="menu_item_bottom">
                    C
                </div>
            </Link>
            <Link href="/about">
                <div className="menu_item_bottom">
                    D
                </div>
            </Link>
            </div>
        </>
    )
}
export default MyMenu;