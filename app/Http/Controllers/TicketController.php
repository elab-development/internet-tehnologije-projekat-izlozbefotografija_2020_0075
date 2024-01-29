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
}
