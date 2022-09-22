<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlagContent extends Model
{
    use HasFactory;

    protected $table = 'flag_contents';
    protected $fillable = ['name', 'flag_id', 'description', 'status', 'user_id'];

    public function flag()
    {
        return $this->belongsTo(Flag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
