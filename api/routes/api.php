<?php

use App\Http\Controllers\Administracion\clientesController;
use App\Http\Controllers\Administracion\facturaController;
use App\Http\Controllers\Administracion\productoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['cors']], function () {
    // Route::apiResource('/products', productController::class);
    Route::apiResource('/clientes', clientesController::class);
    Route::apiResource('/productos', productoController::class);
    Route::apiResource('/factura', facturaController::class);
    // Route::apiResource('/registro', registroController::class);

    // Ruta personalizada para mostrar detalles de factura por ID
    Route::get('/factura/{id}/detalle', [facturaController::class, 'showByIdFactura']);
 });
