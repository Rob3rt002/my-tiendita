
document.addEventListener('DOMContentLoaded', function () {
    fetch("http://127.0.0.1:8000/clientes")
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
                const textNode = document.createTextNode(cliente.cliente_nombre + ' ' + cliente.cliente_apellido );

                // Creamos un elemento de imagen para el icono
                const icon1 = document.createElement('img');
                icon1.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>');
                icon1.width = 18;
                icon1.height = 18;
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
                icon3.width = 18;
                icon3.height = 18;
                icon3.addEventListener('click', function() {
                    // Aquí redirigimos al usuario a la página HTML deseada
                    window.location.href = `pag/view_cliente.html?id=${cliente.cliente_id}`;
                });

                const icon4 = document.createElement('img');
                icon4.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg>');
                icon4.width = 18;
                icon4.height = 18;
                icon4.addEventListener('click', function() {
                    // Aquí redirigimos al usuario a la página HTML deseada
                    window.location.href = `pag/buy.html?id=${cliente.cliente_id}`;
                });
                
                const text = document.createElement('span')

                container.appendChild(icon4);
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