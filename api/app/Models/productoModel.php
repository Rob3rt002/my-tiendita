<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class productoModel extends Model
{
    public function get(){
        $sql= "SELECT * FROM producto";
        return DB::select($sql);
    }

    public function getById($clienteId){
        $sql= "SELECT * FROM producto where producto_id=?";
        return DB::select($sql,[$clienteId]);
    }
    public function create($data){
        try{
            $sql= "INSERT INTO producto(producto_stock, producto_nombre, producto_descripción,producto_precio) values(?,?,?,?)";
            DB::INSERT ($sql, [$data->producto_stock, $data->producto_nombre, $data->producto_descripción,$data->producto_precio]);
            return true;
        } catch (Exception $e){
            echo $e->getMessage();
            return false;
        }
    }

    public function crear($data){
        return DB::table("producto")->insert($data);
    }
}
