<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Release extends Model
{
    use HasFactory;
    use Sluggable;
    use HasRelationships;

    public $searchableType = 'Releases';

    protected $table = 'releases';
    protected $fillable = ['name', 'version', 'canonical_version', 'package', 'codename', 'description', 'changelog', 'platform_id', 'start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts', 'ongoing', 'start_build', 'start_delta', 'end_build', 'end_delta'];
    protected $appends = ['url', 'edit_url', 'edit_changelog_url'];
    protected $dates = ['start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts'];

    protected $casts = [
        'package' => 'integer',
        'ongoing' => 'integer',
        'start_preview' => 'date:Y-m-d',
        'start_public' => 'date:Y-m-d',
        'start_extended' => 'date:Y-m-d',
        'start_lts' => 'date:Y-m-d',
        'end_lts' => 'date:Y-m-d'
    ];

    public function platform() {
        return $this->belongsTo(Platform::class);
    }

    public function releaseChannels() {
        return $this->hasMany(ReleaseChannel::class);
    }

    public function launch() {
        return $this->hasOne(Launch::class);
    }

    public function flights() {
        return $this->hasManyDeepFromRelations($this->releaseChannels(), (new ReleaseChannel)->flights());
    }

    public function timeline() {
        return $this->hasManyDeepFromRelations($this->releaseChannels(), (new ReleaseChannel)->timeline());
    }

    public function getEditUrlAttribute() {
        if ($this->package) {
            return route('admin.packages.edit', $this, false);
        }

        return route('admin.releases.edit', $this, false);
    }

    public function getEditChangelogUrlAttribute() {
        if ($this->package) {
            return route('admin.packages.changelog.edit', $this, false);
        }

        return route('admin.releases.changelog.edit', $this, false);
    }

    public function getUrlAttribute() {
        if ($this->package) {
            return route('front.platforms.packages', ['release' => $this, 'platform' => $this->platform], false);
        }

        return route('front.platforms.releases', ['release' => $this, 'platform' => $this->platform], false);
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
