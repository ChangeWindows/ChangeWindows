<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    public $searchableType = 'Flights';

    protected $table = 'flights';
    protected $fillable = ['major', 'minor', 'build', 'delta', 'release_channel_id', 'baseline_id'];
    protected $appends = ['edit_url', 'version', 'flight'];
    
    public function timeline() {
        return $this->morphOne(Timeline::class, 'timeline');
    }

    public function releaseChannels() {
        return $this->belongsTo(ReleaseChannel::class);
    }

    public function getFlightAttribute() {
        return $this->build.'.'.$this->delta;
    }

    public function getVersionAttribute() {
        return $this->major.'.'.$this->minor.'.'.$this->build.'.'.$this->delta;
    }

    public function getEditUrlAttribute() {
        return route('admin.flight.edit', $this, false);
    }
}
