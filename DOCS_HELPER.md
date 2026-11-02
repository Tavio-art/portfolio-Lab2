# Docs helper — files created or changed

Plain-English notes for explaining this project in a video. Each item is 2–3 sentences.

---

## Page structure (page-to-page)

The site is no longer one long scrolling page. Each section is a separate Inertia page with its own URL. `Layout.jsx` wraps every public page so the Navbar is written once; pages fill the full viewport (no footer).

| Route | File | Short explanation |
| --- | --- | --- |
| `/` | `resources/js/Pages/Home.jsx` | Hero intro only. Buttons link to `/projects` and `/contact`. |
| `/about` | `resources/js/Pages/About.jsx` | Same About section content as before. |
| `/skills` | `resources/js/Pages/Skills.jsx` | Skills list with the original filter buttons. |
| `/projects` | `resources/js/Pages/ProjectsPublic.jsx` | View-only projects from the database, with filters and the details dialog. |
| `/education` | `resources/js/Pages/Education.jsx` | Education and experience timeline. |
| `/contact` | `resources/js/Pages/Contact.jsx` | Contact links plus the browser-validated contact form. |
| `/manage/projects` | `resources/js/Pages/Projects/Index.jsx` | Admin page to add, edit, and delete projects. |

`resources/js/Pages/Portfolio.jsx` was removed after the split (it used to hold every section on one page).

---

## Layout and navigation

### `resources/js/Components/Layout.jsx`
Shared shell for public pages. It renders the skip link, Navbar, and main content (`children`) in a full-viewport (`page-fill`) column — no footer. Main uses `flex-1` so content fills the space under the navbar.

### `resources/js/Components/Navbar.jsx`
Uses Inertia `<Link>` to switch pages (`/about`, `/skills`, etc.). The active link is based on the current URL path; scroll-spy was removed because there are no in-page sections to watch. Dark mode toggle and mobile menu still work; theme is saved in `localStorage`.

---

## Database

### `database/migrations/2026_11_01_105249_create_projects_table.php`
Creates the `projects` table. It holds the fields the portfolio cards and dialog need (title, description, summary, tech stack, category, URLs, image, alt text, learned, date completed).

### `app/Models/Project.php`
Eloquent model for one project row. `$fillable` lists which fields can be mass-assigned from the form; `image_url` is a helper attribute so React always gets a usable image path.

### `database/seeders/ProjectSeeder.php`
Inserts the same five projects that used to be hard-coded. After seeding, the public Projects page looks like the original static version.

### `database/seeders/DatabaseSeeder.php`
Calls `ProjectSeeder` when you run `php artisan db:seed`.

---

## Backend

### `app/Http/Controllers/ProjectController.php`
Resource controller with only `index`, `store`, `update`, and `destroy`. It validates input (with custom messages), saves uploaded images under `storage/app/public/projects`, and deletes old uploaded images when updating or deleting. Redirects stay on `projects.*` route names (now under `/manage/projects`).

### `routes/web.php`
Defines one GET route per public page. `/projects` loads `ProjectsPublic` with DB data. Management lives under `Route::prefix('manage')` so URLs are `/manage/projects`, while route names remain `projects.index` / `store` / `update` / `destroy`.

### `app/Http/Middleware/HandleInertiaRequests.php`
Shares a `flash.success` value with every Inertia page so success messages show after add, update, or delete.

---

## Frontend (forms / dialog)

### `resources/js/Components/ProjectForm.jsx`
Reusable add/edit form with Inertia `useForm`. Posts to `/manage/projects` (and `/manage/projects/{id}` with `_method: put` + `forceFormData` for image uploads).

### `resources/js/Components/InputError.jsx`
Prints one field’s validation error under that field.

### `resources/js/Components/ProjectDialog.jsx`
Shows title, description, tools, learned, and optional link on the public Projects page.

### `resources/js/Components/ContactForm.jsx`
Client-side contact form validation (unchanged behavior).

---

## Docs

### `README.md`
Setup steps plus the public and management URL tables.

### `DOCS_HELPER.md`
This file — short explanations for your walkthrough video.

---

## Validation test table

Use this while recording or demoing. Fill **Actual Result** and **Pass/Fail** yourself.

| # | Test case | Steps | Expected result | Actual result | Pass/Fail |
| --- | --- | --- | --- | --- | --- |
| 1 | Required title | On `/manage/projects`, leave Title empty and submit | Error: “Please enter a project title.” Values stay filled | | |
| 2 | Description too short | Enter a description under 20 characters | Error: description must be at least 20 characters | | |
| 3 | Duplicate title | Add a project, then try another with the same title | Error that the title already exists | | |
| 4 | Update keeps same title | Edit a project, change summary only, keep title | Saves successfully; unique rule ignores current id | | |
| 5 | Invalid URL | Enter `not-a-url` in Project URL | Error that the project URL must be a valid link | | |
| 6 | Future date | Set Date completed to tomorrow | Error that the date cannot be in the future | | |
| 7 | Image type/size | Upload a `.gif` or a file over 2 MB | Image mime/size validation error | | |
| 8 | Happy path add | Fill required fields correctly and submit | Flash “Project added successfully.” New card on `/projects` | | |
| 9 | Delete confirm | Click Delete, then Cancel | Project remains; no flash delete | | |
| 10 | Delete confirm yes | Click Delete, then “Yes, delete” | Flash “Project deleted successfully.” Gone from `/projects` | | |
| 11 | Nav page switch | Click About, Skills, Projects, etc. | Each opens its own page; active nav highlight matches URL | | |
| 12 | Theme persists | Toggle dark mode, go to another page | Theme stays the same across pages | | |
