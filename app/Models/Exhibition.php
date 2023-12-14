<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exhibition extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
    ];

    public function tickets() {
        return $this->hasMany(Ticket::class);
    }

    public function artworks() {
        return $this->hasMany(Showing::class);
    }
}
