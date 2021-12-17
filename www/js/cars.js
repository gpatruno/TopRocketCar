const divCars = `
<div class="d-flex justify-content-center">
    <div class="card" style="width: 90%;">
        <img src="__src__" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">__top__. __title__</h5>
            <p class="card-text">
            __description__
            </p>
            <button type="button" class="btn btn-primary" onclick="goToDesc('__id__')">Voir la Top list</button>
        </div>
    </div>
</div>
`;
const divItems = `
<div class="d-flex justify-content-center">
    <div class="card" style="width: 90%;">
        <img src="__src__" width="60" height="60" />
        <div class="card-body">
        <h5 class="card-title">Ordre : __order__ - __name__</h5>
    </div>
</div>
`;
const divNewItems = `
<div class="form-group" style="padding-top: 5px;">
    <div class="d-flex justify-content-center">
        <div class="card" style="width: 90%;">
            <img id="__idSrc__" src="__src__" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title" id="__idName__">__name__</h5>
                <p class="card-text">
                    <label for="customOrder" class="form-label">Ordre</label>
                    <input type="number" id="__idOrder__" name="customOrder" min="0" max="11" value="11">  
                </p>
            </div>
        </div>
    </div>
</div>
`;

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

// Affichage des Toplists
const fetchApiDoneCars = (json) => {
    //toplistsize
    const divList = document.getElementById("list");
    let nbrList = 0;
    // Ajout du JSON dans le localStorage
    if (localStorage.getItem('DATA')) {
        console.log('Jai deja un localStorage');
        json = JSON.parse(localStorage.getItem('DATA'));
    } else {
        localStorage.setItem('DATA', JSON.stringify(json));
    }

    json.forEach((car, i) => {
        nbrList++;
        const newDivCars = divCars
            .replace("__id__", car.idTopList)
            .replace("__src__", car.img)
            .replace("__top__", i + 1)
            .replace("__title__", car.title)
            .replace("__description__", car.description);
        divList.appendChild(htmlToElement(newDivCars));
    });
    const pListSize = document.getElementById("toplistsize");
    pListSize.textContent = "Nombre de liste : " + nbrList;
};

// Récupération d'un fichier
const fetchLocal = (url) => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(new Response(xhr.response, { status: xhr.status }));
        };
        xhr.onerror = function () {
            reject(new TypeError("Local request failed"));
        };
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
    });
};

const fetchApiCars = () => {
    fetchLocal("api/cars.json").then((response) =>
        response.json().then(fetchApiDoneCars)
    );
};

if ("cordova" in window) {
    document.addEventListener("deviceready", fetchApiCars);
} else {
    document.addEventListener("DOMContentLoaded", fetchApiCars);
}

const addData = () => {
    const idNewItem = document.getElementById("idNewItem").value;
    const titleNewItem = document.getElementById("titleNewItem").value;
    const descNewItem = document.getElementById("descNewItem").value;

    let myNewTopList = {
        "idTopList": idNewItem,
        "title": titleNewItem,
        "description": descNewItem,
        "img": "",
        "items": []
    }

    for (let index = 0; index < 11; index++) {
        let newOrderCar = {
            "name": document.getElementById("idName" + index).innerHTML,
            "order": document.getElementById("idOrder" + index).value,
            "img": document.getElementById("idSrc" + index).src
        }
        myNewTopList.items.push(newOrderCar);
    }

    let myData = JSON.parse(localStorage.getItem('DATA'));
    myData.push(myNewTopList);
    localStorage.setItem('DATA', JSON.stringify(myData));

    goToList();
}

$(document).ready(function () {
    $("#myNewForm").submit(function (event) {
        console.log(event);
        event.preventDefault();
        event.stopPropagation();
        addData();
    });
});

// AJOUT D'UNE TOPLIST
const addTopList = () => {
    // On cache et affiche les bonnes pages
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "hidden";
    listTopList.className = "hidden";
    addTopList.className = "";

    // Reset des valeurs
    document.getElementById("idNewItem").value = "";
    document.getElementById("titleNewItem").value = "";
    document.getElementById("descNewItem").value = "";

    // Si la page contient déjà des items alors on les supprimes
    const newListItems = document.getElementById("newListItems");
    if (newListItems.firstElementChild != null) {
        while (newListItems.firstChild) {
            newListItems.removeChild(newListItems.lastChild);
        }
    }

    // On récupère le json du localStorage pour afficher toutes les voitures
    let myData = JSON.parse(localStorage.getItem('DATA'));
    myData.forEach((list, i) => {
        if (list.idTopList == "default")
            list.items.forEach((element, i) => {
                const newdivItems = divNewItems
                    .replace("__src__", element.img)
                    .replace("__name__", element.name)
                    .replace("__idOrder__", "idOrder" + i)
                    .replace("__idSrc__", "idSrc" + i)
                    .replace("__idName__", "idName" + i)
                newListItems.appendChild(htmlToElement(newdivItems));
            });
    });
}

// LISTE DES TOPLIST
const returnTolist = () => {
    // On cache et affiche les bonnes pages
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "hidden";
    addTopList.className = "hidden";
    listTopList.className = "";
}

// LISTE DES TOPLIST
const goToList = () => {
    // On cache et affiche les bonnes pages
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "hidden";
    addTopList.className = "hidden";
    listTopList.className = "";

    const listItems = document.getElementById("list");
    // Si la page contient déjà des items alors on les supprimes
    if (listItems.firstElementChild != null) {
        while (listItems.firstChild) {
            listItems.removeChild(listItems.lastChild);
        }
    }
    let nbrList = 0;
    // On récupère le json du localStorage
    let myData = JSON.parse(localStorage.getItem('DATA'));
    myData.forEach((list, i) => {
        nbrList++;
        const newDivCars = divCars
            .replace("__id__", list.idTopList)
            .replace("__src__", list.img)
            .replace("__top__", i + 1)
            .replace("__title__", list.title)
            .replace("__description__", list.description);
        listItems.appendChild(htmlToElement(newDivCars));
    });
    const pListSize = document.getElementById("toplistsize");
    pListSize.textContent = "Nombre de liste : " + nbrList;
}

// LISTES DES VOITURES D'UNE TOPLIST
const goToDesc = (idTopList) => {
    // On cache et affiche les bonnes pages
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "";
    addTopList.className = "hidden";
    listTopList.className = "hidden";

    const listItems = document.getElementById("listItems");
    // Si la page contient déjà des items alors on les supprimes
    if (listItems.firstElementChild != null) {
        while (listItems.firstChild) {
            listItems.removeChild(listItems.lastChild);
        }
    }

    // On récupère le json du localStorage
    let myData = JSON.parse(localStorage.getItem('DATA'));
    myData.forEach((list, i) => {
        if (list.idTopList == idTopList) {
            list.items.sort(function (a, b) {
                return a.order - b.order;
            });
            list.items.forEach((element, i) => {
                const newdivItems = divItems
                    .replace("__order__", element.order)
                    .replace("__src__", element.img)
                    .replace("__name__", element.name)
                listItems.appendChild(htmlToElement(newdivItems));
            });
        }
    });
    const titleTop = document.getElementById("titleTop");
    titleTop.textContent = "Classement de : " + idTopList;
}
