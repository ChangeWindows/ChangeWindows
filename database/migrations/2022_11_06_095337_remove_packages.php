<?php

use App\Models\Release;
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
        $releases = Release::where('package', '=', 1)->get();

        foreach ($releases as $release) {
            foreach ($release->flights() as $flight) {
                $flight->timeline->delete();
                $flight->delete();
            }

            $release->delete();
        }

        Schema::table('releases', function (Blueprint $table) {
            $table->dropColumn('package');
        });
        Schema::table('platforms', function (Blueprint $table) {
            $table->dropColumn('tweet_template_package');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
