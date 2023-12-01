window.onload = function() {
    updateOngList();
}

let ongList = document.querySelectorAll('.ong');

for (let i = 0; i < ongList.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    ongList[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
    }
}

function addOng() {
    let inputValue = document.getElementById("itemInput").value;
    let valorValue = document.getElementById("valorInput").value;

    if (inputValue === '') {
        alert("Você precisa selecionar uma ONG");
        return;
    } else if (valorValue === '') {
        alert("Você precisa informar um valor");
        return;
    }
    
    let ongs = JSON.parse(localStorage.getItem('ongs')) || [];

    let ongId = ongs.length > 0 ? ongs[ongs.length - 1].id + 1 : 1;

    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    let dataFormat = dia + '/' + mes + '/' + ano;

    let ong = {
        id: ongId,
        description: inputValue,
        value: valorValue,
        date: dataFormat
    };

    ongs.push(ong);

    localStorage.setItem('ongs', JSON.stringify(ongs));

    updateOngList();
}

function updateOngList() {
    let ongCardSection = document.getElementById("ong-card");
    ongCardSection.innerHTML = '';

    let ongs = JSON.parse(localStorage.getItem('ongs')) || [];


    ongs.forEach(function(ong) {

        let div = document.createElement("div");
        div.className = "ong";

        let idSpan = document.createElement("span");
        idSpan.className = "id";
        let idInfo = document.createTextNode(ong.id)
        idSpan.appendChild(idInfo);

        let dateSpan = document.createElement("span");
        dateSpan.className = "date";
        let dateInfo = document.createTextNode(ong.date);
        dateSpan.appendChild(dateInfo);

        let orgSpan = document.createElement("span");
        orgSpan.className = "org";
        let orgDesc = document.createTextNode(ong.description);
        orgSpan.appendChild(orgDesc);

        let valueSpan = document.createElement("span");
        valueSpan.className = "value";
        let valueInfo = document.createTextNode("R$ " + ong.value);
        valueSpan.appendChild(valueInfo);

        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);

        div.appendChild(idSpan);
        div.appendChild(dateSpan);
        div.appendChild(orgSpan);
        div.appendChild(valueSpan);
        div.appendChild(span);
        ongCardSection.appendChild(div);
    });

    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
            console.log(div)
            
            let ongId = parseInt(div.firstChild.nodeValue.split(':')[0].trim());
            let updatedOngs = ongs.filter(ong => ong.id !== ongId);

            localStorage.setItem('ongs', JSON.stringify(updatedOngs));
        }
    }
}

function limparLista() {
    localStorage.removeItem('ongs');
    updateOngList();
}

function limparCampos() {
    document.getElementById("itemInput").value = "";
    document.getElementById("valorInput").value = "";
    document.getElementById("searchInput").value = "";
    pesquisa();
}

function pesquisa() {
    let termoPesquisa = document.getElementById('searchInput').value.toLowerCase();
    let elementosOngs = document.querySelectorAll('.ong');

    for (let i = 0; i < elementosOngs.length; i++) {
        let selElement = elementosOngs[i];

        let currentDate = selElement.querySelector('.date').textContent.toLowerCase();
        let currentOrg = selElement.querySelector('.org').textContent.toLowerCase();
        let currentValue = selElement.querySelector('.value').textContent.toLowerCase();

        if (currentDate.includes(termoPesquisa) || currentOrg.includes(termoPesquisa) || currentValue.includes(termoPesquisa)) {
            selElement.style.display = 'block';
        } else {
            selElement.style.display = 'none';
        }
    }
}