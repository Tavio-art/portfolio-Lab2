import { useEffect, useRef } from 'react';

export default function ProjectDialog({ project, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (project) {
            dialog.showModal();
            document.body.classList.add('overflow-hidden');
        } else {
            dialog.close();
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [project]);

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="dialog-title"
            className="m-auto w-[min(92vw,36rem)] rounded-lg border-2 border-ink bg-card p-6 text-ink backdrop:bg-black/60"
            onClose={onClose}
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose();
            }}
        >
            {project && (
                <>
                    <h2 id="dialog-title" className="font-display text-2xl font-extrabold">
                        {project.title}
                    </h2>
                    <p className="mt-3">{project.text}</p>
                    <p className="mt-4 font-bold">Tools</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                            <li key={tool} className="pill">
                                {tool}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 font-bold">What I learned</p>
                    <p className="mt-1">{project.learned}</p>
                    {project.link && (
                        <a
                            href={project.link}
                            className="btn btn-line mr-3 mt-6"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open in Figma
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    )}
                    <button type="button" className="btn btn-main mt-6" onClick={onClose}>
                        Close
                    </button>
                </>
            )}
        </dialog>
    );
}
