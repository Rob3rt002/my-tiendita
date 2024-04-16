document.getElementById("registroFormProducto").addEventListener("submit", function(event){
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    let stock = document.getElementById("stock").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = document.getElementById("precio").value;

    let datos = {
        producto_stock: stock,
        producto_nombre: nombre,
        producto_descripción: descripcion,
        producto_precio: precio,
    };

    // Enviar datos al servidor mediante fetch()
    fetch("http://127.0.0.1:8000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error("Error en la respuesta del servidor");
    })
    .then(data => {
        // Manejar respuesta del servidor
        console.log(data);
        alert("Registro exitoso");
        // Puedes redirigir al usuario a otra página si lo deseas
        window.location.href = "../index.html";
    })
    .catch(error => {
        console.error("Error al procesar la solicitud:", error);
        alert("Hubo un problema al procesar tu solicitud.");
    });
});