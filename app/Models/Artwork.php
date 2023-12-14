<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'artist', 
    ];

    public function showings() {
        return $this->hasMany(Showing::class);
    }
}
