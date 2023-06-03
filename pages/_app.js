import '@/styles/globals.css'
import MyMenu from '../components/MyMenu.js'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
    <div className="mainContainer">
    <MyMenu />
    <Component {...pageProps} />
    </div>
     </UserProvider>
   )
}
