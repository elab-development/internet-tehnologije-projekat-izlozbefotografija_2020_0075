<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Confirmation</title>
</head>
<body>
    <h1>Atelier Artisan</h1>
    <h2>Ticket Confirmation</h2>
    
    <p><strong>Ticket ID:</strong> {{ $ticket->id }}</p>
    <p><strong>Date:</strong> {{ $ticket->date }}</p>
    <p><strong>Person Count:</strong> {{ $ticket->person_count }}</p>

    

    <p>Thank you for reserving your ticket!</p>
</body>
</html>