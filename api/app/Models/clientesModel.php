<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class clientesModel extends Model
{
    public function get(){
        $sql= "SELECT * FROM clientes";
        return DB::select($sql);
    }

    public function getById($clienteId){
        $sql= "SELECT * FROM clientes where cliente_id=? and cliente_active= 1";
        return DB::select($sql,[$clienteId]);
    }

    


    public function create($data){
        try{
            $sql= "INSERT INTO clientes(cliente_nombre, cliente_apellido, cliente_genero,cliente_direccion,cliente_email,cliente_edad,cliente_active) values(?,?,?,?,?,?,?)";
            DB::INSERT ($sql, [$data->cliente_nombre, $data->cliente_apellido, $data->cliente_genero,$data->cliente_direccion,$data->cliente_email,$data->cliente_edad,$data->cliente_active]);
            return true;
        } catch (Exception $e){
            echo $e->getMessage();
            return false;
        }
    }

    public function crear($data){
        return DB::table("clientes")->insert($data);
    }

    public function actualizar($data, $clienteId){
        $sql = "UPDATE clientes SET";
        $sqlSets = [];
        $sqlValues = [];
        foreach ($data as $key => $value){
            $sqlSets[] = " $key = ? ";
            $sqlValues[] = $value;
        }
        $sqlSets = implode(',',$sqlSets);
        $sql .= $sqlSets . "where cliente_id = ?";
        $sqlValues[]= $clienteId;
        return DB::update($sql, $sqlValues);
    }

    public function eliminar($id){
        $sql = "DELETE FROM clientes WHERE cliente_id=?";
        return DB::select($sql, [$id]);
    }
}
 