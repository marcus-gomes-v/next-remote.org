import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import db from '../../lib/db';

import { faCalendar, faMapPin, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';


export interface position {
  id: string,
  title: string,
  body: string,
  type: string,
  location: string,
  slug: string,
  department: string,
  companyName: string,
  closeDate: string,
  closeDateFull: Date,
}

const Companies: NextPage = (props: any) => {
  const { t } = useTranslation();
  const { companiesData } = props;


  return (
    <Layout page='professionals' >
      <Head>
        <title>
          {[
            t('brand.title'),
            t('pages.companies.meta.title')
          ].join(' - ')}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-4 lg:px-7 md:space-x-10">
        <h1 className="max-w-7xl mx-auto lg:px-7 md:space-x-10 text-5xl font-extralight font-sans text-indigo-500">
          {t('pages.companies.title')}
        </h1>

        <div className="overflow-hidden bg-white shadow sm:rounded-md mt-3">
          <ul role="list" className="divide-y divide-gray-200">
            {
              companiesData.length > 0 ?
              companiesData.map((position: position) => (
                <li key={position.id}>
                  <a href={`/companies/${position.slug}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">{position.title}</p>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {position.type}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {position.department}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <FontAwesomeIcon icon={faMapPin} className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {position.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <FontAwesomeIcon icon={faCalendar} className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <p>
                            Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              )) :
              <div className="px-4 py-4 sm:px-6">
                <p className="text-sm font-medium text-indigo-600">
                  {t('pages.companies.notFound')}
                </p>
              </div>
            }
          </ul>
        </div>
      </div>

    </Layout>

  );
};

export const getStaticProps = async () => {
  const companies = await db.collection('roles').orderBy('created', 'desc').get();
  const companiesData = companies.docs.map((entry: any) => ({
    id: entry.id,
    ...entry.data()
  }));
  return {
    props: { companiesData },
    revalidate: 10
  };
};

export default Companies;
