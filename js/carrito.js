$(()=>{
    obtenerProductos();
    imprimirCarrito(carrito);
});

const url= "../js/data/productos.json";

let productos;

let carrito= JSON.parse(localStorage.getItem("carrito")) || [];

const obtenerProductos=()=>{
    $.get(url, (respuesta, estado)=>{
        productos= respuesta.productos;
        imprimirProductos(productos);
    })
}

const imprimirProductos=(productos)=>{
    productos.forEach(element => {
        $("#divProductos").append(`
            <div class="card mis-cards__mis-card" style="width: 18rem;">
            <img src=${element.url} class="mis-cards__mis-card__img-shop" alt="cbd-oil">
            <h5 class="card-title mis-cards__title productName">${element.nombre}</h5>
                <div class="card-body mis-cards__body">
                <h5 class="card-title mis-cards__title">Tamaño: ${element.tamaño}</h5>
                <h5 class="card-title mis-cards__title">Precio $: ${element.precio}</h5>
                <h5 class="card-title mis-cards__title">Categoria: ${element.categoria}</h5>
                <button class="btn mis-cards__btn" id=${element.id}>SHOP</button>
            </div>
        `).hide().delay(100).fadeIn(1200);
            
    });
    onClickAgregar()
};

const onClickAgregar=()=>{
    agregarAlCarrito()
}

const agregarAlCarrito=()=>{
    /* $("#divCarrito").empty(); */
    $(".mis-cards__btn").on("click", (e)=>{
        let id= e.target.id;
        const seleccion= productos.find(obj=>obj.id==id);
        let existeProd= carrito.some(obj=>obj.id==id);
        if(existeProd){
            carrito= carrito.map(element=>{
                if(element.id==id) {
                    element.cantidad++
                    return element
                }
                else{
                    return element
                }
            })
        }
        else{
            carrito.push(seleccion);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
        imprimirCarrito(carrito);
    })
}

const imprimirCarrito=(carrito)=>{
    $("#divCarrito").empty();
    carrito.forEach(element=>{
        element.precioTotal= element.precio*element.cantidad;
        $("#divCarrito").append(`
            <p class="tituloCarrito">Nombre: ${element.nombre}</p>
            <p class="tituloCarrito">Tamaño: ${element.tamaño}</p>
            <p class="tituloCarrito">Cantidad: ${element.cantidad}</p>
            <p class="tituloCarrito">Precio: $ ${element.precio}</p>
            <button class="btn-eliminar heartbeat" id=${element.id}>Eliminar</button>
            <button class="btn-borrar heartbeat" id=${element.id}>Borrar</button>
            <br>
            <br>
            <p class="tituloCarritoTotal">SubTotal$: ${element.precioTotal}</p>
            <hr>
        `);
    })
    eliminarProdCarrito();
    borrarCarrito();
    let miTotal= totalCarrito();
    $("#divCarrito").append(`<p class="tituloCarritoTotal2">Total: $ ${miTotal}</p>`)
};

const borrarCarrito=()=>{
    $(".btn-borrar").on("click", (e)=>{
        let id= e.target.id;
        const indexSeleccion= carrito.findIndex(obj=>obj.id==id);
        carrito.splice(indexSeleccion, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        imprimirCarrito(carrito);
    })
}

const eliminarProdCarrito=()=>{
    $(".btn-eliminar").on("click", (e)=>{
        let id= e.target.id;
        carrito=carrito.map(element=>{
            if(element.id==id){
                element.cantidad--;
                if(element.cantidad===0){
                    element.cantidad=1;
                }
                return element;
            }
            else{
                return element;
            }
        })
        localStorage.setItem("carrito", JSON.stringify(carrito));
        imprimirCarrito(carrito);
    })
    
}

const totalCarrito=()=>{
    let total=carrito.reduce((acumulador, iterador)=> acumulador+iterador.precioTotal,0);
    return total;
}








