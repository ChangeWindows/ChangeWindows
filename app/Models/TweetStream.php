<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TweetStream extends Model
{
    use HasFactory;

    public $searchableType = 'Tweet Stream';

    protected $table = 'tweet_streams';
    protected $fillable = ['name', 'account', 'consumer_key', 'consumer_secret', 'access_token', 'access_token_secret'];
    protected $appends = ['edit_url'];

    public function getEditUrlAttribute() {
        return route('admin.platforms.edit', $this, false);
    }
}
