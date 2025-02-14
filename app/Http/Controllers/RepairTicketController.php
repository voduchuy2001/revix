<?php

namespace App\Http\Controllers;

use App\Models\RepairTicket;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketController extends Controller
{
    public function index(): Response
    {
        $tickets = RepairTicket::with([
            'customer',
            'device',
            'technician',
        ])->paginate(100);

        return Inertia::render('RepairTicket/Index', [
            'tickets' => $tickets
        ]);
    }
}
