<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function getUser() {
        $users = User::where('type', 'technician')
        ->orWhere('type', 'user')
        ->orderByDesc('created_at')->get();

        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function getCustomer() {
        $users = User::where('type', 'customer')
        ->orderByDesc('created_at')->get();
        
        return Inertia::render('Users/Customer', ['users' => $users]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        User::create($data);
        return Redirect::back();
    }

    public function update(StoreUserRequest $request, string|int $id): RedirectResponse
    {
        $data = $request->validated();
        $user = User::findOrFail($id);
        $user->update($data);
        return Redirect::back();
    }
}
