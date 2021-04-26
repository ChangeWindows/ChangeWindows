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
    protected $appends = ['edit_url', 'url'];
    
    public function timeline() {
        return $this->morphOne(Timeline::class, 'entry');
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

    public function getUrlAttribute() {
        return route('front.releases.show', $this->release, false);
    }

    public function getEditUrlAttribute() {
        //return route('admin.promotions.edit', $this, false);
    }
}
