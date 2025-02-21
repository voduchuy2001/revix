<?php

use App\Models\Device;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repair_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignIdFor(User::class, 'customer_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Device::class, 'device_id')->constrained()->cascadeOnDelete();
            $table->string('technician')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->text('condition')->nullable();
            $table->text('note')->nullable();
            $table->string('status', 50)->default('pending');
            $table->bigInteger('created_by');
            $table->bigInteger('updated_by');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_tickets');
    }
};
