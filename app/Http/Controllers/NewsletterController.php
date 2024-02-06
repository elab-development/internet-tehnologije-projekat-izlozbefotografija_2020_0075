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
        $newsletters = Newsletter::all();
        return $newsletters;
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
                "email.unique" => "User with this email already exists!",
            ]);

            $newsletter = Newsletter::create([
                "email" => $request->input('email'),
            ]);

            return response()->json(['message' => "You have successfully subscribed to our Newsletter.", 'data' => $newsletter]);
        } catch (\Exception $e) {
                return response()->json(['error' => "Failed to subscribe!", 'message' => $e->getMessage()], 500);
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
