<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Http\Requests\GetUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function getUsers(GetUserRequest $request)
    {
        $users = User::where('type', UserType::USER->value)
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('phone_number', 'like', "%{$search}%");
            })
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('User/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }


    public function getCustomers(GetUserRequest $request)
    {
        $customers = User::where('type', UserType::CUSTOMER->value)
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('phone_number', 'like', "%{$search}%");
            })
            ->with([
                'repairTickets',
                'repairTickets.customer',
                'repairTickets.device',
                'repairTickets.branch',
            ])
            ->orderByDesc('created_at')
            ->get();

        $setting = Setting::where('key', 'info')->first();

        return Inertia::render('User/Customer', [
            'customers' => $customers,
            'setting' => json_decode($setting->value),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if ($data['type'] === UserType::USER->value && !Auth::user()->isSuperUser()) {
            abort(403);
        }

        $user = User::create($data);

        return Redirect::back()->with(['user' => $user]);
    }

    public function update(UpdateUserRequest $request, string|int $id): RedirectResponse
    {
        $data = $request->validated();
        $data = $request->validated();
        if ($data['type'] === UserType::USER->value && !Auth::user()->isSuperUser()) {
            abort(403);
        }

        $user = User::findOrFail($id);
        $user->update($data);
        return Redirect::back();
    }

    public function destroy(string|int $id): RedirectResponse
    {
        if (!Auth::user()->isSuperUser() || Auth::id() === (int) $id) {
            return Redirect::back()->withErrors('Bạn không thể thực hiện hành động này.');
        }

        $user = User::findOrFail($id);
        $user->delete();
        return Redirect::back();
    }
}
