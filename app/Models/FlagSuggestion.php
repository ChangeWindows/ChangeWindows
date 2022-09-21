<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlagSuggestion extends Model
{
    use HasFactory;

    protected $table = 'flag_suggestions';
    protected $fillable = ['name', 'flag_id', 'description', 'status'];

    public function flag()
    {
        return $this->belongsTo(Flag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
