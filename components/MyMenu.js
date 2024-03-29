import Link from 'next/link'
import { FiHome, FiUser, FiShoppingCart, FiMessageSquare, FiDollarSign, FiSearch } from "react-icons/fi";

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
    
    
    const saldo = () => {
        if (user) {
            return (
                <div className="menu_item" style={{color: user.saldo>0?"green":"red"}}>
                    {user.saldo} €
                </div>
            )
        }
    }
    return (
        <>
            <div className="menu">
                <div >
                    {logout()}
                </div>
                <div className='menugroup'><div className="menu_opciones">
                    <Link href="/">
                        <div className="menu_item">
                            Home
                        </div>
                    </Link>
                    <Link href="/search">
                        <div className="menu_item">
                            Buscar
                        </div>
                    </Link>
                    <Link href="/sell">
                        <div className="menu_item">
                            Vender
                        </div>
                    </Link>
                    <Link href="/perfil">
                        <div className="menu_item">
                            Perfil
                        </div>
                    </Link>
                </div>

                    {saldo()}

                </div>

            </div>
            <div className="menu_bottom">
                <Link href="/">
                    <div className="menu_item_bottom">
                        <FiHome size={25} />
                    </div>
                </Link>
                <Link href="/search">
                    <div className="menu_item_bottom">
                        <FiSearch size={25} />
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