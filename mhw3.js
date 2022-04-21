
//genera l'esercizio corrispondente al numero
function GenerateExcercise(event){
    event.preventDefault();
    const restURLExe=url_mainimage;
    //eseguo il fetch
    fetch(restURLExe).then(onResponseExercise).then(onJsonExercise);
}

function onResponseExercise(response){
    return response.json();
}

function onJsonExercise(json){
    const gallery=document.querySelector('#gallery-view');
    gallery.innerHTML=''; //svuoto prima la galleria
    const random_number= Math.floor( Math.random()*20);
    const source=json.results[random_number].image;
    const img=document.createElement('img');
    img.src=source;
    img.classList.add('gallery_img');
    gallery.appendChild(img);
}

//genera la canzone cercata
function SearchMusic(event){
    event.preventDefault();
    //prelevo l'input
    const titolo=form2.querySelector('#canzone').value;

    let restURLSpo=urlSpotify + titolo;

    fetch(restURLSpo,{
            method: 'GET',
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        }
    ).then(onResponseMusic).then(onJsonMusic);
}

function onResponseMusic(response){
    return response.json();
}

function onJsonMusic(json){
    const playlist=document.querySelector("#music-view");
    playlist.innerHTML=''; //lo svuoto se c'è già qualcosa
    let results=json.tracks.total;

    if(results>3){
        results=3;
    }

    for(let i=0; i<results ; i++){
        const result=json.tracks.items[i];
        const title=result.name;
        const albumName=result.album.name;
        const artista=result.artists[0].name;
        const img_album=result.album.images[0].url;

        const track=document.createElement('div');
        track.classList.add('track');
        const img=document.createElement('img');
        img.src=img_album;
        img.classList.add('track_img');
        const titolo=document.createElement('span');
        titolo.textContent=title;
        const cantante=document.createElement('span');
        cantante.textContent=artista;
        const nome_album=document.createElement('span');
        nome_album.textContent=albumName;

        track.appendChild(titolo);
        track.appendChild(cantante);
        track.appendChild(nome_album);
        track.appendChild(img);
        playlist.appendChild(track);
    }
}




//aggiungo gli event listener ai submit
const button=document.querySelector('#Exercise');
button.addEventListener('click',GenerateExcercise);

const form2=document.querySelector('#form2');
form2.addEventListener('submit',SearchMusic);

//keys per wger
const url_mainimage="https://wger.de/api/v2/exerciseimage/?format=json&is_main=True";

//keys per spotify 
const client_id = "69b6057ea0034d90801d1a856cdc0200";
const client_secret = "63120e3e05244081ab34c25127f195f6";
let token;
const urlSpotify="https://api.spotify.com/v1/search?type=track&q=";

//richiesta Token Spotify
fetch("https://accounts.spotify.com/api/token",
    {
        method:"post",
        body: 'grant_type=client_credentials',
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenResponse).then(onTokenJson);

function onTokenJson(json)
{
	token= json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}