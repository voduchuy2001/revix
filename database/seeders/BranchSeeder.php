<?php

namespace Database\Seeders;

use App\Models\Branch;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            [
                'name' => 'Chi nhánh 1',
                'address' => 'Số 333 Nguyễn Văn Linh, Q. Ninh Kiều, TP. Cần Thơ',
                'phone_number' => '085.222.7282',
                'email' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Chi nhánh 2',
                'address' => 'Số 08 CMT8, P. Cái Khế, Q. Ninh Kiều, TP. Cần Thơ',
                'phone_number' => '085.222.7288',
                'email' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        Branch::insert($branches);
    }
}
