# Portfolio (Laravel + Inertia + React)

Personal IT portfolio. Each section is its **own page** (not one long scroll). Only the Projects data comes from the database. Manage projects at `/manage/projects`.

## Requirements

- PHP 8.2+
- Composer
- Node.js + npm
- SQLite (default) or another DB configured in `.env`

## Setup

Run these from the project folder (`C:\Users\ruzze\portfolio`), not from `system32`.

```bash
composer install
cp .env.example .env
php artisan key:generate

npm install
npm run build
# Or for development with hot reload:
# npm run dev

php artisan migrate
php artisan db:seed
php artisan storage:link

php artisan serve
```

## Public pages (view only)

| URL | Page file | What it shows |
| --- | --- | --- |
| `/` | `Pages/Home.jsx` | Hero / intro |
| `/about` | `Pages/About.jsx` | About me |
| `/skills` | `Pages/Skills.jsx` | Skills + filters |
| `/projects` | `Pages/ProjectsPublic.jsx` | Projects from DB + filters + details dialog |
| `/education` | `Pages/Education.jsx` | Education and experience |
| `/contact` | `Pages/Contact.jsx` | Contact links + form |

All public pages share `Components/Layout.jsx` (Navbar only, full viewport height). Navbar uses Inertia `<Link>` and highlights the current URL.

## Management

| URL | Page file | What it does |
| --- | --- | --- |
| `/manage/projects` | `Pages/Projects/Index.jsx` | Add / edit / delete projects |

Route names stay `projects.index`, `projects.store`, `projects.update`, `projects.destroy`.

## Image uploads

- Files are stored in `storage/app/public/projects`
- Public URL uses the `storage:link` symlink
- Seeded images still use `/images/project-*.svg` under `public/images`

## Useful commands

```bash
php artisan migrate
php artisan db:seed --class=ProjectSeeder
php artisan storage:link
php artisan serve
npm run dev
```

Do **not** run `migrate:fresh` unless you intend to wipe the database.
