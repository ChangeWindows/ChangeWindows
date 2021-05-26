<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;

    protected $table = 'timeline';
    protected $fillable = ['date', 'item_id', 'item_type'];

    public function item() {
        return $this->morphTo();
    }

    public function flight() {
        return $this->belongsTo(Flight::class, 'item_id')->whereItemType(Flight::class);
    }

    public function promotion() {
        return $this->belongsTo(Promotion::class, 'item_id')->whereItemType(Promotion::class);
    }

    public function launch() {
        return $this->belongsTo(Launch::class, 'item_id')->whereItemType(Launch::class);
    }
}
