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

    public function updateStock(UpdateProductStockRequest $request, string|int $id): RedirectResponse
    {
        $data = $request->validated();
        $product = Product::findOrFail($id);

        DB::beginTransaction();
        try {
            $request['type'] === ProductType::IMPORT->value
                ? $this->importStock($product, $data['stock'])
                : $this->exportStock($product, $data['stock']);

            $this->logStockMovement($product->id, $request['type'], $data['stock'], $data['note']);

            DB::commit();

            return Redirect::back()->with('success', 'Cập nhật tồn kho thành công.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return Redirect::back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    private function importStock(Product $product, int $quantity): void
    {
        $product->increment('stock', $quantity);
    }

    private function exportStock(Product $product, int $quantity): void
    {
        throw_if($product->stock < $quantity, new \Exception('Số lượng tồn kho không đủ để xuất.'));
        $product->decrement('stock', $quantity);
    }

    private function logStockMovement(int $productId, string $type, int $quantity, ?string $note = null): void
    {
        StockMovement::create([
            'product_id' => $productId,
            'type' => $type,
            'quantity' => $quantity,
            'created_by' => Auth::id(),
            'note' => $note,
        ]);
    }
}
