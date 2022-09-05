import { Fragment, useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import Layout from '../../../components/layout';
import { useAuth } from '../../../context/AuthContext';
import UploadFile from '../../../components/storage/UploadFile';
import { Transition } from '@headlessui/react';
import { faCheckCircle, faXmark } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Offer = () => {
    const { useSession } = useAuth() as { useSession: user };

    const [imgUrl, setImgUrl] = useState('');

    const [show, setShow] = useState(false)

    const setImageFromChild = (imgString: string) => {
        setImgUrl(imgString)
    }

    const [content, setContent] = useState({
        title: undefined,
        body: undefined,
        type: undefined,
        location: undefined,
        department: undefined,
        companyName: undefined,
        closeDate: undefined,
        closeDateFull: undefined,

    })

    const onChange = (e: any) => {
        const { value, name } = e.target;
        setContent(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async () => {
        const author = {
            name: useSession.displayName,
            email: useSession.email,
            uid: useSession.uid,
            imageUrl: useSession.photoURL,
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'lerigo'
        }

        const { title, body, type, location, department, companyName } = content as any;
        await axios.post('/api/offer',
            {
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
            }, {
            headers: headers
        });
        setShow(true);
    }
    return (
        <Layout page='offer-new'>
            <form className="space-y-6" action="javascript:void(0)" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Vacancy</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                        <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                                        Company Name
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">

                                        <input
                                            type="text"
                                            name="company-name"
                                            id="company-name"
                                            value={content.companyName}
                                            onChange={onChange}
                                            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="RemoteU.org"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    About
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="body"
                                        name="body"
                                        rows={3}
                                        value={content.body}
                                        onChange={onChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="We are searchging for experienced developer, who be able to change the world with us, creating amazing applications..."
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Brief description for the vacancy.</p>
                            </div>

                            {/* <UploadFile setImageCallback={setImageFromChild} />
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Detailed Information</h3>
                            <p className="mt-1 text-sm text-gray-500">Use a best description to show everyone what you need.</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-5">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={content.title}
                                        onChange={onChange}
                                        autoComplete="given-name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder='Software Engineer'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={content.department}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>Select...</option>
                                        <option value={'Design'}>Design</option>
                                        <option value={'Engineering'}>Engineering</option>
                                        <option value={'Marketing'}>Marketing</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={content.type}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>Select...</option>
                                        <option value={'Full-time'}>Full-time</option>
                                        <option value={'Part-time'}>Part-time</option>
                                        <option value={'Self-employed'}>Self-employed</option>
                                        <option value={'Freelance'}>Freelance</option>
                                        <option value={'Contract'}>Contract</option>
                                        <option value={'Internship'}>Internship</option>
                                        <option value={'Apprenticeship'}>Apprenticeship</option>
                                        <option value={'Seasonal'}>Seasonal</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
                                        value={content.location}
                                        onChange={onChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>Select...</option>
                                        <option value={'Remote'}>Remote</option>
                                        <option value={'Hybrid'}>Hybrid</option>
                                        <option value={'On Site'}>On Site</option>
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
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>
            </form>

            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 "
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end pt-12 lg:pr-12">
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
                                        <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                                        {/* <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p> */}
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Layout>
    );
};

export default Offer;
