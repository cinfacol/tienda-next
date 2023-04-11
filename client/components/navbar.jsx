"use client";

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Popover, Transition, Menu } from '@headlessui/react';
import { getCategories } from '@/app/redux/features/categories/categoriesService';
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
import {
  Bars3Icon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorArrowRaysIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  ViewColumnsIcon,
  XMarkIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import { logout, reset } from '@/app/redux/features/auth/authSlice';
import Link from "next/link";
import Search from './search';
import Image from "next/image";
import { getUser } from '@/app/redux/features/auth/authService';
import { GetProducts } from '@/app/redux/features/products/productsService';

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '/',
    icon: CursorArrowRaysIcon,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '/', icon: ShieldCheckIcon },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '/',
    icon: ViewColumnsIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'View All Products', href: '#', icon: CheckCircleIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const isLogged = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const categorias = useSelector((state) => state.categories.categories);
  const access = localStorage.getItem('access');

  // const subCategories = categorias?.map(categoria => categoria.sub_categories.map(sub_category => sub_category.name));
  // const parentCategories = categorias?.map(categoria => categoria.name);
  // console.log('categorias_hijas', subCategories);
  // console.log('categorias_padres', parentCategories);

  // eslint-disable-next-line no-unused-vars
  // const [log, setLog] = useState(false);
  // const user = JSON.parse(localStorage.getItem('user'));

  const logoutHandler = () => {
		dispatch(logout());
		dispatch(reset());
		navigate.push("/");
	};

  useEffect(() => {
    dispatch(getCategories())

  }, [])

  useEffect(() => {
    dispatch(GetProducts())
  }, [])

  useEffect(() => {
    if (access && !isLogged) {
        dispatch(getUser());
    }
  }, []);

  const authLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <img
              className="h-full w-full rounded-full"
              src={user && user.profile_photo}
              // src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt="photo"
              width={400}
              height={400}
            />
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <form onSubmit={logoutHandler} method="POST">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='submit'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  const guestLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <img
              className="h-full w-full rounded-full"
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKNFcHih9B4u-dmadzY41EHOXwMJ8Dyhn5bw&usqp=CAU"
              src="http://localhost:8000/mediafiles/profile_default.png"
              alt="avatar"
              width={400}
              height={400}
            />
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/login"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Login
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Sign up
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  return (
    <>
      <Popover className="relative bg-white">
        <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">

            {/* div visible para todos los tamaños */}
            <div className="flex items-center ml-2">
              <div>
                <Link href='/' className="flex">
                  <span className="sr-only">Workflow</span>
                  <Image
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Logo"
                    width={400}
                    height={400}
                  />
                </Link>
              </div>

              {/* div visible solo moviles */}
              <div className='md:hidden ml-14'>
                <div className='flex items-center justify-between space-x-3'>
                  <div>
                    {(user || isLogged) ? user && user.first_name : 'Invitado'}
                  </div>
                  {user ? authLinks : guestLinks }
                  <div className='mt-5'>
                    <Link href="/">
                      <ShoppingCartIcon className="h-8 w-8 cursor-pointer text-gray-300 md:mr-6 mr-4" />
                      <span className="text-xs relative bottom-10 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">2</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* div visible solo para moviles */}
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            {/* div oculto para moviles Menu principal (Solutions, shop, Products, Categorias) */}
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex space-x-10 md:items-center">
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                      >
                        <span>Solutions</span>
                        {<ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />}
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
                              <Link
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
                                      Learn more <span aria-hidden="true">&rarr;</span>
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="bg-gray-50">
                            <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                              {callsToAction.map((item) => (
                                <div key={item.name} className="flow-root">
                                  <Link
                                    href={item.href}
                                    className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                  >
                                    <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">{item.name}</span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Link href='/shop' className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Shop
                </Link>
                <Link href="/products" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Products
                </Link>
                <Search />
                {/* {
                  (location.pathname !== '/search') ?
                  <SearchBox
                    search={search}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    categories={categorias}
                  /> : <></>
                } */}
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                      >
                        <span>Categorías</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
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
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg">
                          <div className="absolute inset-0 flex">
                            <div className="bg-white w-1/2" />
                            <div className="bg-gray-50 w-1/2" />
                          </div>
                          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                            <nav className="grid gap-y-10 px-4 py-8 bg-white sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                              {(categorias?.length > 0) && (categorias?.map((item) => (
                                <div key={item.id}>
                                  <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">{(item.sub_categories.length > 0) && item.name}</h3>
                                  <ul className="mt-5 space-y-6">
                                    {item?.sub_categories?.map((sub_item) => (
                                      <li key={sub_item.id} className="flow-root">
                                        <Link
                                          href="/"
                                          className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                        >
                                          <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                          <span className="ml-4 text-small">{sub_item.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )))}
                            </nav>
                            <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                              <div>
                                <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                  From the blog
                                </h3>
                                <ul className="mt-6 space-y-6">
                                  {blogPosts.map((post) => (
                                    <li key={post.id} className="flow-root">
                                      <Link href={post.href} className="-m-3 p-3 flex rounded-lg hover:bg-gray-100">
                                        <div className="hidden sm:block flex-shrink-0">
                                          <Image
                                            className="w-32 h-20 object-cover rounded-md"
                                            src={post.imageUrl}
                                            alt="photo"
                                            width={400}
                                            height={400}
                                          />
                                        </div>
                                        <div className="w-0 flex-1 sm:ml-8">
                                          <h4 className="text-base font-medium text-gray-900 truncate">{post.name}</h4>
                                          <p className="mt-1 text-sm text-gray-500">{post.preview}</p>
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-6 text-sm font-medium">
                                <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                                  {' '}
                                  View all posts <span aria-hidden="true">&rarr;</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
              <div className="flex items-center md:ml-12">
                <div className='flex items-center md:mr-6 md:justify-between md:space-x-5'>
                  <div>
                    {(user || isLogged) ? user && user.first_name : 'Invitado'}
                  </div>
                  {(user || isLogged) ? authLinks : guestLinks }
                </div>
                <Link href="/">
                  <ShoppingCartIcon className="h-8 w-8 cursor-pointer text-gray-300 lg:mr-6 mr-4" />
                  <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">2</span>
                </Link>
                {user &&
                <Link href="/">
                  <HeartIcon className="h-8 w-8 cursor-pointer text-gray-300 lg:mr-6 mr-4" />
                  <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">1</span>
                </Link>
                }
              </div>
            </div>
          </div>
        </div>

        {/* popover.panel visible solo moviles al dar click en el logo menu (las 3 rayitas) Shop, Products, Resources, Contact Sales */}
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
                    <Link href='/' className="flex">
                      <span className="sr-only">Workflow</span>
                      <Image
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Logo"
                        width={400}
                        height={400}
                      />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-8 text-base">
                      <Link href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                        {' '}
                        View all products <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <Link href='/shop' className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Shop
                  </Link>
                  <Link href='/products' className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Products
                  </Link>
                  <Link href='/' className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};
