<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $setting = (object) [
            'name' => 'Trần Út - Táo Cười',
            'phone_number' => '085.222.7282',
            'address' => 'Số 333 Nguyễn Văn Linh, P.An Khánh, Q.Ninh Kiều, TPCT',
            'website' => 'https://taocuoi.vn',
            'branches' => [
                '333 Nguyễn Văn Linh, P.An Khánh, Q.Ninh Kiều, TPCT',
                '08 Đường CMT8, P.Cái Khế, Q.Ninh Kiều, TPCT',
                'Gành Hào, Đông Hải, Bạc Liêu',
                '196 Phú Lợi, Khóm 3, Phường 2, TP. Sóc Trăng'
            ]
        ];

        Setting::create([
            'key' => 'info',
            'value' => json_encode($setting, JSON_UNESCAPED_UNICODE) // Chuyển object thành JSON để lưu vào DB
        ]);
    }

}
