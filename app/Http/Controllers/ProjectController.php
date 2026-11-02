<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('ProjectsPublic', [
            'projects' => Project::orderByDesc('date_completed')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        unset($data['image']);

        $data['summary'] = $data['summary'] ?? \Illuminate\Support\Str::limit($data['description'], 160, '');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project added successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $data = $this->validatedData($request, $project);
        unset($data['image']);

        $data['summary'] = $data['summary'] ?? \Illuminate\Support\Str::limit($data['description'], 160, '');

        if ($request->hasFile('image')) {
            $this->deleteStoredImage($project->image);
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $this->deleteStoredImage($project->image);
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    private function validatedData(Request $request, ?Project $project = null): array
    {
        $uniqueTitle = Rule::unique('projects', 'title');
        if ($project) {
            $uniqueTitle = $uniqueTitle->ignore($project->id);
        }

        return $request->validate(
            [
                'title' => ['required', 'string', 'max:100', $uniqueTitle],
                'category' => ['required', 'string', Rule::in(['app', 'design', '3d', 'web'])],
                'description' => ['required', 'string', 'min:20'],
                'summary' => ['nullable', 'string', 'max:255'],
                'tech_stack' => ['required', 'string', 'max:150'],
                'project_url' => ['nullable', 'url'],
                'repository_url' => ['nullable', 'url'],
                'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
                'image_alt' => ['nullable', 'string', 'max:255'],
                'learned' => ['nullable', 'string'],
                'date_completed' => ['required', 'date', 'before_or_equal:today'],
            ],
            $this->messages()
        );
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Please enter a project title.',
            'title.max' => 'The title may not be longer than 100 characters.',
            'title.unique' => 'A project with this title already exists. Choose a different title.',
            'category.required' => 'Please choose a category.',
            'category.in' => 'Category must be App, Design, 3D, or Web.',
            'description.required' => 'Please write a project description.',
            'description.min' => 'The description must be at least 20 characters.',
            'tech_stack.required' => 'Please list the tech stack (tools used).',
            'tech_stack.max' => 'The tech stack may not be longer than 150 characters.',
            'project_url.url' => 'The project URL must be a valid link (include https://).',
            'repository_url.url' => 'The repository URL must be a valid link (include https://).',
            'date_completed.required' => 'Please enter the date this project was completed.',
            'date_completed.before_or_equal' => 'The completion date cannot be in the future.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a JPG, JPEG, PNG, or WEBP file.',
            'image.max' => 'The image may not be larger than 2 MB.',
        ];
    }

    private function deleteStoredImage(?string $image): void
    {
        if ($image && str_starts_with($image, 'projects/')) {
            Storage::disk('public')->delete($image);
        }
    }
}
