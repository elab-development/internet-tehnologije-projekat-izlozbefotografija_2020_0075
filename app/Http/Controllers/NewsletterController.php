<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Dotenv\Exception\ValidationException;
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
        } catch (ValidationException $e) {
            /*
            if ($e->validator->errors()->has('email')) {
                return response()->json(['error' => "Korisnik sa ovom email adresom je već prijavljen."], 422);
            }
            */
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
    public function destroy(Newsletter $newsletter)
    {
        //
    }
}
