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
    postId = item.category_id;
    menuDiv.innerHTML = `
        <a class="p-4 text-gray-500 hover:text-sky-400 active:text-sky-400" onclick="relativePost('${postId}')"> ${item.category_name} </a>
    `;
    menu.appendChild(menuDiv);
  });
};

// all time categories menu items should be displayed in the menu div   below the function call.
displayDefaultMenu();

const relativePost = async (postId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${postId}`;
  console.log(url);
  const post = await fetch(url);
  const details = await post.json();
  console.log(details);
};
