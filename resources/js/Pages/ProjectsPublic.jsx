import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import FilterButtons from '../Components/FilterButtons';
import Layout from '../Components/Layout';
import ProjectDialog from '../Components/ProjectDialog';
import ProjectForm from '../Components/ProjectForm';
import SectionTitle from '../Components/SectionTitle';

const PLACEHOLDER = '/images/project-portfolio.svg';

function mapProject(project) {
    const tools = String(project.tech_stack || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

    return {
        ...project,
        id: project.id,
        category: project.category || '',
        image: project.image_url || PLACEHOLDER,
        imageAlt: project.image_alt || project.title,
        title: project.title,
        summary: project.summary || project.description,
        tools,
        externalLink: project.project_url || null,
        text: project.description,
        learned: project.learned || '',
        link: project.project_url || null,
        tech_stack: project.tech_stack,
        description: project.description,
        project_url: project.project_url,
        repository_url: project.repository_url,
        date_completed: project.date_completed,
    };
}

export default function ProjectsPublic({ projects: dbProjects = [] }) {
    const { flash } = usePage().props;
    const [projectFilter, setProjectFilter] = useState('all');
    const [activeProject, setActiveProject] = useState(null);
    const [formMode, setFormMode] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const projects = useMemo(() => dbProjects.map(mapProject), [dbProjects]);

    const visibleProjects = useMemo(
        () =>
            projects.filter(
                (project) => projectFilter === 'all' || project.category === projectFilter,
            ),
        [projects, projectFilter],
    );

    function confirmDelete() {
        if (!deleting) return;
        router.delete(`/projects/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    }

    return (
        <Layout>
            <Head title="Projects" />

            <section className="sec">
                <div className="sec-in">
                    <SectionTitle>Projects</SectionTitle>
                    <div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <FilterButtons
                                label="Filter projects by type"
                                active={projectFilter}
                                onChange={setProjectFilter}
                                options={[
                                    { value: 'all', label: 'All' },
                                    { value: 'app', label: 'App' },
                                    { value: 'design', label: 'Design' },
                                    { value: '3d', label: '3D' },
                                    { value: 'web', label: 'Web' },
                                ]}
                            />
                            <button
                                type="button"
                                className="btn btn-main"
                                onClick={() => setFormMode('add')}
                            >
                                Add project
                            </button>
                        </div>

                        {flash?.success && (
                            <p
                                className="mt-4 rounded-md border border-accent bg-card px-4 py-3 font-bold text-accent"
                                role="status"
                            >
                                {flash.success}
                            </p>
                        )}

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {visibleProjects.map((project) => (
                                <article
                                    key={project.id}
                                    className="overflow-hidden rounded-lg border border-line bg-card"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.imageAlt}
                                        width="640"
                                        height="400"
                                        className="aspect-[16/10] w-full object-cover"
                                    />
                                    <div className="p-5">
                                        <h3 className="font-display text-xl font-extrabold">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2">{project.summary}</p>
                                        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tools used">
                                            {project.tools.map((tool) => (
                                                <li key={tool} className="pill">
                                                    {tool}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                className="btn btn-line"
                                                onClick={() => setActiveProject(project)}
                                            >
                                                View details
                                            </button>
                                            {project.externalLink && (
                                                <a
                                                    className="btn btn-line"
                                                    href={project.externalLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Open in Figma
                                                    <span className="sr-only"> (opens in a new tab)</span>
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                className="btn btn-line"
                                                onClick={() => setFormMode(project)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-line"
                                                onClick={() => setDeleting(project)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />

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
