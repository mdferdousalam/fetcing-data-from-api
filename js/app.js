const loadDefaultMenu = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// loadDefaultMenu();

// menu items display function logic code here
const displayDefaultMenu = async () => {
  const data = await loadDefaultMenu();
  const itemsArray = data.data.news_category;
  // console.log(itemsArray);
  itemsArray.forEach((item) => {
    // console.log(item);
    const menu = document.getElementById("menu");
    const menuDiv = document.createElement("a");
    // postId = item.category_id;
    menuDiv.innerHTML = `
        <a class="p-4 text-gray-500 hover:text-sky-400 active:text-sky-400" onclick="relativePost('${item.category_id}')"> ${item.category_name} </a>
    `;
    menu.appendChild(menuDiv);
  });
};

// all time categories menu items should be displayed in the menu div   below the function call.
displayDefaultMenu();

// menu click and more of that category news code here.
const relativePost = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  //   console.log(url);
  const post = await fetch(url);
  const details = await post.json();
  const detailsNewsDiv = document.getElementById("details-news");
  detailsNewsDiv.innerHTML = "";
  const categoryPost = details.data;
  categoryPost.forEach((post) => {
    // console.log(post);
    const detailsDiv = document.createElement("div");
    detailsDiv.innerHTML = `

      <div class="ml-4 mt-7 flex">
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

                  <div class="flex pt-3">
                            <div class="flex-none pt-2"> <img class="img-responsive w-8 rounded-full" src="${
                              post.author.img
                            }" alt=""> 
                            </div>

                            <div <p class="grow pl-3 text-sm ">${
                              post.author.name
                                ? post.author.name
                                : "author name not found"
                            }</p> 
                                <p class="text-sm">${post.author.published_date.slice(
                                  0,
                                  10
                                )}</p> 
                            </div>


                            <div > <span id="font-awesome-icon">
                            
                            </span> <span> ${post.total_view} </span></div>
                     
                   </div>

          </div>

      </div>

      `;

    detailsNewsDiv.appendChild(detailsDiv);
  });
  console.log(details.data);
  //   return details;
};
