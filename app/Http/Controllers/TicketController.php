<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('user_id');

        $tickets = Ticket::where('user_id', $userId)->with('exhibition')->get();

        return response()->json(['tickets' => $tickets]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'exhibition_id' => 'required|exists:exhibitions,id',
            'date' => 'required|date',
            'person_count' => 'required|integer|min:1',
        ]);

        $ticket = new Ticket([
            'date' => $request->input('date'),
            'person_count' => $request->input('person_count'),
        ]);

        $ticket->user()->associate($request->input('user_id'));
        $ticket->exhibition()->associate($request->input('exhibition_id'));

        $ticket->save();

        return response()->json(['message' => 'Ticket reserved successfully.'], 201);
    }
}
