<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Baseline extends Model
{
    use HasFactory;
    use Sluggable;

    public $searchableType = 'Baseline';

    protected $table = 'baselines';
    protected $fillable = ['name', 'start_build', 'end_build'];
    protected $appends = ['edit_url'];
    protected $dates = ['start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts'];

    public function releaseChannels() {
        return $this->hasMany(Flights::class);
    }

    public function getEditUrlAttribute() {
        return route('admin.baseline.edit', $this, false);
    }

    public function getRouteKeyName() {
        return 'slug';
    }

    public function sluggable() {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
