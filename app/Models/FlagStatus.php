<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlagStatus extends Model
{
    use HasFactory;

    public $searchableType = 'FlagStatus';

    protected $table = 'flag_status';
    protected $fillable = ['flag_id', 'feature_id', 'build', 'status'];

    public function flag() {
        return $this->belongsTo(Flag::class);
    }
}
