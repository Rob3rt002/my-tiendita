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

            // Función para obtener las facturas del cliente
            function obtenerFacturasCliente(cliente_id) {
                fetch(`http://127.0.0.1:8000/factura/${cliente_id}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        const facturas = data.data;
                        const listaFacturas = document.getElementById('listaFacturas');
                        facturas.forEach(factura => {
                            const itemFactura = document.createElement('div');
                            itemFactura.setAttribute('class', 'recibo')
                            itemFactura.textContent = `${factura.factura_fecha} ${factura.factura_sucursal}   ${factura.factura_total}$ `;
                            const icon3 = document.createElement('img');
                            icon3.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>');
                            icon3.width = 18;
                            icon3.height = 18;
                            icon3.addEventListener('click', function() {
                                // Aquí redirigimos al usuario a la página HTML deseada
                                window.location.href = `view_factura.html?id=${factura.factura_id}`;
                            });
                            itemFactura.appendChild(icon3)
                            listaFacturas.appendChild(itemFactura);
                        });
                    })
                    .catch(error => console.error('Error al obtener las facturas del cliente:', error));
            }

            // Llamar a la función para obtener los detalles del cliente al cargar la página
            obtenerDetallesCliente(cliente_id);
            obtenerFacturasCliente(cliente_id);
        });

        // Manejar el envío del formulario
        document.getElementById('registroForm').addEventListener('S', function(event) {
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