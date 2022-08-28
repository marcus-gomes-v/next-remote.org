/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { faConnectdevelop, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    BookmarkAltIcon,
    BriefcaseIcon,
    ChartBarIcon,
    CheckCircleIcon,
    CursorClickIcon,
    DesktopComputerIcon,
    GlobeAltIcon,
    InformationCircleIcon,
    MenuIcon,
    NewspaperIcon,
    OfficeBuildingIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ViewGridIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon, PaperAirplaneIcon, WifiIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { faClose, faStarshipFreighter } from '@fortawesome/pro-solid-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useTranslation } from 'react-i18next';


const solutions = [
    {
        name: 'Engajamento',
        description: 'Hoje em dia milhares de empresas buscam profissionais Brasileiros.',
        href: '#',
        icon: CursorClickIcon,
    },
    {
        name: 'Trabalho Remoto',
        description: 'Hoje o mundo está mais conectado do que nunca, e fronteiras não importam mais.',
        href: '#',
        icon: WifiIcon,
    },
    { 
        name: 'Segurança', 
        description: "Nossa base é constante avaliada por uma comunidade de devs e entusiastas de tecnologia.", 
        href: '#', 
        icon: ShieldCheckIcon 
    },
    {
        name: 'Integrações',
        description: "Conecte-se com todo um universo de empresas e profissonais dispostos a mudar o mundo.",
        href: '#',
        icon: ViewGridIcon,
    },
]
const callsToAction = [
    { name: 'Watch Demo', href: '#', icon: PlayIcon },
    { name: 'Contact Sales', href: '+55333333333', icon: PhoneIcon },
]
const company = [
    { name: 'About', href: '#', icon: InformationCircleIcon },
    { name: 'Customers', href: '#', icon: OfficeBuildingIcon },
    { name: 'Press', href: '#', icon: NewspaperIcon },
    { name: 'Careers', href: '#', icon: BriefcaseIcon },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
const resources = [
    { name: 'Community', href: '#', icon: UserGroupIcon },
    { name: 'Partners', href: '#', icon: GlobeAltIcon },
    { name: 'Guides', href: '#', icon: BookmarkAltIcon },
    { name: 'Webinars', href: '#', icon: DesktopComputerIcon },
]
const blogPosts = [
    {
        id: 1,
        name: 'Boost your conversion rate',
        href: '#',
        preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
        imageUrl:
            'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
    },
    {
        id: 2,
        name: 'How to use search engine optimization to drive traffic to your site',
        href: '#',
        preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
        imageUrl:
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80',
    },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

function Navbar({page}: {page: string}) {
    const { t } = useTranslation();
    const { login, logout } = useAuth();    
    const [loading, setLoading] = useState(false);
    const [ isLogged, setIsLogged ] = useState(false);

    useEffect( () => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            if (user) {
                setIsLogged(true)
            } 
        });
    }, []);
    
    return (
        <Popover className="relative bg-white">
            <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true" />
            <div className="relative z-20">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-7 md:justify-start md:space-x-10">
                    <Link href={'/'}>
                        <a className="flex font-bold text-indigo-600 text-lg group">
                            <span className="sr-only">RemoteU.org</span>
                            <FontAwesomeIcon icon={faConnectdevelop} className="h-7 w-7 mr-1 group-hover:animate-spin-fast" aria-hidden="true" />
                            {t('common.remoteuOrg')}
                        </a>
                    </Link>
                    <div className="-mr-2 -my-2 md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                        <Popover.Group as="nav" className="flex space-x-10 align-middle items-center">
                            <Link href={'/professional/list'}>
                                <a className={
                                    `
                                    text-base
                                    font-medium
                                     px-3
                                    ${ page == 'professionals' ? "text-indigo-600 hover:text-indigo-900" : "text-gray-500 hover:text-gray-900" }
                                    `
                                }>
                                    {t('navBar.devs')}
                                </a>
                            </Link>
                            <Link href={'/offer/list'}>
                                <a className={
                                    `
                                    text-base
                                    font-medium
                                     px-3
                                    ${page == 'offers' ? "text-indigo-600 hover:text-indigo-900" : "text-gray-500 hover:text-gray-900" }
                                    `
                                }>
                                    {t('navBar.companies')}
                                </a>
                            </Link>
                            <Popover>
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={classNames(
                                                open ? 'text-gray-900' : 'text-gray-500',
                                                'px-3 group bg-white rounded-md inline-flex items-center text-base font-medium border-2 border-transparent hover:text-gray-900 focus:text-white focus:bg-indigo-600 focus:outline-none focus:border-indigo-600 focus:rounded-md'
                                            )}
                                        >
                                            <span>{t('common.about')}</span>
                                            <ChevronDownIcon
                                                className={classNames(
                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                    'ml-2 h-5 w-5 group-hover:text-gray-500 group-focus:text-white'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 -translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 -translate-y-1"
                                        >
                                            <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                                                <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                                                    {solutions.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                                                        >
                                                            <div className="flex md:h-full lg:flex-col">
                                                                <div className="flex-shrink-0">
                                                                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                                    <div>
                                                                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                    </div>
                                                                    <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                                                                        {t('common.knowMore')}
                                                                        <span aria-hidden="true">&rarr;</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="bg-gray-50">
                                                    <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                                        {callsToAction.map((item) => (
                                                            <div key={item.name} className="flow-root">
                                                                <a
                                                                    href={item.href}
                                                                    className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                                                >
                                                                    <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                                                    <span className="ml-3">{item.name}</span>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </Popover.Group>
                        <div className="flex items-center md:ml-12">
                            <button
                                onClick={!loading && isLogged ? logout : login}
                                className={`
                                    group
                                    ml-8
                                    px-4
                                    py-2
                                    border
                                    border-transparent
                                    rounded-md
                                    shadow-sm
                                    text-base
                                    font-medium
                                    text-white
                                    ${!loading && isLogged ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"}
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
                                        group-hover:text-yellow-400
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
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5 sm:pb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6 sm:mt-8">
                                <nav>
                                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                                        {solutions.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                                            >
                                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                                </div>
                                                <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className="py-6 px-5">
                            <div className="grid grid-cols-2 gap-4">
                                <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                                    {t('navBar.devs')}
                                </a>

                                <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                                    {t('navBar.companies')}
                                </a>
                                
                            </div>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
    )
}

export default Navbar;