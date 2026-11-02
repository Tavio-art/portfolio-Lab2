import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const links = ['About', 'Skills', 'Projects', 'Education', 'Contact'];
const activeLink = 'Projects';

export default function Navbar() {
    const [isDark, setIsDark] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    function toggleTheme() {
        const dark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch (e) {
        }
        setIsDark(dark);
    }

    function linkClass(name) {
        const base = 'cursor-default rounded-md px-3 py-1.5 text-sm font-semibold';
        return name === activeLink ? `${base} bg-yellow-400 text-black` : base;
    }

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
            <nav aria-label="Main" className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 py-2">
                <Link href="/" className="font-display text-2xl font-extrabold" aria-label="Home">
                    RM
                </Link>

                <ul className="hidden items-center gap-1 md:flex">
                    {links.map((name) => (
                        <li key={name}>
                            <span className={linkClass(name)} aria-current={name === activeLink ? 'page' : undefined}>
                                {name}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="col-start-3 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        className="rounded-md border border-line p-2"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        onClick={toggleTheme}
                    >
                        <svg className="h-5 w-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                        </svg>
                        <svg className="hidden h-5 w-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="rounded-md border border-line p-2 md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <ul className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
                    {links.map((name) => (
                        <li key={name}>
                            <span className={`block ${linkClass(name)}`}>{name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
