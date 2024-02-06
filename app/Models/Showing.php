<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showing extends Model
{
    use HasFactory;

    protected $fillable = [
        'artwork_id',
        'exhibition_id'
    ];

    public function exhibitions() {
        return $this->belongsTo(Exhibition::class);
    }

    public function artworks() {
        return $this->belongsTo(Artwork::class);
    }
}
