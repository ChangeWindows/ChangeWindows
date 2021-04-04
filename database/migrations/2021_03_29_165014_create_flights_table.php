<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->integer('major')->required();
            $table->integer('minor')->required();
            $table->integer('build')->required();
            $table->integer('delta')->required();
            $table->foreignId('release_channel_id')->constrained('release_channels')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['major', 'minor', 'build', 'delta', 'release_channel_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
}
