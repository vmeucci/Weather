document.querySelector('.busca').addEventListener('submit', async (e)=>{

    e.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){

        limparInfo();
        mostrarAviso('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=4d590ed5998126d65fbceb52cea1a101&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
        
        if(json.cod === 200){

            mostrarInfo({

                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            limparInfo();
        }

    }

});

function mostrarInfo(json){
    mostrarAviso('');

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;


}

function limparInfo(){
    mostrarAviso('');
    document.querySelector('.resultado').style.display = 'none';
}

function mostrarAviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}