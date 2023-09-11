import Link from 'next/link'
import { FiHome, FiUser, FiShoppingCart, FiMessageSquare, FiDollarSign } from "react-icons/fi";

function MyMenu({ user }) {
    
    const logout = () => {
        if (user) {
            return (
                <Link href="/api/auth/logout">
                    <div className="menu_item">
                        Logout
                    </div>
                </Link>
            )
        } else {
            return (
                <Link href="/api/auth/login">
                    <div className="menu_item">
                        Login
                    </div>
                </Link>
            )
        }
    }
    return (
        <>
            <div className="menu">
                <div >
                    {logout()}
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
                    <Link href="/sell">
                        <div className="menu_item">
                            Vender
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
                <Link href="/sell">
                    <div className="menu_item_bottom">
                        <FiDollarSign size={25} />
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