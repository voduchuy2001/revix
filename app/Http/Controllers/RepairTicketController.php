<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetRepairTicketRequest;
use App\Models\RepairTicket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketController extends Controller
{
    public function index(GetRepairTicketRequest $request): Response
    {
        $tickets = RepairTicket::with(['customer', 'device', 'technician'])
            ->whereBetween('created_at', [$request->input('from'), $request->input('to')])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('phone_number', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('RepairTicket/Index', [
            'tickets' => $tickets,
            'filters' => $request->only(['search', 'from', 'to']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('RepairTicket/Create');
    }

    public function store()
    {
    }

    public function destroy(string|int $id): RedirectResponse
    {
        $ticket = RepairTicket::findOrFail($id);
        $ticket->device->delete();
        $ticket->delete();
        return Redirect::back();
    }
}
