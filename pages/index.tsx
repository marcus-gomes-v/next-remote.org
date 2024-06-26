import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import HeroCard, { iHeroCard } from '../components/shared/HeroCard';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation();

  const data: iHeroCard = {
    title: t('pages.home.hero.title'),
    subtitle: t('pages.home.hero.subtitle'),
  };

  return (
    <Layout page='home'>
      <Head>
        <title>{
         [
          t('brand.title'),
          t('pages.home.meta.title')
         ].join(' - ')
        }</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeroCard data={data} ></HeroCard>
    </Layout>
  );
};

export default Home;
