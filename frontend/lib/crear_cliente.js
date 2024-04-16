document.getElementById("registroForm").addEventListener("submit", function(event){
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let genero = document.getElementById("genero").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;

    let datos = {
        cliente_nombre: nombre,
        cliente_apellido: apellido,
        cliente_genero: genero,
        cliente_direccion: direccion,
        cliente_email: email,
        cliente_edad: edad,
    };

    // Enviar datos al servidor mediante fetch()
    fetch("http://127.0.0.1:8000/clientes", {
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