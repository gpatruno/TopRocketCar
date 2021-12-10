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
<div class="card bg-light mb-3" style="max-width: 18rem;">
    <div class="card-header">__order__. __name__</div>
    <div class="card-body">
        <img src="__src__g" width="60" height="60" />
    </div>
</div>
`;

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

const fetchApiDoneCars = (json) => {
    //toplistsize
    const divList = document.getElementById("list");
    let nbrList = 0;
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

const addTopList = () => {
    console.log("addTopList");
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "hidden";
    listTopList.className = "hidden";
    addTopList.className = "";
}

const returnTolist = () => {
    console.log("returnTolist");
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "hidden";
    addTopList.className = "hidden";
    listTopList.className = "";
}

// LISTES DES VOITURES 
const goToDesc = (titleTop) => {
    const listTopList = document.getElementById("listTopList");
    const addTopList = document.getElementById("addTopList");
    const page3 = document.getElementById("page3");
    page3.className = "";
    addTopList.className = "hidden";
    listTopList.className = "hidden";
    // const titleTop = document.getElementById("titleTop");
    // fetchApiItems(titleTop);
    // titleTop.textContent = "Classement de " + titleTop;
}

// const fetchApiItems = (titleTop) => {
//     fetchLocal("api/items.json").then((response) =>
//         response.json().then(fetchApiDoneItems)
//     );
// };

const fetchApiDoneItems = (json) => {
    console.log(json);
    const divList = document.getElementById("listItems");
    json.forEach((car, i) => {
        if(car.idTopList) {

        }
        const newdivItems = divItems
            .replace("__order__", car.order)
            .replace("__src__", car.img)
            .replace("__name__", car.name);
        divList.appendChild(htmlToElement(newdivItems));
    });
    const pListSize = document.getElementById("toplistsize");
    pListSize.textContent = "Nombre de liste : " + nbrList;
};
