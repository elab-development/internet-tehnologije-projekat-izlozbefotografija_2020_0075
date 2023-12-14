<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'person_count'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function exhibition() {
        return $this->belongsTo(Exhibition::class);
    }
}
