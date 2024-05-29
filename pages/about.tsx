import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import { useTranslation } from 'react-i18next';

const About: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout page='about'>
      <Head>
        <title>{
         [
          t('brand.title'),
          t('pages.about.meta.title')
         ].join(' - ')
        }</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-4 lg:px-7 md:space-x-10'>
        <h1 className='max-w-7xl mx-auto lg:px-7 md:space-x-10 text-5xl font-extralight font-sans text-indigo-500'>
          {t('pages.about.title')}
        </h1>
      </div>
    </Layout>
  );
};

export default About;
