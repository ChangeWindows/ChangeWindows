<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Platform extends Model
{
    use HasFactory;
    use Sluggable;
    use HasRelationships;

    public $searchableType = 'Platforms';

    protected $table = 'platforms';
    protected $fillable = ['name', 'description', 'color', 'icon', 'position', 'legacy', 'active', 'tool', 'slug'];
    protected $appends = ['plain_icon', 'colored_icon', 'bg_color', 'edit_url'];

    public function channels() {
        return $this->hasMany(Channel::class);
    }

    public function releases() {
        return $this->hasMany(Release::class);
    }

    public function releaseChannels() {
        return $this->hasManyThrough(ReleaseChannel::class, Release::class);
    }

    public function flights() {
        return $this->hasManyDeepFromRelations($this->releaseChannels(), (new ReleaseChannel)->flights());
    }

    public function timeline() {
        return $this->hasManyDeepFromRelations($this->releaseChannels(), (new ReleaseChannel)->timeline());
    }

    public function getPlainIconAttribute() {
        return '<i class="far fa-fw fa-'.$this->icon.' '.$this->icon_modifiers.'"></i>';
    }

    public function getColoredIconAttribute() {
        return '<i style="color: '.$this->color.'" class="far fa-fw fa-'.$this->icon.' '.$this->icon_modifiers.'"></i>';
    }

    public function getBgColorAttribute() {
        return 'background-color: '.$this->color;
    }

    public function getEditUrlAttribute() {
        return route('admin.platforms.edit', $this, false);
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
