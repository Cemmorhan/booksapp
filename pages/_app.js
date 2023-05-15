import '@/styles/globals.css'
import MyMenu from '../components/MyMenu.js'

export default function App({ Component, pageProps }) {
  return (
    <div className="mainContainer">
    <MyMenu />
    <Component {...pageProps} />
    </div>
    )
}
