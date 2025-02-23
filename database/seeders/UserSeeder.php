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
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'Admintaocuoi',
            'phone_number' => '0962785101',
            'address' => 'Ninh Kiều, Cần Thơ',
            'type' => UserType::USER->value,
            'super_user' => true,
        ]);
    }
}
