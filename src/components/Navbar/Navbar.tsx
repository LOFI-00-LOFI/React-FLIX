import { FC,useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronRight, Menu, X } from 'lucide-react'
import logo from '../../assets/Netflix-LOGO.png'
import profileImage from '../../assets/profile.jpg'

const Navbar: FC = () => {
    const navigate = useNavigate();

    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');


    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchInputMobileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSearch = (trigger:string) => {
        if(trigger === 'main') {
            searchInputRef.current?.focus();
        } else {
            searchInputMobileRef.current?.focus();
        }
        setIsSearchActive(prev => !prev);
        if (!isSearchActive) {
            setSearchQuery('');
        }
    };

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && searchQuery.trim()) {
            setSearchQuery('');
            setIsSearchActive(false);
            isMenuOpen && setIsMenuOpen(false);
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex flex-col px-5 md:px-10 
            transition-all duration-300 text-white ease-in-out ${isSticky
                    ? "bg-black shadow-lg"
                    : "bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent"
                }`}
        >
            <div className="flex justify-between items-center py-4">
                {/* Logo and Navigation */}
                <div className="flex gap-x-6 md:gap-x-8 items-center">
                    <Link to="/">
                        <img src={logo} alt="NETFLIX LOGO" className="w-28" />
                    </Link>

                    <nav className="hidden text-sm lg:flex space-x-4">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <Link to="/tv-shows" className="hover:text-gray-300">TV Shows</Link>
                        <Link to="/movies" className="hover:text-gray-300">Movies</Link>
                        <Link to="/new-popular" className="hover:text-gray-300">New & Popular</Link>
                        <Link to="/myList" className="hover:text-gray-300">My List</Link>
                        <Link to="/browse-languages" className="hover:text-gray-300">Browse By Languages</Link>
                    </nav>
                </div>

                {/* Icons and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Search Container */}
                    <div
                        role="presentation"
                        className={`hidden md:flex relative  items-center transition-all duration-300 ${isSearchActive ? "w-72 p-2" : "w-auto"
                            }`}
                    >
                        <button
                            aria-label="Toggle Search"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSearch('main');
                            }}
                            className={`flex items-center justify-center p-2 ${isSearchActive ? "absolute left-0" : ""
                                }`}
                        >
                            {!isSearchActive && <Search size={20} color="white" />}
                        </button>
                        <input
                        ref={searchInputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search"
                            type="text"
                            className={`absolute left-10 bg-black bg-opacity-75 text-white rounded-md 
                            border border-transparent focus:outline-none transition-all duration-300 
                            ${isSearchActive ? "w-60 p-2 border-white opacity-100" : "w-0 p-0 opacity-0"}`}
                            onKeyDown={handleSearch}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <Bell size={20} color="white" />

                    <img
                        src={profileImage}
                        className="w-8 h-8 rounded cursor-pointer"
                        alt="Profile"
                    />

                    <ChevronRight size={20} color="white" />

                    <button
                        id="ham-button"
                        className="md:hidden ml-4 focus:outline-none"
                        aria-label="hamburger-menu"
                        onClick={toggleMenu}
                    >
                        <Menu size={24} color="white" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                role="presentation"
                className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-[95] p-8 flex flex-col gap-4 transition-transform duration-300 z-40 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
                    } lg:hidden`}
            >
                <button onClick={closeMenu} className="self-end">
                    <X color="white" size={24} />
                </button>

                <nav className="flex flex-col space-y-2 mt-4">
                    <div
                        role="presentation"
                        className={`relative flex  transition-all duration-300 ${isSearchActive ? " " : "w-auto"
                            }`}
                    >
                        <button
                            aria-label="Toggle Search"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSearch('mobile');
                            }}
                            className={`flex items-center justify-center  ${isSearchActive ? "" : ""
                                }`}
                        >
                            {!isSearchActive && <Search size={20} color="white" />}
                        </button>
                        <input
                        ref={searchInputMobileRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search"
                            type="text"
                            className={` bg-black bg-opacity-75 text-white rounded-md 
                        border border-transparent focus:outline-none transition-all duration-300 
                        ${isSearchActive ? "w-60 p-2 border-white opacity-100" : "w-0 p-0 opacity-0"}`}
                            onKeyDown={handleSearch}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/tv-shows" className="hover:text-gray-300">TV Shows</Link>
                    <Link to="/movies" className="hover:text-gray-300">Movies</Link>
                    <Link to="/new-popular" className="hover:text-gray-300">New & Popular</Link>
                    <div onClick={() => {
                        navigate('/myList')
                        closeMenu()
                    }} className="hover:text-gray-300">My List</div>
                    <Link to="/browse-languages" className="hover:text-gray-300">Browse By Languages</Link>
                </nav>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    role="presentation"
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
                    onClick={closeMenu}
                ></div>
            )}
        </header>
    )
}

export default Navbar
