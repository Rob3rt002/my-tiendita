let cliente_id;
        document.addEventListener('DOMContentLoaded', function () {
            // Obtener el ID del cliente de la URL
            const params = new URLSearchParams(window.location.search);
            cliente_id = params.get('id');

            // Función para obtener los detalles del cliente
            function obtenerDetallesCliente(cliente_id) {
                fetch(`http://127.0.0.1:8000/clientes/${cliente_id}`)
                    .then(response => response.json())
                    .then(data => {
                        const cliente = data.data[0];
                            document.getElementById('nombre').value = cliente.cliente_nombre;
                            document.getElementById('apellido').value = cliente.cliente_apellido;
                            document.getElementById('genero').value = cliente.cliente_genero;
                            document.getElementById('direccion').value = cliente.cliente_direccion;
                            document.getElementById('email').value = cliente.cliente_email;
                            document.getElementById('edad').value = cliente.cliente_edad;
                    })
                    .catch(error => console.error('Error al obtener los detalles del cliente:', error));
            }

            // Llamar a la función para obtener los detalles del cliente al cargar la página
            obtenerDetallesCliente(cliente_id);
        });

        // Manejar el envío del formulario
        document.getElementById('registroForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

            // Obtener los valores de los campos del formulario
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const genero = document.getElementById('genero').value;
            const direccion = document.getElementById('direccion').value;
            const email = document.getElementById('email').value;
            const edad = document.getElementById('edad').value;

            // Construir el objeto de datos del cliente actualizado
            const datos = {
                cliente_nombre: nombre,
                cliente_apellido: apellido,
                cliente_genero: genero,
                cliente_direccion: direccion,
                cliente_email: email,
                cliente_edad: edad,
            };

            // Enviar los datos actualizados del cliente al servidor mediante fetch()
            fetch(`http://127.0.0.1:8000/clientes/${cliente_id}`, {
                method: 'PUT', // Usar el método PUT para actualizar los datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            .then(response => {
                if (response.ok) {
                    // Cliente actualizado exitosamente
                    alert('Los cambios se guardaron exitosamente.');
                    // Redirigir a la página principal o a donde lo desees
                    window.location.href = '../index.html';
                } else {
                    // Error al actualizar el cliente
                    console.error('Error al actualizar el cliente:', response.status);
                    alert('Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al procesar la solicitud:', error);
                alert('Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.');
            });
        });