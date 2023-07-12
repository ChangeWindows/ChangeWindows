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
        Schema::create('features', function (Blueprint $table) {
            $table->id();
            $table->string('f_name')->charset('utf8')->collate('utf8_cs')->required();
            $table->string('slug')->required();
            $table->timestamps();
        });

        Schema::create('feature_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feature_id')->constrained('features')->onDelete('cascade');
            $table->bigInteger('f_id')->nullable();
            $table->string('build')->required();
            $table->string('status')->required();
            $table->timestamps();
        });

        Schema::create('feature_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feature_id')->constrained('features')->onDelete('cascade');
            $table->string('name')->required();
            $table->text('description')->nullable();
            $table->integer('status')->required();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
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
        Schema::dropIfExists('feature_contents');
        Schema::dropIfExists('feature_status');
        Schema::dropIfExists('features');
    }
};
