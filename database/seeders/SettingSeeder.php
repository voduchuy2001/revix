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
            'name' => 'TRUNG TÂM SỬA CHỮA ĐIỆN THOẠI TRẦN ÚT - TÁO CƯỜI',
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
            'facebook' => 'https://www.facebook.com/suachuadienthoaididongcantho'
        ];

        Setting::create([
            'key' => 'info',
            'value' => json_encode($setting, JSON_UNESCAPED_UNICODE) // Chuyển object thành JSON để lưu vào DB
        ]);
    }

}
