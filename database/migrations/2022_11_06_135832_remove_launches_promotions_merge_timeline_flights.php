<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Flight;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('launches');
        Schema::dropIfExists('promotions');

        Schema::table('flights', function (Blueprint $table) {
            $table->dateTime('date')->nullable()->after('delta');
        });

        foreach(Flight::get() as $flight) {
            $flight->update([
                'date' => $flight->timeline->date
            ]);
        }

        Schema::dropIfExists('timeline');
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
