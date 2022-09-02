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
    console.log(item);
    const menu = document.getElementById("menu");
    const menuDiv = document.createElement("a");
    menuDiv.innerHTML = `
        <a class="p-4 text-gray-500 hover:text-sky-400 active:text-sky-400" onclick="displayDetailNews(${item.category_id})"> ${item.category_name} </a>
    `;
    menu.appendChild(menuDiv);
  });
};

// all time categories menu items should be displayed in the menu div   below the function call.
displayDefaultMenu();

const displayDetailNews = async (category_id) => {
  //   console.log("id: " + id);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  console.log("url: " + url);
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;

  //   console.log(data);
};
