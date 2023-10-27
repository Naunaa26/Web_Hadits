const output = document.getElementById("output");
var url = "https://api.hadith.gading.dev/books/"

function getListHadist() {
    axios.get(url).then(function(res){
    var hadits = res.data.data.map(buku => {
        return `
            <div class="card"><h2>${buku.name}</h2>
            <div class="    img-hadist"><img src="./assets/${buku.id}.jpg"/></div>
            <p>Jumlah Hadist : <b>${buku.available}</b></p>
            <a class="btn btn-primary" href="./hadist/${buku.id}.html" target=_blank>Klik Disini</a>
            </div>`;
    }).join("");

    output.innerHTML = hadits;
});
}


const outputHadist = document.getElementById("output-hadist")
var currentUrl = window.location.href;
var fileName = currentUrl.split('/').pop();
var filenamewithoutExtension = fileName.replace(/\.html$/, '');


function gethadistById() {
    axios.get(`${url}${filenamewithoutExtension}?range=1-300`).then
    (function(res){
        var getHadits = res.data.data.hadiths.map((hadist) => {
            return`
            <div class="boxnya">
            <h2 class="fs-3 text-bg-primary p-2 nonya">Hadist No: ${hadist.number}</h2>
            <p class="text-end fs-4 arabnya">${hadist.arab}</p>
            <pre class="paragraphnya">${hadist.id}</pre>
            </div>
            `;
        }).join("");

        outputHadist.innerHTML = getHadits;
    })
}

function btnSearch(){
    const search = document.getElementById("search-hadits").value
    const judulpencarian = document.getElementById("judul-pencarian");
    const outputsearch = document.getElementById("output-search");

    axios.get(`${url}${filenamewithoutExtension}?range=1-300`).then
    (function (res) {
        var getSearch = res.data.data.hadiths.filter((fill) => {
            return fill.id.toLowerCase().includes(search.toLowerCase());
        });

        if(search.length > 0){
            judulpencarian.innerHTML = `Pencarian Hadits : <b>${search}</b>`

            outputsearch.innerHTML = getSearch.map((hasil) => {
                return`
                <div class="boxnya">
                <h2 class="fs-3 text-bg-primary p-2 nonya">Hadist No: ${hasil.number}</h2>
                <p class="text-end fs-4 arabnya">${hasil.arab}</p>
                <pre class="paragraphnya">${hasil.id}</pre>
                </div>
                `
            }).join("");

        }else if (search == ""){
            judulpencarian.innerHTML = "";
            outputsearch.innerHTML = "Hadist Not Found";
        }
    })
}

