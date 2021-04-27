<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Launch extends Model
{
    use HasFactory;

    public $searchableType = 'Launches';

    protected $table = 'launches';
    protected $fillable = ['release_id'];
    protected $appends = ['edit_url', 'url'];
    
    public function timeline() {
        return $this->morphOne(Timeline::class, 'item');
    }

    public function release() {
        return $this->belongsTo(Release::class);
    }

    public function getPlatformAttribute() {
        return $this->release->platform;
    }

    public function getUrlAttribute() {
        return route('front.releases.show', $this->release, false);
    }

    public function getEditUrlAttribute() {
        //return route('admin.launches.edit', $this, false);
    }
}
