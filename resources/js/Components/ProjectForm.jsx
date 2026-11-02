import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from './InputError';

export default function ProjectForm({ project = null, onDone, onCancel }) {
    const isEditing = Boolean(project);

    const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm({
        title: '',
        category: 'web',
        description: '',
        tech_stack: '',
        project_url: '',
        repository_url: '',
        image: null,
        date_completed: '',
    });

    useEffect(() => {
        if (project) {
            setData({
                title: project.title ?? '',
                category: project.category ?? 'web',
                description: project.description ?? project.text ?? '',
                tech_stack: project.tech_stack ?? (project.tools ? project.tools.join(', ') : ''),
                project_url: project.project_url ?? project.externalLink ?? '',
                repository_url: project.repository_url ?? '',
                image: null,
                date_completed: project.date_completed
                    ? String(project.date_completed).slice(0, 10)
                    : '',
            });
            clearErrors();
        } else {
            reset();
            clearErrors();
        }
    }, [project]);

    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            transform((formData) => ({ ...formData, _method: 'put' }));
            post(`/projects/${project.id}`, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    transform((d) => d);
                    reset();
                    onDone?.();
                },
                onFinish: () => transform((d) => d),

                onError: () => {},
            });
        } else {
            post('/projects', {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onDone?.();
                },
                onError: () => {},
            });
        }
    }

    function field(name, label, input) {
        return (
            <div>
                <label htmlFor={name} className="block font-bold">
                    {label}
                </label>
                {input}
                <InputError id={`${name}-error`} message={errors[name]} />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <h2 className="font-display text-2xl font-extrabold">
                {isEditing ? 'Edit project' : 'Add project'}
            </h2>

            {field(
                'title',
                'Title',
                <input
                    id="title"
                    type="text"
                    className="field"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />,
            )}

            {field(
                'category',
                'Category',
                <select
                    id="category"
                    className="field"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                >
                    <option value="app">App</option>
                    <option value="design">Design</option>
                    <option value="3d">3D</option>
                    <option value="web">Web</option>
                </select>,
            )}

            {field(
                'description',
                'Description',
                <textarea
                    id="description"
                    rows="4"
                    className="field"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />,
            )}

            {field(
                'tech_stack',
                'Tech stack (comma-separated)',
                <input
                    id="tech_stack"
                    type="text"
                    className="field"
                    placeholder="Figma, HTML, Tailwind CSS"
                    value={data.tech_stack}
                    onChange={(e) => setData('tech_stack', e.target.value)}
                />,
            )}

            {field(
                'date_completed',
                'Date completed',
                <input
                    id="date_completed"
                    type="date"
                    className="field"
                    value={data.date_completed}
                    onChange={(e) => setData('date_completed', e.target.value)}
                />,
            )}

            {field(
                'project_url',
                'Project URL (optional)',
                <input
                    id="project_url"
                    type="url"
                    className="field"
                    placeholder="https://"
                    value={data.project_url}
                    onChange={(e) => setData('project_url', e.target.value)}
                />,
            )}

            {field(
                'repository_url',
                'Repository URL (optional)',
                <input
                    id="repository_url"
                    type="url"
                    className="field"
                    placeholder="https://github.com/..."
                    value={data.repository_url}
                    onChange={(e) => setData('repository_url', e.target.value)}
                />,
            )}

            {field(
                'image',
                isEditing ? 'New image (optional)' : 'Image (optional)',
                <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    className="field"
                    onChange={(e) => setData('image', e.target.files[0] ?? null)}
                />,
            )}

            <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" className="btn btn-main" disabled={processing}>
                    {processing ? 'Saving…' : isEditing ? 'Update project' : 'Add project'}
                </button>
                <button type="button" className="btn btn-line" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
