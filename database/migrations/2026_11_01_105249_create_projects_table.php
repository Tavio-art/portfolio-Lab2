<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->string('summary');
            $table->string('tech_stack', 150);
            $table->string('category');
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('image')->nullable();
            $table->string('image_alt')->nullable();
            $table->text('learned')->nullable();
            $table->date('date_completed');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
