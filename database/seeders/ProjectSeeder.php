<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Sari-Sari Store App',
                'description' => 'An app concept for managing a small neighborhood store. It includes a home screen, an inventory list, a profile page, and a sign-up flow.',
                'summary' => 'An app for a neighborhood store with a home screen, inventory list, profile, and sign-up flow.',
                'tech_stack' => 'Figma, [Add your other tools]',
                'category' => 'app',
                'project_url' => null,
                'repository_url' => null,
                'image' => '/images/project-sari.svg',
                'image_alt' => 'Illustration of a phone screen showing an inventory list',
                'learned' => '[Write one or two sentences about what you learned building this.]',
                'date_completed' => '2024-06-15',
            ],
            [
                'title' => 'UCU CITE Tracker (Figma design)',
                'description' => 'A Figma design for a graduate tracer system. It has a sidebar with Dashboard, Reports, Graduates, and Settings, forms for general, educational, and employment information, and light and dark modes.',
                'summary' => 'A Figma design for a graduate tracer system: a dashboard with a sidebar, reports, graduate forms, and light and dark modes.',
                'tech_stack' => 'Figma',
                'category' => 'design',
                'project_url' => 'https://www.figma.com/design/ecnOQLWsm3lKOdC4hFjg6a/UCU-CITE-Tracker?node-id=0-1',
                'repository_url' => null,
                'image' => '/images/project-figma.svg',
                'image_alt' => 'Illustration of a dashboard design with a dark sidebar, summary cards, and a bar chart',
                'learned' => '[Write what you learned about designing dashboards and forms.]',
                'date_completed' => '2024-09-01',
            ],
            [
                'title' => 'Blender 3D Project',
                'description' => '[Describe what you modeled in Blender.]',
                'summary' => '[Describe what you modeled in Blender.]',
                'tech_stack' => 'Blender',
                'category' => '3d',
                'project_url' => null,
                'repository_url' => null,
                'image' => '/images/project-3d.svg',
                'image_alt' => 'Illustration of a 3D cube in teal tones',
                'learned' => '[Write what you learned about 3D modeling.]',
                'date_completed' => '2024-11-20',
            ],
            [
                'title' => 'Baby Red Dragon',
                'description' => 'A Blender animation of a baby red dragon. [Add what happens in it and how you made it.]',
                'summary' => 'A Blender animation of a baby red dragon. [Add one line about what happens in it.]',
                'tech_stack' => 'Blender',
                'category' => '3d',
                'project_url' => null,
                'repository_url' => null,
                'image' => '/images/project-animation.svg',
                'image_alt' => 'Illustration of three animation frames with a moving circle',
                'learned' => '[Write what you learned about animation.]',
                'date_completed' => '2025-02-10',
            ],
            [
                'title' => 'This Portfolio Website',
                'description' => 'A single-page portfolio with six sections, a dark mode, filters, a project dialog, and a contact form that validates input in the browser.',
                'summary' => 'A responsive, accessible single-page site with dark mode, filters, and a validated contact form.',
                'tech_stack' => 'HTML, Tailwind CSS, JavaScript',
                'category' => 'web',
                'project_url' => null,
                'repository_url' => null,
                'image' => '/images/project-portfolio.svg',
                'image_alt' => 'Illustration of a browser window with a headline and a button',
                'learned' => '[Write what you learned about responsive layouts and accessibility.]',
                'date_completed' => '2025-05-01',
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title' => $project['title']], $project);
        }
    }
}
