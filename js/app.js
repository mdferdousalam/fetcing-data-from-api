/*
ক্যাটাগরি এ পি আই ফেচ ও লোড ফাংশন 

*/

const loadDefaultMenu = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// loadDefaultMenu();

/*
ক্যাটাগরি গুলো মেনুতে সাজানোর ফাংশন 

*/
// menu items display function logic code here
const displayDefaultMenu = async () => {
  const data = await loadDefaultMenu();
  const itemsArray = data.data.news_category;
  itemsArray.forEach((item) => {
    // console.log(item);
    const menu = document.getElementById("menu");
    const menuDiv = document.createElement("a");
    // postId = item.category_id;
    menuDiv.innerHTML = `
        <a class=" p-1 bg-sky-200  text-gray-500 hover:text-sky-400 active:text-sky-400" onclick="relativePost('${item.category_id}')"> ${item.category_name} </a>
        
    `;

    menu.appendChild(menuDiv);
  });
};

// all time categories menu items should be displayed in the menu div   below the function call.
/*
ক্যাটাগরি গুলো ডিফল্ট ভাবে লোড হয়ে থাকার জন্য কল করে রাখা ফাংশন। 

*/
displayDefaultMenu();

/*
যে কোন ক্যাটাগরিতে ক্লিক করলে ঐ সম্পর্কিত সকল নিউজ দেখানোর ফাংশন ও ইউ আই এখানে।

*/

// menu click and more of that category news code here.
const relativePost = async (category_id) => {
  const spinner = document.getElementById("progress");
  spinner.classList.remove("hidden");

  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  //   console.log(url);
  const post = await fetch(url);
  const details = await post.json();

  // sorting by category view more
  details.data.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  const detailsNewsDiv = document.getElementById("details-news");
  detailsNewsDiv.innerHTML = "";

  const notFound = document.getElementById("not-found");
  notFound.textContent = "";

  if (details.data.length === 0) {
    // console.log("No news for that category");
    notFound.innerText = "Sorry!!! No news found for This category";
    const number = details.data.length;
    document.getElementById("foundNews").innerText =
      number + " news Found in this category";

    return;
  } else {
    const number = details.data.length;
    document.getElementById("foundNews").innerText =
      number + " news Found in this category";
  }

  const categoryPost = details.data;
  categoryPost.forEach((post) => {
    // console.log(post);

    const detailsDiv = document.createElement("div");
    detailsDiv.innerHTML = `

      <div class="ml-4 my-7 md:flex sm:text-center md:text-left rounded bg-sky-200">
                <div class="flex-none">
                <img class="img-responsive w-48 h-48" src="${
                  post.thumbnail_url
                }" alt="">
              </div>
                 <div class="grow mt-5 pl-4" >
              <h1 class="text-xl font-bold">${post.title}</h1>
              <p>${
                post.details.length > 180
                  ? post.details.slice(0, 180) + "..."
                  : post.details
              }</p>
              
              

                  <div class="flex flex-auto pt-3">
                            <div class="flex-none pt-2"> <img class="img-responsive w-8 rounded-full" src="${
                              post.author.img
                            }" alt=""> 
                            </div>

                            <div <p class=" flex-none pl-3 text-sm ">${
                              post.author.name ? post.author.name : "not found"
                            }</p> 
                                <p class="text-sm">${
                                  post.author.published_date
                                    ? post.author.published_date.slice(0, 10)
                                    : "Not Found"
                                }</p> 
                            </div>


                            <div class="flex mx-auto" >
                            <span class=" flex-auto pl-7  pt-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg></span>
                             <span class=" pl-1 pt-2">  ${
                               post.total_view ? post.total_view : "  Not Found"
                             } M</span></div>



                             <div class=" mx-auto  pt-2 flex">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                           </svg>
                            </div>
     
                            <button onclick="loadDetails('${
                              post._id
                            }')" id=modal-btn> 
                            
                            <a href="#my-modal-2" class=" bg-sky-200"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6  mx-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                          </a>
                            </button>
                            
                                                                     
                   </div>
          </div>
          
      </div>
     
      `;

    detailsNewsDiv.appendChild(detailsDiv);
    // spinner stop here
    const spinnerstop = document.getElementById("progress");
    spinnerstop.classList.add("hidden");
  });

  // console.log(details.data);
  // return categoryPost;
};

const loadDetails = async (news_id) => {
  try {
    const url2 = `https://openapi.programming-hero.com/api/news/${news_id}`;
    // console.log(url2);
    const feedback = await fetch(url2);
    const relativeNews = await feedback.json();
    modalOpen(relativeNews.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const modalOpen = (newsDetail) => {
  // console.log("newsDetail");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
            <img src="${newsDetail.image_url}">
            <h3 class="font-medium ">${newsDetail.title}</h3>
            <h3 class="font-medium ">${
              newsDetail.author.name ? newsDetail.author.name : "Not Found"
            }</h3>
            <h3 class="font-medium ">${newsDetail.author.published_date.slice(
              0,
              10
            )}</h3>
            <p class="py-4">${newsDetail.details}
            </p>
            <div class="modal-action">
                <a href="#" class="btn">Close</a>
            </div>
  
  `;
};
