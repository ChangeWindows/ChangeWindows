<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use URL;

class Platform extends Model
{
    use HasFactory;
    use Sluggable;

    public $searchableType = 'Platforms';

    protected $table = 'platforms';
    protected $fillable = ['name', 'description', 'color', 'icon', 'position', 'legacy', 'active', 'tool', 'slug'];
    protected $appends = ['plain_icon', 'colored_icon', 'bg_color', 'edit_url'];

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
        return URL::route('admin.platforms.edit', $this);
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
