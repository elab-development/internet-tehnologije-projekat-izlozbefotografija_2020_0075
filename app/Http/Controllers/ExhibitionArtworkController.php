<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\Showing;
use Illuminate\Http\Request;

class ExhibitionArtworkController extends Controller
{
    public function index($exhibition_id)
    {
        $showings = Showing::get()->where('exhibition_id', $exhibition_id);
        if (is_null($showings)) {
            return response()->json('Data not found', 404);
        }

        $artworks = array();

        $artworks = Artwork::whereIn('id', $showings->pluck('artwork_id'))->get();

        // foreach($showings as $showing) {
        //     $artwork = Artwork::get()->where('id', $showing->artwork_id);
        //     array_push($artworks, $artwork);
        // }
        
        $formattedArtworks = $artworks->map(function ($artwork) {
            return [
                'id' => $artwork->id,
                'title' => $artwork->title,
                'artist' => $artwork->artist,
                'created_at' => $artwork->created_at,
                'updated_at' => $artwork->updated_at,
                'artwork_image' => $artwork->artwork_image,
            ];
        });
    
        return response()->json($formattedArtworks);
    }
}
