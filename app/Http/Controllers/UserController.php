<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function store(CreateUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        User::create($data);
        return Redirect::back();
    }
}
