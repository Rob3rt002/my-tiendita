<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class facturaModel extends Model
{
    public function get(){
        $sql= "SELECT * FROM factura";
        return DB::select($sql);
    }

    public function getById($clienteId){
        $sql= "SELECT factura.factura_id, factura.factura_fecha, factura.factura_sucursal, factura.factura_total, clientes.cliente_nombre, clientes.cliente_apellido, clientes.cliente_direccion, clientes.cliente_email, clientes.cliente_edad
        FROM clientes
        INNER JOIN factura ON clientes.cliente_id = factura.cliente_id
        WHERE clientes.cliente_id = ? LIMIT 0, 25";
        return DB::select($sql,[$clienteId]);
    }

    

    public function getByIdFactura($facturaId){
        $sql= "SELECT factura.*, factura_detalle.*, clientes.*, producto.*
                FROM factura
                INNER JOIN factura_detalle ON factura.factura_id = factura_detalle.factura_id
                INNER JOIN clientes ON factura.cliente_id = clientes.cliente_id
                INNER JOIN producto ON factura_detalle.producto_id = producto.producto_id
                WHERE factura.factura_id=?";
        return DB::select($sql,[$facturaId]);
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

    public function crear($data){
        $data['factura_fecha'] = date('Y-m-d H:i:s');
        return DB::table("factura")->insert($data);
    }
}
