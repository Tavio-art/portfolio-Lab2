import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Layout from '../../Components/Layout';
import ProjectForm from '../../Components/ProjectForm';

const PLACEHOLDER = '/images/project-portfolio.svg';

function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export default function Index({ projects: dbProjects = [] }) {
    const { flash } = usePage().props;
    const [formMode, setFormMode] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const projects = useMemo(() => dbProjects, [dbProjects]);

    function confirmDelete() {
        if (!deleting) return;
        router.delete(`/manage/projects/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    }

    return (
        <Layout>
            <Head title="Manage Projects" />

            <section className="sec">
                <div className="mx-auto w-full max-w-6xl px-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-muted">
                                CRUD
                            </p>
                            <h1 className="font-display text-3xl font-extrabold md:text-4xl">
                                Manage projects
                            </h1>
                            <p className="mt-2 max-w-xl text-muted">
                                Add a project below. New entries show up in this list and on the
                                public projects page.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/projects" className="btn btn-line">
                                View public page
                            </Link>
                            <button
                                type="button"
                                className="btn btn-main"
                                onClick={() => setFormMode('add')}
                            >
                                Add project
                            </button>
                        </div>
                    </div>

                    {flash?.success && (
                        <p
                            className="mt-6 rounded-md border border-accent bg-card px-4 py-3 font-bold text-accent"
                            role="status"
                        >
                            {flash.success}
                        </p>
                    )}

                    <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-card">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b border-line bg-paper/60 text-muted">
                                <tr>
                                    <th className="px-4 py-3 font-bold">Project</th>
                                    <th className="px-4 py-3 font-bold">Category</th>
                                    <th className="px-4 py-3 font-bold">Tech stack</th>
                                    <th className="px-4 py-3 font-bold">Completed</th>
                                    <th className="px-4 py-3 font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-10 text-center text-muted">
                                            No projects yet. Click <strong>Add project</strong> to
                                            create one.
                                        </td>
                                    </tr>
                                )}
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-line last:border-0">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={project.image_url || PLACEHOLDER}
                                                    alt=""
                                                    className="h-12 w-16 rounded object-cover"
                                                />
                                                <div>
                                                    <p className="font-bold">{project.title}</p>
                                                    <p className="mt-0.5 line-clamp-1 text-muted">
                                                        {project.summary || project.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 capitalize">{project.category}</td>
                                        <td className="px-4 py-4">{project.tech_stack}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {formatDate(project.date_completed)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-line !px-3 !py-1.5 text-sm"
                                                    onClick={() => setFormMode(project)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-line !px-3 !py-1.5 text-sm"
                                                    onClick={() => setDeleting(project)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {formMode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border-2 border-ink bg-card p-6 text-ink">
                        <ProjectForm
                            project={formMode === 'add' ? null : formMode}
                            onDone={() => setFormMode(null)}
                            onCancel={() => setFormMode(null)}
                        />
                    </div>
                </div>
            )}

            {deleting && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="w-full max-w-md rounded-lg border-2 border-ink bg-card p-6 text-ink">
                        <h2 className="font-display text-xl font-extrabold">Delete project?</h2>
                        <p className="mt-3">
                            Are you sure you want to delete <strong>{deleting.title}</strong>?
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button type="button" className="btn btn-main" onClick={confirmDelete}>
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-line"
                                onClick={() => setDeleting(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
