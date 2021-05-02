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
    protected $fillable = ['name', 'version', 'canonical_version', 'package', 'codename', 'description', 'changelog', 'platform_id', 'start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts', 'start_build', 'start_delta', 'end_build', 'end_delta'];
    protected $appends = ['url', 'edit_url', 'edit_changelog_url'];
    protected $dates = ['start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts'];

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
        return $this->package ? route('admin.packages.edit', $this, false) : route('admin.releases.edit', $this, false);
    }

    public function getEditChangelogUrlAttribute() {
        return $this->package ? route('admin.packages.changelog.edit', $this, false) : route('admin.releases.changelog.edit', $this, false);
    }

    public function getUrlAttribute() {
        return route('front.releases.show', $this, false);
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
