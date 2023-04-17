// inicio del javascript para la API 
const API = "https://rickandmortyapi.com/api";
let characters = `${API}/character`;
const div = document.querySelector(".container2");
const botonbuscar = document.querySelector("#buscar");
const inputbuscar = document.querySelector("#barrabuscar");
const Regresar = document.querySelector("#Regresar")
const Siguiente = document.querySelector("#Siguiente")
const siguiente = document.querySelector("#siguiente")
const filters = document.querySelectorAll(".btn-check")
let items;
// creacion de las card donde contendran la informacion del API Rick Adn Morty 
const dibujarcards = (results) => {
    let cardAcumuladas = "";
    let color = "";
    results.forEach(element => {
        if(element.status === "Dead"){
            color = "red";
        }else if(element.status === "Alive"){
            color = "green";
        }else if(element.status === "unknown"){
            color = "#333";
        }
        
        let card = `
        <div class="col-sm-5 col-md-6  col-lg-4 d-flex justify-content-center mb-4 ">
            <div class="card border border-info border-3" style="width: 20rem;">
            <img src="${element.image}" class="card-img-top tamañoimg" alt="${element.name}">
            <div style="width: auto;  background-color: ${color}; position: absolute;height: auto ; font-size: 15px; border: 3px solid lightgreen; color: white;">${element.status}</div>
            <div class="card-body bg-seondary bg-dark">
                <h4 class="card-title text-white ">${element.name}</h4>
                <p class="card-text text-info" style="width = auto;text-align: left; "><span style="font-size: 20px; color: white;">Ciudad:</span> ${element.location.name}
                <br><span style="font-size: 20px; color: white;">Genero:</span> ${element.gender}
                <br><span style="font-size: 20px; color: white;">Especie:</span> ${element.species}</p>
            </div>
            </div>
        </div>`
        
        cardAcumuladas += card;
    });
    div.innerHTML = cardAcumuladas;
}

// creacion de la funcion del boton buscar nombres de los personajes
const buscarAction = () => {
    characters = `${API}/character/?name=${inputbuscar.value}`;
    cargarDatos();
}
// activacion del boton buscar
botonbuscar.addEventListener("click", buscarAction);

// activacion y funcion del boton regresar a la anterior pagina
Regresar.addEventListener("click", () => {
    if(items.info.prev){
        characters = items.info.prev;
        cargarDatos();
    }
});
// activacion y funcion del boton siguiente a la siguiente pagina
Siguiente.addEventListener("click",() => {
    if(items.info.next){
        Siguiente.disabled = true;
        characters = items.info.next;
        cargarDatos();
    }
});


// filtrar personajes de Rick And Morty sobre estatus, especie y genero
const addFilterCharacter = (value, origin) => {
    let queryString = "";
    switch(origin)
    {
        case "status":
            queryString = `status=${value}`
        break;
        case "species":
            queryString = `species=${value}`
        break;
        case "gender":
            queryString = `gender=${value}`
        break;
    }
    
    if(characters.includes('?'))
    {
        characters = characters.concat(`&${queryString}`)
    }else{
        characters =  characters.concat(`?${queryString}`)
    }
    
    cargarDatos();
}

filters.forEach(item => item.addEventListener('click', (event) => {
    addFilterCharacter(event.target.labels[0].textContent, event.target.name);
}))



// funcion para recargar los datos de la API de Rick And Morty
const cargarDatos = () => {
window
    .fetch(characters)
    .then((response) => response.json())
    .then((responsejson) => {
        dibujarcards(responsejson.results);
        items = responsejson;
        Siguiente.disabled = false;
    })
    .catch(error => { 
        div.innerHTML = "No se encontro nada en su FILTRO"
    })
}
// llamar funcion
cargarDatos();