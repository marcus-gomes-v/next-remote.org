import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../../components/layout';
import { useTranslation } from 'react-i18next';  // Importe useTranslation

const List = () => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosRequest = async () => {
      try {
        const res = await axios.get('/api/role/list');
        setEntries(res.data.rolesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };
    axiosRequest();
  }, []);

  return (
    <Layout page='roles'>
      <div className="max-w-4xl mx-auto py-10">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-semibold">{t('pages.roles.title')}</h1>
          <Link href={'/user/roles/create'}>
            <a className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{t('pages.roles.announce')}</a>
          </Link>
        </div>
        {loading ? (
          <div className="text-center">{t('common.loading')}</div>
        ) : entries.length > 0 ? (
          entries.map((entry: any) => (
            <div key={entry.id} className="mt-4 p-4 border-b">
              <Link href={`/user/roles/edit/${entry.id}`}>
                <a className="text-blue-600 hover:text-blue-800">{entry.title}</a>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center my-10">{t('pages.roles.notFound')}</div>
        )}
      </div>
    </Layout>
  );
};

export default List;
