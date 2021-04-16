<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTweetStreamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tweet_streams', function (Blueprint $table) {
            $table->id();
            $table->string('name')->required();
            $table->string('account')->required();
            $table->string('consumer_key')->required();
            $table->string('consumer_secret')->required();
            $table->string('access_token')->required();
            $table->string('access_token_secret')->required();
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
        Schema::dropIfExists('tweet_streams');
    }
}
