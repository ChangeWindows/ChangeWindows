<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class Feature extends Model implements Searchable
{
    use HasFactory;
    use Sluggable;
    use HasRelationships;

    public $searchableType = 'Feature';

    protected $table = 'features';
    protected $fillable = ['f_name'];

    public function featureStatus()
    {
        return $this->hasMany(FeatureStatus::class);
    }

    public function featureContents()
    {
        return $this->hasMany(FeatureContent::class);
    }

    public function latestContents()
    {
        return $this->hasOne(FeatureContent::class)->where('status', 2)->orderBy('updated_at', 'desc')->latest();
    }

    public function latestStatus()
    {
        return $this->hasOne(FeatureStatus::class)->orderBy('build', 'desc')->latest();
    }

    public function latestStatusChange()
    {
        return $this->hasMany(FeatureStatus::class)->orderBy('build', 'desc');
    }

    public static function findOrCreate($f_name, $data)
    {
        $real = static::where('f_name', $f_name)->first();

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
                'source' => 'f_name'
            ]
        ];
    }

    public function getSearchResult(): SearchResult
    {
        return new \Spatie\Searchable\SearchResult(
            $this,
            $this->feature_name,
            route('front.features.show', $this)
        );
    }
}
