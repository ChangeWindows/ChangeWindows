<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureContent extends Model
{
    use HasFactory;

    protected $table = 'feature_contents';
    protected $fillable = ['name', 'feature_id', 'description', 'status', 'user_id'];

    public function feature()
    {
        return $this->belongsTo(Feature::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
