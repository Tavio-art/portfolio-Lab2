import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import FilterButtons from '../Components/FilterButtons';
import Layout from '../Components/Layout';
import ProjectDialog from '../Components/ProjectDialog';
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
    };
}

export default function ProjectsPublic({ projects: dbProjects = [] }) {
    const [projectFilter, setProjectFilter] = useState('all');
    const [activeProject, setActiveProject] = useState(null);

    const projects = useMemo(() => dbProjects.map(mapProject), [dbProjects]);

    const visibleProjects = useMemo(
        () =>
            projects.filter(
                (project) => projectFilter === 'all' || project.category === projectFilter,
            ),
        [projects, projectFilter],
    );

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
                            <Link href="/manage/projects" className="btn btn-main">
                                Manage projects
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {visibleProjects.length === 0 && (
                                <p className="text-muted md:col-span-2">
                                    No projects to show yet. Add one from{' '}
                                    <Link href="/manage/projects" className="font-bold text-accent underline">
                                        Manage projects
                                    </Link>
                                    .
                                </p>
                            )}
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
                                                    Open project
                                                    <span className="sr-only"> (opens in a new tab)</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
        </Layout>
    );
}
