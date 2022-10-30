<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class Flag extends Model implements Searchable
{
    use HasFactory;
    use Sluggable;
    use HasRelationships;

    public $searchableType = 'Flag';

    protected $table = 'flags';
    protected $fillable = ['feature_name', 'added', 'removed'];

    public function flagStatus()
    {
        return $this->hasMany(FlagStatus::class);
    }

    public function flagContents()
    {
        return $this->hasMany(FlagContent::class);
    }

    public function latestContents()
    {
        return $this->hasOne(FlagContent::class)->where('status', 2)->orderBy('updated_at', 'desc')->latest();
    }

    public function latestStatus()
    {
        return $this->hasOne(FlagStatus::class)->orderBy('build', 'desc')->latest();
    }

    public function latestStatusChange()
    {
        return $this->hasMany(FlagStatus::class)->orderBy('build', 'desc');
    }

    public static function findOrCreate($feature_name, $data)
    {
        $real = static::where('feature_name', $feature_name)->first();

        if (is_null($real)) {
            return static::create($data);
        } else {
            return $real;
        }
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'feature_name'
            ]
        ];
    }

    public function getSearchResult(): SearchResult
    {
        return new \Spatie\Searchable\SearchResult(
            $this,
            $this->feature_name,
            route('front.flags.show', $this)
        );
    }
}
