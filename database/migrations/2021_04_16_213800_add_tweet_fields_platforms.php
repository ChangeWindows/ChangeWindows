<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTweetFieldsPlatforms extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('platforms', function (Blueprint $table) {
            $table->text('tweet_template')->nullable()->before('slug');
            $table->foreignId('tweet_stream_id')->nullable()->before('slug')->constrained('tweet_streams')->onDelete('set null');
            $table->foreignId('retweet_stream_id')->nullable()->before('slug')->constrained('tweet_streams')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('platforms', function (Blueprint $table) {
            $table->dropColumn('tweet_template');
            $table->dropColumn('tweet_stream_id');
            $table->dropColumn('retweet_stream_id');
        });
    }
}
