<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReleaseChannelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('release_channels', function (Blueprint $table) {
            $table->id();
            $table->string('name')->required();
            $table->string('short_name')->required();
            $table->integer('supported')->default(1);
            $table->foreignId('channel_id')->constrained('channels')->onDelete('cascade');
            $table->foreignId('release_id')->constrained('releases')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['channel_id', 'release_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('release_channels');
    }
}
