<?php

namespace App\Http\Controllers;

use App\Models\Exhibition;
use Illuminate\Http\Request;

class ExhibitionTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exhibitions = Exhibition::all();
        return $exhibitions;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $exhibition = Exhibition::find($id);
        if (is_null($exhibition)) {
            return response()->json('Data Not Found', 404);
        }
        return  response()->json($exhibition);
    }
}
