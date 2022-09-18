<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->required();
            $table->string('feature_name')->charset('utf8')->collate('utf8_cs')->required();
            $table->text('description')->nullable();
            $table->string('added')->required();
            $table->string('removed')->nullable();
            $table->string('slug')->required();
            $table->timestamps();
        });

        Schema::create('flag_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flag_id')->constrained('flags')->onDelete('cascade');
            $table->integer('feature_id')->nullable();
            $table->string('build')->required();
            $table->string('status')->required();
            $table->timestamps();
        });

        Schema::create('flag_authors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flag_id')->constrained('flags')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        });

        Schema::create('flag_suggestions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flag_id')->constrained('flags')->onDelete('cascade');
            $table->string('name')->required();
            $table->string('feature_name')->required();
            $table->integer('feature_id')->required();
            $table->text('description')->nullable();
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
        Schema::dropIfExists('flag_suggestions');
        Schema::dropIfExists('flag_authors');
        Schema::dropIfExists('flag_status');
        Schema::dropIfExists('flags');
    }
};
