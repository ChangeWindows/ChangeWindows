<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Channel extends Model
{
    use HasFactory;
    use Sluggable;

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

    public function getRouteKeyName() {
        return 'slug';
    }

    public function sluggable(): array {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
