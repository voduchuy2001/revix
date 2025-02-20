<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $setting = (object) [
            'type' => 'TRUNG TÂM SỬA CHỮA ĐIỆN THOẠI',
            'name' => 'TRẦN ÚT - TÁO CƯỜI',
            'phone_number' => '085.222.7282',
            'address' => 'Số 333 Nguyễn Văn Linh, P.An Khánh, Q.Ninh Kiều, TPCT',
            'website' => 'https://taocuoi.vn',
            'policies' => [
                'Biên nhận có giá trị trong vòng 30 ngày. Khách hàng làm
                    mất biên nhận vui lòng liên hệ cửa hàng trong thời gian
                    sớm nhất.',
                'Màn zin bảo hành cảm ứng 1 tháng. Không bảo hành đối
                    với trường hợp: rơi, vỡ, sọc, đốm, vô nước...'
            ],
            'branches' => [
                '333 Nguyễn Văn Linh, P.An Khánh, Q.Ninh Kiều, TPCT',
                '08 Đường CMT8, P.Cái Khế, Q.Ninh Kiều, TPCT',
                'Gành Hào, Đông Hải, Bạc Liêu',
                '196 Phú Lợi, Khóm 3, Phường 2, TP. Sóc Trăng'
            ],
            'support_phone_number' => '0918.677.708',
            'facebook' => 'https://www.facebook.com/suachuadienthoaididongcantho',
            'zalo' => '',
            'gmail' => '',
            'youtube' => '',
            'instagram' => '',
            'twitter' => '',
            'linkedin' => '',
            'pinterest' => '',
            'tiktok' => '',
            'whatsapp' => '',
            'telegram' => '',
            'viber' => '',
            'line' => ''
        ];

        Setting::create([
            'key' => 'info',
            'value' => json_encode($setting, JSON_UNESCAPED_UNICODE) // Chuyển object thành JSON để lưu vào DB
        ]);
    }

}
