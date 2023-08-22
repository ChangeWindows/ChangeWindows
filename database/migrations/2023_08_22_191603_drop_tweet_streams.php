<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('platforms', function (Blueprint $table) {
            $table->dropColumn('tweet_template');
            $table->dropColumn('tweet_stream_id');
            $table->dropColumn('retweet_stream_id');
        });

        Schema::dropIfExists('tweet_streams');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
