<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExhibitionCollection;
use App\Http\Resources\ExhibitionResource;
use App\Models\Exhibition;
use Illuminate\Support\Facades\Validator;
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
        $validator = Validator::make($request->all(),[
            "name"=>"required|string|max:255",
            "start_date"=>"required|date",
            "end_date"=>"required|date",
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $exhibition = Exhibition::create([
            "name"=>$request->name,
            "start_date"=>$request->start_date,
            "end_date"=>$request->end_date,
        ]);
        return response()->json(['Exhibition created successfully', new ExhibitionResource($exhibition)]);
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
        // Validacija
        $validator = Validator::make($request->all(), [
            "name" => "string|max:255",
            "start_date" => "date",
            "end_date" => "date|after_or_equal:start_date",
        ]);

        // Provera da li je validacija neuspešna
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Ažuriranje podataka
        $exhibition->name = $request->name;
       // $exhibition->name = $request->input('name', $exhibition->name); // Ako nije poslat 'name', zadržava postojeću vrednost
        $exhibition->start_date = $request->input('start_date', $exhibition->start_date);
        $exhibition->end_date = $request->input('end_date', $exhibition->end_date);

        // Čuvanje izmena
        $exhibition->save();

        // Vraćanje odgovora
        return response()->json(['message' => 'Exhibition updated successfully', 'data' => new ExhibitionResource($exhibition)]);
        }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exhibition $exhibition)
    {
        $exhibition->delete();
        return response()->json("Exhibition deleted successfully!");
    }
}
