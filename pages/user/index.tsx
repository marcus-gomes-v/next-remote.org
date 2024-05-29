import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { session } from '../../lib/session';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const LoggedIn = () => {
  const {t} = useTranslation();
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const oUser = session.get('user');
      if (oUser) {
        setUser(oUser);
        console.log(oUser);
      }
      setLoading(false);
    };
    
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Layout page='user'>
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-medium">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout page='user'>
      <Head>
        <title>
          {[
            t('brand.title'),
            t('pages.authenticated.title', {name: user?.displayName})
          ].join(' - ')}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto py-10">
        <div className="text-2xl font-semibold mb-4">
          {t('pages.authenticated.title', {name: user?.displayName})} 
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium">
              {t('pages.authenticated.jobRoles.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('pages.authenticated.jobRoles.description')}
            </p>
            <Link href="/user/roles/list">
              <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                {t('common.knowMore')}
              </a>
            </Link>
          </div>
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium">
              {t('pages.authenticated.profile.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('pages.authenticated.profile.description')}
            </p>
            <Link href="/user/profile/edit">
              <a className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                {t('common.edit')}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoggedIn;
