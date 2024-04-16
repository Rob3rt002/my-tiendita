<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\facturaModel;
use Exception;
use Illuminate\Http\Request;

class facturaController extends Controller
{
    public function returnData($data,$msg){
        if (sizeof($data) > 0) {
            $response =[
                "status" => "true",
                "data" => $data
            ];
            
        } else {
            $response =[
                "status" => "true",
                "message" => $msg
            ];
            
        }
        return json_encode($response);
    }
    public function index()
    {
        $model = new facturaModel();
        $result = $model->get();
        return $this->returnData($result,"No se encontraron facturas");
        // echo "<pre>";
        // print_r($result);
    }

    /**
     * Show the form for creating a new resource.
     */
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $objData = $request->json()->all();
    
            // Crear la factura en la tabla factura
            $model = new facturaModel();
            $facturaId = $model->create($objData);
    
            // Crear las entradas de factura_producto para cada producto asociado a la factura
            foreach ($objData['producto'] as $producto) {
                $model->crearEntradaFacturaDetalle($facturaId, $producto['producto_id'], $producto['cantidad']);
            }
    
            return $this->returnData(["factura_id" => $facturaId], "Registro exitoso");
        } catch(Exception $e) {
            // Imprime la excepción para depuración
            //dd($e);
            return $this->returnData([], "Se produjo un error");
        }
    }

    // Crear las entradas de factura_producto para cada producto asociado a la factura
            // foreach ($objData['productos'] as $producto) {
            //     $result = $model->crearEntradaFacturaProducto($factura_id, $producto['producto_id'], $producto['cantidad']);
            //     if (!$result) {
            //         // Si hay un error al insertar algún producto, mostrar mensaje de error y salir del bucle
            //         echo "Error al insertar producto asociado a la factura";
            //         return;
            //     }
            // }

    /**
     * Display the specified resource.
     */   
    public function show(string $id)
    {
        // Convertir el ID de cadena a entero
        $clienteId = intval($id);

        $model = new facturaModel();
        $result = $model->getById($clienteId);
        return $this->returnData($result, "No se encontraron las facturas del cliente ");
    }
    public function showByIdFactura(string $id)
    {
        // Convertir el ID de cadena a entero
        $facturaId = intval($id);

        $model = new facturaModel();
        $result = $model->getByIdFactura($facturaId);
        return $this->returnData($result, "No se encontró la factura");
    }

    // public function factura(string $id)
    // {
    //     $model = new facturaModel();
    //     $result = $model->getByIdFactura($id);
    //     return $this->returnData($result,"No se encontro cliente");
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
