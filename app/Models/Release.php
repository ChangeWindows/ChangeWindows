<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Release extends Model
{
    use HasFactory;
    use Sluggable;

    public $searchableType = 'Releases';

    protected $table = 'releases';
    protected $fillable = ['name', 'version', 'canonical_version', 'codename', 'description', 'changelog', 'platform_id', 'start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts', 'start_build', 'start_delta', 'end_build', 'end_delta'];
    protected $appends = ['edit_url'];
    protected $dates = ['start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts'];

    public function platform() {
        return $this->belongsTo(Platform::class);
    }

    public function getEditUrlAttribute() {
        return route('admin.releases.edit', $this, false);
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
