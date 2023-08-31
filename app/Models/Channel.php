<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Channel extends Model
{
    use HasFactory;
    use HasSlug;

    protected $table = 'channels';
    protected $fillable = ['name', 'color', 'order', 'active', 'platform_id', 'slug'];
    protected $appends = ['bg_color'];

    protected $casts = [
        'active' => 'integer',
        'order' => 'integer'
    ];

    public function platform() {
        return $this->belongsTo(Platform::class);
    }

    public function releaseChannels() {
        return $this->hasMany(ReleaseChannel::class);
    }

    public function activeReleaseChannels() {
        return $this->hasMany(ReleaseChannel::class)->whereHas('flights')->with('release');
    }

    public function getBgColorAttribute() {
        return 'background-color: '.$this->color;
    }

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
