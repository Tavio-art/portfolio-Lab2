import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="page-fill flex w-full flex-col bg-paper text-ink">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-mark focus:px-4 focus:py-2 focus:text-[#10262E]"
            >
                Skip to content
            </a>

            <Navbar />

            <main id="main" className="flex w-full flex-1 flex-col">
                {children}
            </main>
        </div>
    );
}
