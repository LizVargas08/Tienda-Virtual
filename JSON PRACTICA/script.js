const contenedor = document.getElementById("contenedor-productos");
const agregarBtn = document.getElementById("agregarBtn");

// JSON
fetch("products.json")
  .then(response => response.json())
  .then(datos => {
    datos.forEach(producto => {
      crearProducto(producto);
    });
  })
  .catch(error => console.log("Error al cargar JSON:", error));

// Función para crear un producto visualmente
function crearProducto(producto) {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    
    <button class="btn-eliminar">Eliminar</button>
  `;

  // botón eliminar (oculta el producto)
  div.querySelector(".btn-eliminar").addEventListener("click", () => {
    //esto solo lo oculta no los borra por comppleto
    div.style.display = "none";
  });

  contenedor.appendChild(div);
}

// Agregar nuevo producto desde el formulario
agregarBtn.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const precio = document.getElementById("precio").value.trim();
  const imagen = document.getElementById("imagen").value.trim();

  //aqui nos aseguramos que los campos esten llenos
  if (nombre === "" || precio === "" || imagen === "") {
    alert("Por favor llena todos los campos");
    return;
  }

  const nuevoProducto = {
    nombre: nombre,
    precio: precio,
    imagen: imagen
  };
  // Llama a la función que muestra el producto en la pantalla
  crearProducto(nuevoProducto);

  // limpiar campos
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imagen").value = "";
});
