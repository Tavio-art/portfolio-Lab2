@extends('layouts.app')

@section('title', 'Ruzzel John D. Maines | Portfolio')

@section('content')

{{-- HERO --}}
<section id="home" class="min-h-screen flex items-center justify-center text-center px-6 pt-20">
    <div>
        <p class="text-red-400 mb-3">Hi, I'm</p>
        <h1 class="text-4xl md:text-6xl font-extrabold text-white">Ruzzel John D. Maines</h1>
        <p class="mt-4 text-lg text-slate-400">BSIT Student &bull; Designer &bull; 3D &amp; Animation Enthusiast</p>
        <div class="mt-8 flex gap-4 justify-center">
            <a href="#projects" class="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition">View Projects</a>
            <a href="#contact" class="px-6 py-3 rounded-lg border border-slate-700 hover:border-red-500 transition">Contact Me</a>
        </div>
    </div>
</section>

{{-- ABOUT --}}
<section id="about" class="max-w-3xl mx-auto px-6 py-24">
    <h2 class="text-3xl font-bold text-white mb-6">About Me</h2>
    <p class="text-slate-400 leading-relaxed">
        I'm a BSIT student at Urdaneta City University. I love designing, working with 3D in Blender,
        and making animations. I learn best when I'm taught properly, and once I get it, I pick things up fast.
    </p>
</section>

{{-- SKILLS --}}
<section id="skills" class="max-w-3xl mx-auto px-6 py-24">
    <h2 class="text-3xl font-bold text-white mb-8">Skills</h2>
    <div class="grid sm:grid-cols-3 gap-4">
        @foreach ($skills as $skill)
            <div class="rounded-xl bg-slate-900 border border-slate-800 p-6 text-center hover:border-red-500 transition">
                <p class="font-semibold text-white">{{ $skill }}</p>
            </div>
        @endforeach
    </div>
</section>

{{-- PROJECTS --}}
<section id="projects" class="max-w-5xl mx-auto px-6 py-24">
    <h2 class="text-3xl font-bold text-white mb-8">Projects</h2>
    <div class="grid md:grid-cols-2 gap-6">
        @foreach ($projects as $project)
            <article class="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-red-500 transition">
                <span class="text-xs uppercase tracking-wide text-red-400">{{ $project['type'] }}</span>
                <h3 class="text-xl font-semibold text-white mt-2">{{ $project['title'] }}</h3>
                <p class="text-slate-400 mt-2 text-sm">{{ $project['desc'] }}</p>
                @if (!empty($project['link']))
                    <a href="{{ $project['link'] }}" target="_blank" rel="noopener"
                       class="inline-block mt-4 text-sm text-red-400 hover:underline">View &rarr;</a>
                @endif
            </article>
        @endforeach
    </div>
</section>

{{-- CONTACT --}}
<section id="contact" class="max-w-3xl mx-auto px-6 py-24 text-center">
    <h2 class="text-3xl font-bold text-white mb-4">Contact</h2>
    <p class="text-slate-400 mb-6">Want to work together or just say hi?</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="mailto:ruzzeljohnmaines21@gmail.com" class="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition">Email Me</a>
        <a href="https://github.com/Tavio-art" target="_blank" rel="noopener" class="px-6 py-3 rounded-lg border border-slate-700 hover:border-red-500 transition">GitHub</a>
    </div>
</section>

@endsection
