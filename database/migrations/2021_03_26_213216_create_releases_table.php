<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReleasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('releases', function (Blueprint $table) {
            $table->id();
            $table->string('name')->required();
            $table->string('version')->required();
            $table->integer('canonical_version')->required();
            $table->string('codename');
            $table->text('description')->nullable();
            $table->text('changelog')->nullable();
            $table->foreignId('platform_id')->constrained('platforms')->onDelete('cascade');
            $table->date('start_preview')->nullable();
            $table->date('start_public')->nullable();
            $table->date('start_extended')->nullable();
            $table->date('start_lts')->nullable();
            $table->date('end_lts')->nullable();
            $table->string('start_build');
            $table->string('start_delta');
            $table->string('end_build');
            $table->string('end_delta');
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('releases');
    }
}
