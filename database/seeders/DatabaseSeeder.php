<?php

namespace Database\Seeders;

use App\Models\Device;
use App\Models\RepairTicket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
          'name' => 'Võ Đức Huy',
          'email' => 'voduchuy2001@gmail.com',
        ]);

        $customers = User::factory()->count(10)->create([
          'type' => 'customer',
        ]);

        // Create multiple technicians
        $technicians = User::factory()->count(5)->create([
            'type' => 'technician',
        ]);

        // Create multiple devices (without user_id)
        $devices = Device::factory()->count(30)->create();

        // Create multiple repair tickets
        $devices->each(function ($device) use ($customers, $technicians) {
            RepairTicket::factory()->count(2)->create([
                'customer_id' => $customers->random()->id,
                'device_id' => $device->id,
                'technician_id' => $technicians->random()->id,
                'condition' => fake()->realText(191)
            ]);
        });
    }
}
