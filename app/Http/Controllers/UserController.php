<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function getUser(GetUserRequest $request)
    {
        $users = User::whereIn('type', ['technician', 'user'])
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


    public function getCustomer(GetUserRequest $request)
    {
        $customers = User::where('type', 'customer')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('phone_number', 'like', "%{$search}%");
            })
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('User/Customer', [
            'customers' => $customers,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        User::create($data);
        return Redirect::back();
    }

    public function update(UpdateUserRequest $request, string|int $id): RedirectResponse
    {
        $data = $request->validated();
        $user = User::findOrFail($id);
        $user->update($data);
        return Redirect::back();
    }

    public function destroy(string|int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->delete();
        return Redirect::back();
    }
}
