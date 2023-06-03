import Link from 'next/link'
import { FiHome, FiUser, FiShoppingCart, FiMessageSquare } from "react-icons/fi";

function MyMenu() {
    return (
        <>
            <div className="menu">
                <div >      
                    <Link href="/api/auth/logout">
                    <div className="menu_item">
                    Logout
                    </div>
                </Link>
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
                        <FiHome size={25} />
                    </div>
                </Link>
                <Link href="/cesta">
                    <div className="menu_item_bottom">
                        <FiShoppingCart size={25} />
                    </div>
                </Link>
                <Link href="/about">
                    <div className="menu_item_bottom">
                        <FiMessageSquare size={25} />
                    </div>
                </Link>

                <Link href="/perfil">
                    <div className="menu_item_bottom">
                        <FiUser size={25} />
                    </div>
                </Link>
            </div>
        </>
    )
}
export default MyMenu;