<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairTicket extends Model
{
    use HasFactory;

    protected $table = 'repair_tickets';

    protected $fillable = [
        'customer_id',
        'device_id',
        'technician_id',
        'code',
        'amount',
        'note',
        'status',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($ticket) {
            $latestCode = self::where('code', 'LIKE', '#%')->orderByDesc('code')->value('code');
            $number = $latestCode ? intval(substr($latestCode, 1)) + 1 : 1;
            $ticket->code = '#' . str_pad($number, 7, '0', STR_PAD_LEFT);
        });
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class, 'device_id');
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
