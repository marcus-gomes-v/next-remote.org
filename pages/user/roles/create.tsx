import { Fragment, useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import Layout from '../../../components/layout';
import { useAuth } from '../../../context/AuthContext';
import { Transition } from '@headlessui/react';
import { faCheckCircle, faXmark } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRouter } from 'next/router';
import UploadFile from '../../../components/shared/storage/UploadFile';
import { useTranslation } from 'react-i18next';

const Offer = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { useSession } = useAuth() as { useSession: user };
    const [imgUrl, setImgUrl] = useState('');
    const [show, setShow] = useState(false);

    const setImageFromChild = (imgString: string) => {
        setImgUrl(imgString);
    };

    const [content, setContent] = useState({
        title: '',
        body: '',
        type: '',
        location: '',
        department: '',
        companyName: '',
        closeDate: '',
        closeDateFull: '',
    });

    const onChange = (e: any) => {
        const { value, name } = e.target;
        setContent(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmit = async () => {
        const author = {
            name: useSession.displayName,
            email: useSession.email,
            uid: useSession.uid,
            imageUrl: useSession.photoURL,
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'lerigo'
        };

        const { title, body, type, location, department, companyName } = content;
        await axios.post('/api/role', {
            title,
            slug: `${dashify(title)}-${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDay()}`,
            body,
            imgUrl,
            type,
            location,
            department,
            companyName,
            closeDate: new Date(),
            closeDateFull: new Date(),
            author,
        }, { headers: headers });
        setShow(true);
        router.push('/user/roles/list');
    };

    return (
        <Layout page='offer-new'>
            <form className="space-y-6" action="javascript:void(0)" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{t('pages.authenticated.createRole.title')}</h3>
                            <p className="mt-1 text-sm text-gray-500">{t('pages.authenticated.createRole.publicInfo')}</p>
                        </div>
                        <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                                        {t('pages.authenticated.createRole.companyName')}
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="companyName"
                                            id="company-name"
                                            value={content.companyName}
                                            onChange={onChange}
                                            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder={t('pages.authenticated.createRole.placeholders.companyName')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    {t('pages.authenticated.createRole.about')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="body"
                                        name="body"
                                        rows={3}
                                        value={content.body}
                                        onChange={onChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={t('pages.authenticated.createRole.placeholders.jobDescription')}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">{t('pages.authenticated.createRole.briefDescription')}</p>
                            </div>

                            <UploadFile setImageCallback={setImageFromChild} />
                        </div>
                    </div>
                </div>

                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{t('pages.authenticated.createRole.detailedInfo')}</h3>
                            <p className="mt-1 text-sm text-gray-500">{t('pages.authenticated.createRole.publicInfo')}</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-5">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        {t('pages.authenticated.createRole.jobTitle')}
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={content.title}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={t('pages.authenticated.createRole.placeholders.jobTitle')}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        {t('pages.authenticated.createRole.department')}
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={content.department}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>{t('common.select')}</option>
                                        <option value={'Design'}>{t('common.department.design')}</option>
                                        <option value={'Engineering'}>{t('common.department.engineering')}</option>
                                        <option value={'Marketing'}>{t('common.department.marketing')}</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        {t('pages.authenticated.createRole.type')}
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={content.type}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>{t('common.select')}</option>
                                        <option value={'Full-time'}>{t('common.type.fullTime')}</option>
                                        <option value={'Part-time'}>{t('common.type.partTime')}</option>
                                        <option value={'Self-employed'}>{t('common.type.selfEmployed')}</option>
                                        <option value={'Freelance'}>{t('common.type.freelance')}</option>
                                        <option value={'Contract'}>{t('common.type.contract')}</option>
                                        <option value={'Internship'}>{t('common.type.internship')}</option>
                                        <option value={'Apprenticeship'}>{t('common.type.apprenticeship')}</option>
                                        <option value={'Seasonal'}>{t('common.type.seasonal')}</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        {t('pages.authenticated.createRole.location')}
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
                                        value={content.location}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>{t('common.select')}</option>
                                        <option value={'Remote'}>{t('common.location.remote')}</option>
                                        <option value={'Hybrid'}>{t('common.location.hybrid')}</option>
                                        <option value={'On Site'}>{t('common.location.onSite')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="reset"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t('pages.authenticated.createRole.cancel')}
                    </button>
                    <button
                        onClick={onSubmit}
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t('pages.authenticated.createRole.save')}
                    </button>
                </div>
            </form>

            <Transition
                show={show}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">{t('pages.authenticated.createRole.successMessage')}</p>
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => setShow(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <FontAwesomeIcon icon={faXmark} className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Layout>
    );
};

export default Offer;
