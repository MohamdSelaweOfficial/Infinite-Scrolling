const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
let ready=false;
let imagesLoaded=0;
let totalImages=0;


//check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    //in java 1 == '1' is true but with 1 ==='1' is false 
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        console.log('ready=',ready);
    }
}


//create element for link & photos, add to dom

function displayPhotos() {
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('total images',totalImages);
    //run funcation for each object in photosArray
    photosArray.forEach((photo) => {
    //Create <a> to link to Unplash 
    //we make an item that we add "a" link element to,the setAttribute will add anything we want to it
    //like links the first part is "src" or "href" and then a location like src="file1.CSS"
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target' , '_blank');
    //make <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);


    // Event listener to check when image is loading
    img.addEventListener('load',imageLoaded);
    //put img inside "a" then put both inside imageContainer element
    //appendChild just add things to an array or lists
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}


// API
const count = 5;
const apiKey ='VaTP7BjHDa8QNJGCIqcPaMJR4DaSRgLLUQ83Q-Xpu0U';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error
    }
}


//we will check if we scrolled to the end of the page and load more images
//window.innerHeight is referring to the height of the page on the screen that you see and not as whole for example
//the screen length could be 1000px but you see only 400px at the time
//window.scrollY is the value of how much we scrolled down
//document.body.offsetHeight is the height of the whole page including the unseen parts
 window.addEventListener('scroll',() =>{
     if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
     }
 });

getPhotos();
