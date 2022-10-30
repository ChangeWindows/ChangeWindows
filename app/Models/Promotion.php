<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    public $searchableType = 'Promotions';

    protected $table = 'promotions';
    protected $fillable = ['release_channel_id'];

    public function timeline() {
        return $this->morphOne(Timeline::class, 'item');
    }

    public function releaseChannel() {
        return $this->belongsTo(ReleaseChannel::class);
    }

    public function getReleaseAttribute() {
        return $this->releaseChannel->release;
    }

    public function getPlatformAttribute() {
        return $this->releaseChannel->release->platform;
    }
}
