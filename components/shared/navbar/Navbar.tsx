import { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { faConnectdevelop, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../../../lib/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../../context/AuthContext';
import {
    MenuIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { faClose, faUserAstronaut, faBuildings, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import NavBarLink from './NavBarLink';
import { useTranslation } from 'react-i18next';



function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

function Navbar({page}: {page: string}) {
    const { t } = useTranslation();
    const { login, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [ isLogged, setIsLogged ] = useState(false);



    const links = [
        {
            name: t('navBar.professionals'),
            href: '/professionals/list',
            icon: faUserAstronaut,
            active: page === 'professionals'
        },
        {
            name: t('navBar.companies'),
            href: '/companies/list',
            icon: faBuildings,
            active: page === 'companies'
        },
        {
            name: t('navBar.about'),
            href: '/about',
            icon: faInfoCircle,
            active: page === 'about'
        }
    ]

    useEffect( () => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (user) {
                setIsLogged(true);
            }
        });
    }, []);

    return (
        <Popover className="relative bg-white py-3">
            <div className="absolute inset-0 z-30 pointer-events-none" aria-hidden="true" />
            <div className="relative z-20">
                <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-7 md:justify-between md:space-x-10">
                    <Link href={'/'}>
                        <a className="flex align-middle items-center font-bold text-indigo-600 group content-center">
                            <span className="sr-only">RemoteU.org</span>
                            <FontAwesomeIcon icon={faConnectdevelop} className="h-7 w-7 mr-1 group-hover:animate-spin-fast" aria-hidden="true" />
                            {t('brand.title')}
                        </a>
                    </Link>
                    <div className='-mr-2 -my-2 md:hidden'>
                        <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                            <span className='sr-only'>Open menu</span>
                            <MenuIcon className='h-6 w-6' aria-hidden='true' />
                        </Popover.Button>
                    </div>
                    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                        <Popover.Group as="nav" className="flex space-x-10 align-middle items-center">
                            {links.map((link) => (
                                <NavBarLink
                                    icon={link.icon}
                                    key={link.name}
                                    link={link.href}
                                    text={link.name}
                                    highlight={link.active}
                                />
                            ))}
                        </Popover.Group>
                        <div className="flex items-center">
                            <button
                                onClick={!loading && isLogged ? logout : login}
                                className={`
                                    group
                                    px-6
                                    text-base
                                    font-light
                                    ${!loading && isLogged ? `
                                        text-red-600 
                                        hover:text-red-500
                                        border-solid ` :
                                        `text-indigo-600 
                                        hover:text-indigo-400
                                    `}
                                `}
                            >
                                {!loading && isLogged ?
                                    <span className='
                                        inline-flex
                                        items-center
                                        justify-center'>
                                    <FontAwesomeIcon
                                        icon={faClose}
                                        className="w-4 h-4 mr-2 group-hover:animate-spin" />
                                    {t('login.logout')}
                                </span>
                                :
                                    <span className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        group-hover:animate-pulse" >
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="w-4 h-4 mr-2" />
                                    {t('login.google')}
                                </span>
                            }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter='duration-200 ease-out'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-100 ease-in'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <Popover.Panel
                    focus
                    className='absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
                >
                    <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
                        <div className="py-6 px-5">
                            <div className="grid grid-cols-2 gap-4">
                                {links.map((link) => (
                                    <NavBarLink
                                        icon={link.icon}
                                        key={link.name}
                                        link={link.href}
                                        text={link.name}
                                        highlight={link.active}
                                        classOverwrite='text-gray-900 hover:text-gray-900'
                                    />
                                ))}
                            </div>
                            <div className='mt-6'>
                                <a
                                    href='#'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-light text-white bg-indigo-600 hover:bg-indigo-700'
                                >
                                    <FontAwesomeIcon icon={faGoogle} />
                                    {t('common.signUp')}
                                </a>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default Navbar;
