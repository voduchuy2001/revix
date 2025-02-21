<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetRepairTicketRequest;
use App\Http\Requests\StoreRepairTicketRequest;
use App\Http\Requests\UpdateRepairTicketRequest;
use App\Models\Device;
use App\Models\RepairTicket;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketController extends Controller
{
    public function index(GetRepairTicketRequest $request): Response
    {
        $tickets = RepairTicket::with(['customer', 'device'])
            ->when($request->filled('from') && !$request->filled('to'), function ($query) use ($request) {
                $query->where('created_at', '>=', $request->input('from'));
            })
            ->when($request->filled('to') && !$request->filled('from'), function ($query) use ($request) {
                $query->where('created_at', '<=', $request->input('to'));
            })
            ->when($request->filled(['from', 'to']), function ($query) use ($request) {
                $query->whereBetween('created_at', [$request->input('from'), $request->input('to')]);
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->get();

        $setting = Setting::where('key', 'info')->first();

        return Inertia::render('RepairTicket/Index', [
            'tickets' => $tickets,
            'filters' => $request->only(['search', 'from', 'to']),
            'setting' => json_decode($setting->value),
        ]);
    }

    public function create(): Response
    {
        $customers = User::query()
            ->where('type', 'customer')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('RepairTicket/Create', [
        'customers' => $customers,
        ]);
    }

    public function store(StoreRepairTicketRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::beginTransaction();
        try {
            $device = Device::create([
                'code' => $data['imei'],
                'name' => $data['device_name'],
            ]);

            $repairTicket = RepairTicket::create([
                'device_id' => $device->id,
                'customer_id' => $data['customer'],
                'technician' => $data['technician'],
                'amount' => $data['amount'],
                'condition' => $data['condition'],
                'note' => $data['note'],
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);

            DB::commit();

            return $request['action']
                ? Redirect::route('repair_ticket.print', ['id' => $repairTicket->id])
                : Redirect::route('repair_ticket.index');
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return Redirect::back();
        }
    }

    public function destroy(string|int $id): RedirectResponse
    {
        if (!Auth::user()->isSuperUser()) {
            return Redirect::back()->withErrors('Bạn không thể thực hiện hành động này.');
        }

        $ticket = RepairTicket::findOrFail($id);
        $ticket->delete();

        return Redirect::back();
    }

    public function print(string|int $id): Response
    {
        $ticket = RepairTicket::with(['customer', 'device'])->findOrFail($id);

        $setting = Setting::where('key', 'info')->first();

        return Inertia::render('RepairTicket/Print', [
            'ticket' => $ticket,
            'setting' => json_decode($setting->value),
        ]);
    }

    public function edit(string|int $id): Response
    {
        $ticket = RepairTicket::with(['customer', 'device'])->findOrFail($id);
        $customers = User::query()
            ->where('type', 'customer')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('RepairTicket/Edit', [
            'ticket' => $ticket,
            'customers' => $customers,
        ]);
    }

    public function update(UpdateRepairTicketRequest $request, string|int $id): RedirectResponse
    {
        $data = $request->validated();

        DB::beginTransaction();
        try {
            $ticket = RepairTicket::findOrFail($id);
            $ticket->load('device');

            $device = $ticket->device;

            if ($device) {
                $device->update([
                    'code' => $data['imei'],
                    'name' => $data['device_name'],
                ]);
            }

            $ticket->update([
                'device_id' => $device->id,
                'customer_id' => $data['customer'],
                'technician' => $data['technician'],
                'amount' => $data['amount'],
                'condition' => $data['condition'],
                'note' => $data['note'],
                'updated_by' => Auth::id(),
            ]);

            DB::commit();

            return Redirect::back();
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return Redirect::back()->withErrors(['error' => 'Có lỗi xảy ra!']);
        }
    }
}
