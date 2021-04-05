<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReleaseChannel extends Model
{
    use HasFactory;

    protected $table = 'release_channels';
    protected $fillable = ['name', 'short_name', 'supported', 'channel_id', 'release_id'];
    protected $appends = ['edit_url'];

    public function channel() {
        return $this->belongsTo(Channel::class);
    }

    public function release() {
        return $this->belongsTo(Release::class);
    }

    public function flights() {
        return $this->hasMany(Flight::class);
    }

    public function platform() {
        return $this->hasOneThrough(Platform::class, Channel::class);
    }

    public function getEditUrlAttribute() {
        return route('admin.releasechannels.edit', $this, false);
    }
}
