
document.addEventListener('DOMContentLoaded', function () {
    fetch(`http://127.0.0.1:8000/factura`)
        .then(response => response.json())
        .then(data => {
            // Obtenemos el contenedor donde queremos mostrar los nombres
            const nameList = document.getElementById('name_list');

            // Iteramos sobre los datos recibidos del backend
            data.data.forEach(cliente => {
                // Creamos un contenedor para cada elemento de lista
                const container = document.createElement('div');
                // Creamos un elemento de lista
                const listItem = document.createElement('li');

                // Creamos un elemento de texto con el nombre del cliente
                const textNode = document.createTextNode(cliente.cliente_nombre + ' ' + cliente.cliente_apellido + ' ' + factura.factura_total );

                // Creamos un elemento de imagen para el icono
                const icon1 = document.createElement('img');
                icon1.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>');
                icon1.width = 15;
                icon1.height = 15;
                icon1.addEventListener('click', function() {
                    // Aquí redirigimos al usuario a la página HTML deseada
                    window.location.href = `pag/update.html?id=${cliente.cliente_id}`;
                });
                
                // Creamos el segundo elemento de imagen para el segundo icono
                const icon2 = document.createElement('img');
                icon2.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>');
                icon2.width = 18;
                icon2.height = 18;
                // Agregamos un evento de clic para el icono de eliminar
                icon2.addEventListener('click', function() {
                    // Mostramos una alerta para confirmar la eliminación
                    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este cliente?");
                    // Si el usuario confirma la eliminación, eliminamos el elemento de lista
                    if (confirmDelete) {
                        // Eliminamos el elemento de lista al que pertenece el icono
                        nameList.removeChild(listItem);
                        
                        // Enviamos una solicitud DELETE al backend para eliminar el cliente
                        fetch(`http://127.0.0.1:8000/clientes/${cliente.cliente_id}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to delete client');
                            }
                            console.log('Client deleted successfully');
                        })
                        .catch(error => console.error('Error deleting client:', error));
                    }
                });

                const icon3 = document.createElement('img');
                icon3.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>');
                icon3.width = 15;
                icon3.height = 15;
                icon3.addEventListener('click', function() {
                    // Aquí redirigimos al usuario a la página HTML deseada
                    window.location.href = `pag/view2.html?id=${cliente.cliente_id}`;
                });
                
                const text = document.createElement('span')

                text.appendChild(textNode)

                container.appendChild(icon3);
                container.appendChild(icon1);
                container.appendChild(icon2);

                // Agregamos el icono y el texto al elemento de lista
                
                listItem.appendChild(text);
                listItem.appendChild(container);
                
                // Agregamos el elemento de lista al contenedor
                nameList.appendChild(listItem);
                
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


    

// document.addEventListener('DOMContentLoaded', function () {
//     fetch('http://127.0.0.1:8000/clientes')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//     })
//         .catch(error => console.error('Error fetching data:', error));
// });

// document.addEventListener('DOMContentLoaded', function () {
//     fetch(URL)
//         .then(response => response.json())
//         .then(data => {
//             const nameList = document.getElementById('name_list');
//             data.forEach(clientes => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = cliente.nombre;
//                 nameList.appendChild(listItem);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });