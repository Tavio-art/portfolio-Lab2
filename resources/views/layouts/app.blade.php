<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'My Portfolio')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-950 text-slate-200 antialiased">

    {{-- Navbar --}}
    <header class="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <nav class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <a href="#home" class="font-bold text-lg text-white">Portfolio<span class="text-red-500">.</span></a>

            <button id="menu-btn" class="md:hidden text-2xl" aria-label="Toggle menu">&#9776;</button>

            <ul id="menu" class="hidden md:flex gap-6 text-sm absolute md:static top-full inset-x-0 bg-slate-950 md:bg-transparent p-6 md:p-0 flex-col md:flex-row border-b md:border-0 border-slate-800">
                <li><a href="#about" class="hover:text-red-400">About</a></li>
                <li><a href="#skills" class="hover:text-red-400">Skills</a></li>
                <li><a href="#projects" class="hover:text-red-400">Projects</a></li>
                <li><a href="#contact" class="hover:text-red-400">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        @yield('content')
    </main>

    <footer class="text-center text-sm text-slate-500 py-8 border-t border-slate-800">
        &copy; {{ date('Y') }} Ruzzel John D. Maines. Built with Laravel + Tailwind CSS.
    </footer>

</body>
</html>
