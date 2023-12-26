<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExhibitionCollection;
use App\Http\Resources\ExhibitionResource;
use App\Models\Exhibition;
use Illuminate\Http\Request;

class ExhibitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exhibitions = Exhibition::all();
        return new ExhibitionCollection($exhibitions);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Exhibition $exhibition)
    {
        return  new ExhibitionResource($exhibition);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exhibition $exhibition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exhibition $exhibition)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exhibition $exhibition)
    {
        //
    }
}
