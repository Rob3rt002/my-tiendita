public function getById($clienteId){
        $sql= "SELECT factura.factura_id, factura.factura_fecha, factura.factura_sucursal, factura.factura_total, clientes.cliente_nombre, clientes.cliente_apellido, clientes.cliente_direccion, clientes.cliente_email, clientes.cliente_edad, producto.producto_nombre, producto.producto_precio, factura_detalle.cantidad
        FROM clientes
        INNER JOIN factura ON clientes.cliente_id = factura.cliente_id
        INNER JOIN factura_detalle ON factura.factura_id = factura_detalle.factura_id
        INNER JOIN producto ON factura_detalle.producto_id = producto.producto_id
        WHERE clientes.cliente_id = ? ";
        return DB::select($sql,[$clienteId]);
    }


    public function create($data) {
        // try {
            $facturasId = DB::table('factura')->insertGetId([
                'cliente_id' => $data['cliente_id'],
                'factura_fecha' => $data['factura_fecha'],
                'factura_sucursal' => $data['factura_sucursal'],
                'factura_total' => $data['factura_total']
            ]);

            return $facturasId;
        //} catch(Exception $e) {
        //    return false;
        //}
    }
    public function crearEntradaFacturaDetalle($facturaId, $productoId, $cantidad) {

        // try {
            $sql = "INSERT INTO factura_detalle (factura_id, producto_id, cantidad) VALUES (?, ?, ?)";
            DB::insert($sql, [$facturaId, $productoId, $cantidad]);
            return true;
        // } catch (Exception $e) {
        //     return false;
        // }
    }


    {
    "factura_fecha": "",
    "factura_sucursal": "Sur",
    "factura_total": 2030.40,
    "cliente_id":19,
    "productos": [
        {
            "producto_id": 4,
            "cantidad": 2
        },
        {
            "producto_id": 5,
            "cantidad": 3
        }
    ]
}



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
            dd($e);
            return $this->returnData([], "Se produjo un error");
        }
    }