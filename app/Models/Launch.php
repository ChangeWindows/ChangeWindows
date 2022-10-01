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

    public function timeline() {
        return $this->morphOne(Timeline::class, 'item');
    }

    public function release() {
        return $this->belongsTo(Release::class);
    }

    public function getPlatformAttribute() {
        return $this->release->platform;
    }
}
