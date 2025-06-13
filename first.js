const BASE_URL=`https://api.openweathermap.org/data/2.5/weather?`
// const BASE_URL=`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}` this is the main link
let API_KEY="0f562fa6dcd12c675f1290478a6b6fd7";
const cityname=document.querySelector(".city")
const btn=document.querySelector(".click");
const temperature=document.querySelector(".Temp");
const weather=document.querySelector(".id");
const feels_like=document.querySelector(".feels_like");
const Humidity=document.querySelector(".humidity");
// selected all the elemnets from html for the further change 

// adding event listner to get weather data button 
btn.addEventListener(("click"),async(evt)=>{
    evt.preventDefault();       // this is remove the page from being reload 
     const getcity=cityname.value.trim(); //to remove  (spaces, tabs, newlines, etc.)
     if(!getcity){
                console.error("Error: City name cannot be empty.");  // if the user dont input the name of city to get the error mesaage 

     }
    const NEW_URL=`${BASE_URL}q=${encodeURIComponent(getcity)}&appid=${API_KEY}&units=metric`//making the new url by adding the api key and city name 
    try{
        const response=await fetch(NEW_URL);   //fetching the new url 
        if (!response.ok){  // catching error and passing the message if error occur 
            console.error("bad request ")
            const errordata= await response.json()
            console.log(`the error is ${response.status} ${errordata.message}`)
        }
        const data = await response.json();   // getting the data in json format
        if (data && data.main && data.weather && data.weather.length > 0) {  //checking if the data is available or not 
            temperature.innerText= `Temperature:${data.main.temp}°C`;
        weather.innerText= `Weather:${data.weather[0].main}`
        feels_like.innerText= `Feels Like:${data.main.feels_like}°C`
        Humidity.innerText=`Humididty:${data.main.humidity}%`
        console.log(response.status);// getting response status to check if error ocuur or  not 
        }else{
            console.error("unexpected data structure from APi")
        }
        
    }
    catch (error){
        console.error("network or parsing error",error)
    };


});

