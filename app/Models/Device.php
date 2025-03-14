<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Device extends Model
{
    protected $table = 'devices';

    protected $fillable = [
        'code',
        'name',
        'type',
        'description'
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
