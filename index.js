const createBookHTML = (book) => {
  return `<div class="card mb-5 border border-1" style="width: 20rem;">
      <img src="${book.img}" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.price}€</p>
        <button href="#" class="btn btn-primary">Skip</button>
      </div>
    </div>`;
};

const call = async function () {
  try {
    let DataFromUrl = await fetch("https://striveschool-api.herokuapp.com/books");
    console.log(DataFromUrl);
    if (DataFromUrl.ok) {
      let books = await DataFromUrl.json();
      console.log(books);
      let remainingBooks = books.length;
      const threePartBooks = Math.ceil(remainingBooks / 3);
      let col1 = document.getElementById("col1");
      let col2 = document.getElementById("col2");
      let col3 = document.getElementById("col3");

      for (let i = 0; i < remainingBooks; i++) {
        let book = books[i];
        let column = i < threePartBooks ? col1 : i < 2 * threePartBooks ? col2 : col3;
        column.innerHTML += createBookHTML(book);
      }

      let buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          button.closest(".card").remove();
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
call();
