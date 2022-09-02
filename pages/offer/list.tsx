import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Layout from '../../components/layout'
import db from '../../lib/db';

const Offers: NextPage = (props: any) => {
  const { offersData } = props;
  
  return (
    <Layout page='offers' >    
      <Head>
        <title>The Devs Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-4 lg:px-7 md:space-x-10">
        <h1 className="max-w-7xl mx-auto lg:px-7 md:space-x-10 text-5xl font-extralight font-sans text-indigo-500">
          For Companies
        </h1>
        <div className="mt-12 max-w-lg mx-auto grid gap-3 lg:grid-cols-1 lg:max-w-none">
          {offersData.map((post: any) => (
            <Link href={`/offer/${post.slug}`}>
              <a className="hover:underline">
                <div key={post.title} className="flex flex-row rounded-sm shadow-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 ">
                  <div className="flex-shrink-0">
                    <img className="w-32 h-32 object-cover" src={post.imgUrl || "/images/image-hover.avif"} alt="" />
                  </div>
                  <div className="flex-1 bg-white p-3 flex flex-col justify-between ">
                    <div className="flex-1">
                      <p className="text-sm font-light text-indigo-600">
                        {post.title}
                      </p>
                      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        {/* <Link href={`/person/${post.author.uid}}`}>
                        <a>
                          <span className="sr-only">{post.author.name}</span>
                          <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="Avatar Autor" />
                        </a>
                      </Link> */}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {/* <Link href={`/person/${post.author.uid}`}>
                          <a className="hover:underline">
                          {post.author.name}
                          </a>
                        </Link> */}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.created}>{post.created}</time>
                          <span aria-hidden="true">&middot;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
      
    </Layout> 

  )
}

export const getStaticProps = async () => {
  const offers = await db.collection('offers').orderBy('created', 'desc').get();
  const offersData = offers.docs.map((entry: any) => ({
    id: entry.id,
    ...entry.data()
  }));
  return {
    props: { offersData },
    revalidate: 10
  }
}

export default Offers;



