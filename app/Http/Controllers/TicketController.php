<?php

namespace App\Http\Controllers;

use App\Models\Exhibition;
use App\Models\Ticket;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use App\Http\Resources\TicketResource;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('user_id');

        if ($userId) {
            $tickets = Ticket::where('user_id', $userId)->with('exhibition')->get();
        } else {
            $tickets = Ticket::all();
        }

        return response()->json(['tickets' => $tickets]);
    }

    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);
        return new TicketResource($ticket);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'exhibition_id' => 'required|exists:exhibitions,id',
            'date' => [
                'required',
                function ($attribute, $value, $fail) use ($request) {
                    $exhibition = Exhibition::find($request->input('exhibition_id'));
    
                    $startDate = new DateTime($exhibition->start_date);
                    $endDate = new DateTime($exhibition->end_date);
                    $selectedDate = new DateTime($value);
    
                    if ($selectedDate < $startDate || $selectedDate > $endDate) {
                        $fail('Selected date is outside the valid range.');
                    }
                },
            ],
            'person_count' => 'required|integer|min:1',
        ]);

        $ticket = new Ticket([
            'date' => $request->input('date'),
            'person_count' => $request->input('person_count'),
        ]);

        $ticket->user()->associate($request->input('user_id'));
        $ticket->exhibition()->associate($request->input('exhibition_id'));

        $ticket->save();

         // Generise PDF za kartu
         $pdf = PDF::loadView('ticket', compact('ticket'));

         // Cuva PDF u storage
         $pdfPath = 'public/tickets/' . $ticket->id . '_confirmation.pdf';
         Storage::put($pdfPath, $pdf->output());

        return response()->json(['message' => 'Ticket reserved successfully.'], 201);
    }

        public function generatePDF($ticketId)
    {
        
        $ticket = Ticket::findOrFail($ticketId);

        $pdf = PDF::loadView('ticket', compact('ticket'));
        
        return $pdf->download('ticket_confirmation.pdf');
    }

}
