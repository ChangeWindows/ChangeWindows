<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Platform extends Model
{
    use HasFactory;
    use HasSlug;
    use HasRelationships;

    public $searchableType = 'Platforms';

    protected $table = 'platforms';
    protected $fillable = ['name', 'description', 'color', 'icon', 'position', 'legacy', 'active', 'tool', 'tweet_template', 'tweet_stream_id', 'retweet_stream_id', 'slug'];
    protected $appends = ['bg_color'];

    protected $casts = [
        'legacy' => 'integer',
        'active' => 'integer',
        'tool' => 'integer',
        'position' => 'integer'
    ];

    public function channels() {
        return $this->hasMany(Channel::class);
    }

    public function activeChannels() {
        return $this->hasMany(Channel::class)->where('active', 1);
    }

    public function releases() {
        return $this->hasMany(Release::class)->with('releaseChannels');
    }

    public function tweetStream() {
        return $this->belongsTo(TweetStream::class);
    }

    public function retweetStream() {
        return $this->belongsTo(TweetStream::class, 'retweet_stream_id');
    }

    public function releaseChannels() {
        return $this->hasManyThrough(ReleaseChannel::class, Release::class);
    }

    public function flights() {
        return $this->hasManyDeepFromRelations($this->releaseChannels(), (new ReleaseChannel)->flights());
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

    public function getRouteKeyName() {
        return 'slug';
    }
}
