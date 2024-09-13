
import "@/styles/globals.css";
import Head from 'next/head';  // Importa el componente Head

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Enlace de Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
