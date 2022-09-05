import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import HeroCard, { iHeroCard } from '../components/shared/HeroCard'

const Home: NextPage = () => {

  const data: iHeroCard = {
    title: 'We Rock the World',
    subtitle: 'We shape the future'
  }

  return (
    <Layout page='home'>
      <Head>
        <title>The Devs Space</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeroCard data={data} ></HeroCard>
    </Layout>

  );
}

export default Home;
