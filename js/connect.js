const API_KEY = "1bbcfab03c5b306d931315c1657faec4";

const nouveau_film = document.getElementById('nouveau_film');
const acteur_suivant = document.getElementById('acteur_suivant');
const reponse = document.getElementById('bouton_reponse');
const value = document.getElementById('valeur');
// const titre_original = document.getElementById('titre_original');
const titre = document.getElementById('titre');
const poster = document.getElementById('poster');
const poster_path = "https://image.tmdb.org/t/p/original/";

acteur_suivant.style.display="none";
reponse.style.display="none";
poster.style.display="none";




var acteurs = [];
var acteurs = document.getElementById('acteurs');
var occurence = 0;



nouveau_film.onclick = function(event){
    event.preventDefault();
    occurence = 0;
    reponse.style.display="none";
    poster.style.display="none";
    titre.style.display="none";
    while(acteurs.firstChild){
        acteurs.firstChild.remove();
    }
    const page = Math.floor(Math.random() * 55) + 1;
    const rand_movie = Math.floor(Math.random() * 21);
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=fr-FR&sort_by=vote_average.desc&langage=fr_FR&vote_count.gte=3000&include_adult=false&with_original_language=fr&with_original_language=en&page=" + page;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
                console.log(data);
                console.log('Data: ', data.results[rand_movie].original_title);
                var cast_url = "https://api.themoviedb.org/3/movie/" + data.results[rand_movie].id + "/credits?api_key=" + API_KEY + "&language=en-US";
                var affiche_path = poster_path + data.results[rand_movie].poster_path;
                var title = data.results[rand_movie].title;
                titre.innerHTML = title;
                fetch(cast_url)
                .then((results) => results.json())
                .then((donnees) => {
                    acteurs[0] = donnees.cast[4].name;
                    acteurs[1] = donnees.cast[3].name;
                    acteurs[2] = donnees.cast[2].name;
                    acteurs[3] = donnees.cast[1].name;
                    acteurs[4] = donnees.cast[0].name;
                    
                    var acteur= document.createElement('div');
                    acteur.className = 'acteur';
                    acteur.innerHTML = acteurs[occurence];
                    acteurs.appendChild(acteur);
                    acteur_suivant.style.display="inline";
                    poster.src = affiche_path;
                    occurence++;

                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
}

acteur_suivant.onclick = function(event){
    event.preventDefault();
    if(occurence == 4){
        acteur_suivant.style.display="none";
        reponse.style.display="inline";
    }
    console.log(occurence);
    var acteur= document.createElement('div');
    acteur.className = 'acteur';
    acteur.innerHTML = acteurs[occurence];
    acteurs.appendChild(acteur);
    occurence++;
}

reponse.onclick = function(event){
    event.preventDefault();
    poster.style.display="block";
    titre.style.display="inline";
    reponse.style.display="none";
}