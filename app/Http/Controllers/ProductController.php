<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Enums\StockMovementType;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\UpdateProductStockRequest;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->where('type', ProductType::EXPORT->value)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Product/Index', [
            'products' => $products
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::beginTransaction();
        try {
            $product = Product::create([
                ...$data,
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);

            StockMovement::create([
                'product_id' => $product->id,
                'type' => StockMovementType::IMPORT->value,
                'quantity' => $data['stock'],
                'created_by' => Auth::id(),
            ]);

            DB::commit();

            return Redirect::back();
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return Redirect::back()->withErrors(['error' => 'Có lỗi xảy ra!']);
        }
    }

    public function update(UpdateProductRequest $request, string|int $id): RedirectResponse
    {
        $data = $request->validated();
        $product = Product::findOrFail($id);
        $product->update($data);

        return Redirect::back();
    }

    public function destroy(string|int $id)
    {
        $product = Product::findOrFail($id);
        if (!Auth::user()->isSuperUser()) {
            return Redirect::back()->withErrors('Bạn không thể thực hiện hành động này.');
        }
        $product->delete();

        return Redirect::back();
    }

    public function updateStock(UpdateProductStockRequest $request, string|int $id)
    {
        $data = $request->validated();
        $product = Product::findOrFail($id);

        DB::beginTransaction();
        try {
            $request['type'] === ProductType::IMPORT->value ? $product->increment('stock', $data['stock']) : $product->decrement('stock', $data['stock']);
            StockMovement::create([
                'product_id' => $product->id,
                'type' => $request['type'],
                'quantity' => $data['stock'],
                'created_by' => Auth::id(),
                'note' => $data['note'],
            ]);

            DB::commit();

            return Redirect::back();
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return Redirect::back()->withErrors(['error' => 'Có lỗi xảy ra!']);
        }
    }
}
