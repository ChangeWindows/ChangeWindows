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
    protected $appends = ['bg_color', 'edit_url'];

    public function platform() {
        return $this->belongsTo(Platform::class);
    }

    public function getBgColorAttribute() {
        return 'background-color: '.$this->color;
    }

    public function getEditUrlAttribute() {
        return route('admin.channels.edit', $this, false);
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
