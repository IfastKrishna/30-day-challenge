const pexelsApi = "Z6OvRwIFp0ivGsdlfsdlfePfz0g1sdfsdlkfsasdlfaslsdfTD4ifSU7EYyhuWcCAh8lDA";


const fetchImages = async (query) => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${1}&per_page=${40}&orientation=landscape`, {
        headers: {
            Authorization: pexelsApi
        }   
    });
    const data = await response.json();
    console.log(data)
    return data.photos;
}

const container = document.querySelector(".grid");
console.log(container);

const searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    container.innerHTML = "";
    const query = e.target.elements[0].value;
    const images = await fetchImages(query);
    console.log(images);

    
    images.forEach((image) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("border", "shadow", "relative");
        imageCard.innerHTML = `
            <a href="${image.src.original}"  class="absolute right-0 top-0 bg-blue-500 text-white p-1 rounded-bl-lg" download>Download</a>
            <img src="${image.src.medium}" class="w-full rounded-lg" />
        `;
        container.appendChild(imageCard);
    });

});



