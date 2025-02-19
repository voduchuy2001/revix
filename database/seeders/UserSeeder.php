<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Võ Đức Huy',
            'email' => 'voduchuy2001@gmail.com',
            'password' => 'admin123@',
            'phone_number' => '0962785101',
            'address' => 'An Hòa, Ninh Kiều, Cần Thơ',
            'type' => UserType::USER->value,
            'super_user' => true,
        ]);
    }
}
