<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowingResource;
use App\Models\Showing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $showings = Showing::all();
        return $showings;
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
        $validator = Validator::make($request->all(), [
            'artwork_id'=>'required|exists:artworks,id',
            'exhibition_id' => 'required|exists:exhibitions,id',
        ]);

        if($validator->fails()){
            return response()->json([$validator->errors(), 'success'=>false]);
        }

        $showing = Showing::create([
            'artwork_id' => $request->input('artwork_id'),
            'exhibition_id' => $request->input('exhibition_id'),
        ]);

        return response()->json(['message'=>'Showing successfully saved.', 'data'=>$showing, 'success'=>true]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Showing $showing)
    {
        return new ShowingResource($showing);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Showing $showing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Showing $showing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $showing = Showing::find($id);
        if (is_null($showing)) {
            return response()->json(['message' => "Showing not found.", 'data' => $id, 'success'=> false]);
        }

        $showing->delete();
        return response()->json(['message' => "Showing successfully deleted!", 'data' => $showing, 'success'=> true]);
    }
}
