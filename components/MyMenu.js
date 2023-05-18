import Link from 'next/link'
import { FiHome, FiUser, FiShoppingCart, FiMessageSquare } from "react-icons/fi";

function MyMenu() {
    return (
        <>
            <div className="menu">

                <div >
                    Identificaté o Registrate
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
                        <FiHome />
                    </div>
                </Link>
                <Link href="/perfil">
                    <div className="menu_item_bottom">
                        <FiUser />
                    </div>
                </Link>
                <Link href="/cesta">
                    <div className="menu_item_bottom">
                        <FiShoppingCart />
                    </div>
                </Link>
                <Link href="/about">
                    <div className="menu_item_bottom">
                        <FiMessageSquare />
                    </div>
                </Link>
            </div>
        </>
    )
}
export default MyMenu;