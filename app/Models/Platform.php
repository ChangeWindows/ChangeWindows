<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class Platform extends Model implements Searchable
{
    use Sluggable;
    use HasFactory;

    public $searchableType = 'Platforms';

    protected $table = 'platforms';
    protected $fillable = ['name', 'color', 'icon', 'position', 'active', 'slug'];
    protected $appends = ['plain_icon', 'colored_icon'];

    public function getPlainIconAttribute() {
        return '<i class="far fa-fw fa-'.$this->icon.' '.$this->icon_modifiers.'"></i>';
    }

    public function getColoredIconAttribute() {
        return '<i style="color: '.$this->color.'" class="far fa-fw fa-'.$this->icon.' '.$this->icon_modifiers.'"></i>';
    }

    public function getBgColorAttribute() {
        return 'background-color: '.$this->color;
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

    public function getSearchResult(): SearchResult {
        // $url = route('admin.platforms.edit', $this);
        $url = route('home'); // TODO: update route

        return new SearchResult(
            $this,
            $this->name,
            $url
        );
    }
}
