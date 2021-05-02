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
            $table->string('version')->nullable();
            $table->integer('canonical_version')->nullable();
            $table->string('codename')->nullable();
            $table->text('description')->nullable();
            $table->text('changelog')->nullable();
            $table->foreignId('platform_id')->constrained('platforms')->onDelete('cascade');
            $table->date('start_preview')->nullable();
            $table->date('start_public')->nullable();
            $table->date('start_extended')->nullable();
            $table->date('start_lts')->nullable();
            $table->date('end_lts')->nullable();
            $table->integer('start_build')->nullable();
            $table->integer('start_delta')->nullable();
            $table->integer('end_build')->nullable();
            $table->integer('end_delta')->nullable();
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
