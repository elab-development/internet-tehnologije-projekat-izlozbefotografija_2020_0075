<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Dotenv\Exception\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try {
            $request->validate([
                "email" => "required|email|unique:newsletters,email",
            ], [
                "email.unique" => "Korisnik sa ovom email adresom je već prijavljen.",
            ]);

            $newsletter = Newsletter::create([
                "email" => $request->input('email'),
            ]);

            return response()->json(['message' => "Uspešno ste se prijavili na Newsletter.", 'data' => $newsletter]);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1062) {
                return response()->json(['error' => "Korisnik je već prijavljen."], 422);
            } else {
                return response()->json(['error' => "Došlo je do greške."], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Newsletter $newsletter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Newsletter $newsletter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Newsletter $newsletter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $newsletter = Newsletter::find($id);
 
        if (is_null($newsletter)) {
            
            return response()->json('Data not found', 404);
            
        } 
            $newsletter->delete();
            return response()->json(['message' => "Newsletter user successfully deleted!", 'data' => $newsletter]);
    }
}
