<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArtworkResource;
use App\Models\Artwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArtworkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $artworks = Artwork::all();
        return $artworks;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "title"=>"required|string|max:255",
            "artist"=>"required|string|max:255",
            "artwork_image"=>"image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $artwork = Artwork::create([
            "title"=>$request->title,
            "artist"=>$request->artist,
            "artwork_image"=>$request->artwork_image,
        ]);
        return response()->json(['Artwork created successfully!', new ArtworkResource($artwork)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Artwork $artwork)
    {
        return new ArtworkResource($artwork);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artwork $artwork)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artwork $artwork)
    {
        $validator = Validator::make($request->all(),[
            "title"=>"string|max:255",
            "artist"=>"string|max:255",
            "artwork_image"=>"image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $artwork->title = $request->input('title', $artwork->title);
        $artwork->artist = $request->input('artist', $artwork->artist);
        $artwork->artwork_image = $request->input('artwork_image', $artwork->artwork_image);

        $artwork->save();

        return response()->json(['message' => 'Artwork updated successfully', 'data' => new ArtworkResource($artwork)]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $artwork = Artwork::find($id);
 
        if (is_null($artwork)) {
            
            return response()->json('Data not found', 404);
            
        } 
            $artwork->delete();
            return response()->json(['message' => "Artwork successfully deleted!", 'data' => $artwork]);
    }

    public function uploadImage(Request $request, $id)
    {
        // Validacija zahteva
        $request->validate([
            'artwork_image' => 'required|image|mimes:jpeg,png,jpg,gif,tiff|max:2048', 
        ]);

        try {
            // Trazi delo po id-ju
            $artwork = Artwork::findOrFail($id);

            // Fajl se cuva u 'artwork_images' direktorijumu
            $path = $request->file('artwork_image')->store('public/artwork_images');

            // Update u koloni artwork_image za odabrano delo
            $artwork->update(['artwork_image' => $path]);

            
            return response()->json(['message' => 'Artwork image uploaded successfully']);

        } catch (\Exception $e) {
            
            return response()->json(['error' => 'Failed to upload artwork image', 'message' => $e->getMessage()], 500);
        }
    }
}
