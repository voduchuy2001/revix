<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $table = 'branches';

    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'email',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'branch_id');
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(RepairTicket::class, 'branch_id');
    }

    public function employees(): HasMany
    {
        return $this->hasMany(User::class, 'branch_id');
    }

    public function revenues(): HasMany
    {
        return $this->hasMany(Revenue::class, 'branch_id');
    }
}
