
const contactos= JSON.parse(localStorage.getItem("contactos")) ||[]; 

document.getElementById("formularioJs").onsubmit=(e)=> {
    e.preventDefault();
    const inputs= e.target.children;
    contactos.push(new Contacto(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value));
    localStorage.setItem("contactos", JSON.stringify(contactos));
    swal("We apreciate your message");
};

const registros= JSON.parse(localStorage.getItem("registros")) ||[]; 

document.getElementById("mailRegistro").onsubmit=(e)=>{
    e.preventDefault();
    let inputs= e.target.children
    registros.push(new Registro(inputs[0].value));
    localStorage.setItem("registros", JSON.stringify(registros));
    swal("You are now subscribed to our lattest news");
}





