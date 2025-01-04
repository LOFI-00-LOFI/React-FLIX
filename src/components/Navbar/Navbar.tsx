import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronRight, Menu, X } from 'lucide-react'
import logo from '../../assets/Netflix-LOGO.png'
import profileImage from '../../assets/profile.jpg'
import './Navbar.css'

const Navbar : React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSearch = () => {
        setIsSearchActive(prev => !prev);
        if (!isSearchActive) {
            setSearchQuery('');
        }
    };

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && searchQuery.trim()) {
            // Handle search logic here
            setSearchQuery('');
            setIsSearchActive(false);
            isMenuOpen && setIsMenuOpen(false);
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col px-5 md:px-10 
        transition-all duration-300 text-white ease-in-out ${isSticky ? "bg-black shadow-lg" : "bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent"}`}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-x-6 md:gap-x-8 items-center">
                    <Link to="/">
                        <img src={logo} alt="NETFLIX LOGO" className="w-28" />
                    </Link>

                    <nav className="hidden text-sm lg:flex space-x-4">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <Link to="/" className="hover:text-gray-300">TV Shows</Link>
                        <Link to="/" className="hover:text-gray-300">Movies</Link>
                        <Link to="/" className="hover:text-gray-300">New & Popular</Link>
                        <Link to="/myList" className="hover:text-gray-300">My List</Link>
                        <Link to="/" className="hover:text-gray-300">Browse By Languages</Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <div
                        role="presentation"
                        id="search-bar"
                        className={`hidden md:flex search-container ${isSearchActive ? "active" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSearch();
                        }}
                    >
                        <button
                            aria-label="Toggle Search"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSearch();
                            }}
                        >
                           {!isSearchActive && <Search size={20} color="white" />}
                        </button>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search"
                            type="text"
                            className="search-input"
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
                        aria-label="ham-button"
                        onClick={toggleMenu}
                    >
                        <Menu />
                    </button>
                </div>
            </div>

            <div
                id="mobile-menu"
                role="presentation"
                onClick={closeMenu}
                className={`mobile-menu relative ${isMenuOpen ? "open" : ""} lg:hidden`}
            >
                <button onClick={closeMenu} className="absolute right-4">
                    <X color="white" size={24} />
                </button>
                <div
                        role="presentation"
                        id="search-bar"
                        className={`flex search-container ${isSearchActive ? "active" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSearch();
                        }}
                    >
                        <button
                            aria-label="Toggle Search"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSearch();
                            }}
                        >
                            <Search className={isSearchActive? 'hidden' : ''} size={20} color="white" />
                        </button>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search"
                            type="text"
                            className="search-input"
                            onKeyDown={handleSearch}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/" className="hover:text-gray-300">TV Shows</Link>
                <Link to="/" className="hover:text-gray-300">Movies</Link>
                <Link to="/" className="hover:text-gray-300">New & Popular</Link>
                <Link to="/myList" className="hover:text-gray-300">My List</Link>
                <Link to="/" className="hover:text-gray-300">Browse By Languages</Link>
            </div>

            {isMenuOpen &&
                <div role="presentation" className="overlay show" onClick={closeMenu}></div>
            }
        </header>
    )
}

export default Navbar