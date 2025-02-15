<?php

namespace App\Http\Controllers;

use App\Models\RepairTicket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $fromDate = $request->input('from')
            ? Carbon::parse($request->input('from'))->startOfDay()
            : Carbon::now()->startOfMonth();

        $toDate = $request->input('to')
            ? Carbon::parse($request->input('to'))->endOfDay()
            : Carbon::now()->endOfMonth();

        $tickets = RepairTicket::with(['customer', 'device', 'technician'])
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                      ->orWhere('phone_number', 'like', "%$search%");
                });
            })
            ->get();

        return Inertia::render('RepairTicket/Index', [
            'tickets' => $tickets,
            'filters' => $request->all('search', 'from', 'to'),
        ]);
    }

}
