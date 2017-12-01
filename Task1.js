function getApiKey() {
    return "ca5eb2b6cfe44976a01802c54c3db386";
}

function loadNewsSourses() {
    fetch("https://newsapi.org/v2/sources?apiKey=" + getApiKey())
        .then(r => r.json())
        .then((data) => {
            let { sources } = data;
            for (var newsSource of sources) {
                addNewSource(newsSource);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function addNewSource(news) {
    let { id, name, description, url, category, language, country } = news;

    let container = document.getElementById("newsContainer");
    let div = document.createElement("div");
    div.className += "newsSource"
    let table = document.createElement("table");
    table.width = "100%";
    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.align = "center";
    td1.innerHTML = "<h3>" + name + "</h3>";
    let td2 = document.createElement("td");
    td2.align = "center"
    td2.innerHTML = '<span style="text-decoration:underline; color:blue;" onclick="displayNews(\'' + id + '\');">' + url + '</span>';

    container.appendChild(div);
    div.appendChild(table);
    table.appendChild(tr1);
    table.appendChild(tr2);
    tr1.appendChild(td1);
    tr2.appendChild(td2);
}

function displayNews(sourceId) {
    let url = "https://newsapi.org/v2/top-headlines?sources=" + sourceId + "&apiKey=" + getApiKey();
    fetch(url)
        .then(r => r.json())
        .then((data) => {
            clearNews();
            let { articles } = data;
            for (var article of articles) {
                addArticle(article);                
            }
            scroll(0, 0);           
        })
        .catch((err) => {
            console.log(err);            
        });

}
function clearNews() {
    let screen = document.getElementById("screen");
    screen.innerHTML = "";
}

function addArticle(article) {
    let { source: s, author: a, title: t, description: d, url: u } = article;

    let screen = document.getElementById("screen");

    let tr = document.createElement("tr");
    
    let td = document.createElement("td");
    let author = document.createElement("div");
    let title = document.createElement("div");
    let description = document.createElement("div");

    author.innerHTML = "<b>" + a + "</b>";
    title.innerHTML = "<h3  style='color:red;'>" + t + "</h3>";
    description.innerText = d;

    screen.appendChild(tr);
    tr.appendChild(td);
    td.appendChild(title);
    td.appendChild(description);
    td.appendChild(author);
}
