<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureStatus extends Model
{
    use HasFactory;

    public $searchableType = 'FeatureStatus';

    protected $table = 'feature_status';
    protected $fillable = ['feature_id', 'f_id', 'build', 'status'];

    public function feature() {
        return $this->belongsTo(Feature::class);
    }
}
