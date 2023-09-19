

// Time Convert
function convertTimesToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}hrs ${minutes}min ${seconds} ago`;
}


// Tab Container
const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json();
    const allData = data.data;
    // tab container
    const tabContainer = document.getElementById("tab-container");
    // tab container and ForEach
    allData.forEach((element => {
        console.log(element);
        const div = document.createElement("div")
        div.innerHTML = `
        <tab onclick="handleNews('${element.category_id}')"class="tab rounded bg-gray-400 hover:bg-gray-400">${element.category}</tab>`;
        tabContainer.appendChild(div);
    })); 
}


// Card Container Section And forEach
 const handleNews = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();

    console.log(data.data);


    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    
    const handlEsearchEmpty = (news) => {
      if(news.length < 1){
        document.getElementById("search-empty").classList.remove('hidden');
        return;
      }
      else{
        document.getElementById("search-empty").classList.add('hidden');
      }
    }
    handlEsearchEmpty(data.data)
  

    data.data.forEach((news => {
        console.log(news);
        const div = document.createElement("div");


      // Date Convert Call
      const postedTime = convertTimesToTime(news.others.posted_date);

      div.innerHTML = `
      <div class="card bg-base-100 shadow-sm bg-slate-100 h-[360px] ">
                <figure><img class="h-[200px] w-[316px] rounded " src="${news.thumbnail}" alt="" /></figure>
                <p class="text-end  bg-black text-white rounded mx-auto text-sm mr-10 mt-[-30px]">${postedTime}</p>
              <div class="hero-content flex-row-reverse mt-6">
                  <div class="text-start space-y-1">
                  <h2 class="card-title text-sm font-bold">${news.title}</h2>
                    <div class="flex">
                    <h1 class="text-sm">${news.authors[0].profile_name}</h1>
                    <img class="h-4 gap-4 mt-1" src="./badge.png" alt="">
                    </div>
                    <h1 class="text-sm ">Views: ${news.others.views}</h1>
                  </div>
                <img src="${news.authors[0].profile_picture}" class="rounded-full max-w-sm mr-8 h-16 w-16 shadow-2xl" />
              </div>  
      </div>
          `;          
        cardContainer.appendChild(div);
    }));
 }



//  Blog Questions
document.getElementById("click-btn").addEventListener("click", () => window.location.href="blog.html"
);




handleCategory();
handleNews('1000');