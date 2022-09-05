import Head from 'next/head';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

export default function Layout({ children, page }: { children: React.ReactNode, page: string }) {
  const siteTitle = 'Remoteu.org';

  return (
    <div className='min-h-screen'>
      <Head>
        <meta
          name='description'
          content='Torneio o app com tudo sobre beach tennis'
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Navbar page={page} />
      <main className='max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-4 lg:px-7 md:space-x-10'>{children}</main>
      <Footer></Footer>
   </div>
  );
}
