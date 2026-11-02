<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $appends = ['image_url'];

    protected $fillable = [
        'title',
        'description',
        'summary',
        'tech_stack',
        'category',
        'project_url',
        'repository_url',
        'image',
        'image_alt',
        'learned',
        'date_completed',
    ];

    protected function casts(): array
    {
        return [
            'date_completed' => 'date',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        if (str_starts_with($this->image, '/') || str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        return '/storage/'.$this->image;
    }
}
