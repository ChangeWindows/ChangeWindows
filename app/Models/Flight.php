<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    public $searchableType = 'Flights';

    protected $table = 'flights';
    protected $fillable = ['major', 'minor', 'build', 'delta', 'date', 'release_channel_id'];
    protected $appends = ['version', 'flight'];

    public function releaseChannel() {
        return $this->belongsTo(ReleaseChannel::class);
    }

    public function release() {
        return $this->hasManyThrough(Release::class, ReleaseChannel::class);
    }

    public function getPlatformAttribute() {
        return $this->releaseChannel->release->platform;
    }

    public function getFlightAttribute() {
        return $this->build.'.'.$this->delta;
    }

    public function getVersionAttribute() {
        return $this->major.'.'.$this->minor.'.'.$this->build.'.'.$this->delta;
    }
}
