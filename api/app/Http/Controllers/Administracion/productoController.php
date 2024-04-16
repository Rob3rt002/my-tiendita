<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\productoModel;
use Illuminate\Http\Request;

class productoController extends Controller
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
        $model = new productoModel();
        $result = $model->get();
        return $this->returnData($result,"No se encontraron empresas");
        echo "<pre>";
        print_r($result);
    }

    /**
     * Show the form for creating a new resource.
     */
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $objData = json_decode($request->getContent(), true);
            $model = new productoModel();
            $result = $model->crear($objData);
            //print_r($result);
            if($result){
                echo "Registro exitoso";
            }else{
                echo "Se produjo un error, intentando insertar ";
            }
       }catch(Exception $e){
           echo "Se produjo un error, no se que ocurrio";
       }
        
    }

    /**
     * Display the specified resource.
     */   
    public function show(string $id)
    {
        $model = new productoModel();
        $result = $model->getById($id);
        return $this->returnData($result,"No se encontro cliente");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $objData = json_decode($request->getContent(), true);
        $model = new productoModel();
        $result = $model->actualizar($objData, $id);
        if ($result) {
            return $this->returnData([],"actualizacion exitosa");
        } else {
            return $this->returnData([],"actualizacion errada");
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = new productoModel();
        $result = $model->eliminar($id);
        //var_dump($result);
        if ($result) {
            return $this->returnData([],"Eliminacion exitosa");
        } else {
            return $this->returnData([],"Eliminacion errada");
        }
    }
}
