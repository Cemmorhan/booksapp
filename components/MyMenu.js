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
                    <Link href="/">
                        <div className="menu_item">
                            Home
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="menu_item">
                            Home
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
                <div className="menu_item_bottom">
                    A
                </div>
                <div className="menu_item_bottom">
                    B
                </div>
                <div className="menu_item_bottom">
                    C
                </div>
                <div className="menu_item_bottom">
                    D
                </div>
            </div>
        </>
    )
}
export default MyMenu;