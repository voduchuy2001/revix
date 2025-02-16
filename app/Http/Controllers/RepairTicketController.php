<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetRepairTicketRequest;
use App\Http\Requests\StoreRepairTicketRequest;
use App\Models\Device;
use App\Models\RepairTicket;
use App\Models\Setting;
use App\Models\User;
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
        $customers = User::query()
            ->where('type', 'customer')
            ->orderByDesc('created_at')
            ->get();

        $technicians = User::query()
            ->where('type', 'customer')
            ->orderByDesc('created_at')
            ->get();

        $setting = Setting::where('key', 'info')->first();

        return Inertia::render('RepairTicket/Create', [
            'customers' => $customers,
            'technicians' => $technicians,
            'setting' =>  json_decode($setting->value)
        ]);
    }

    public function store(StoreRepairTicketRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $device = Device::create([
            'code' => $data['imei'],
            'name' => $data['device_name'],
        ]);

        RepairTicket::create([
            'device_id' => $device->id,
            'customer_id' => $data['customer'],
            'technician_id' => $data['technician'],
            'amount' => $data['amount'],
            'condition' => $data['device_status'],
            'note' => $data['note'],
        ]);

        return Redirect::route('repair_ticket.index');
    }

    public function destroy(string|int $id): RedirectResponse
    {
        $ticket = RepairTicket::findOrFail($id);
        $ticket->delete();
        return Redirect::back();
    }
}
