const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const mews = document.querySelector('.mews');
const API_URL = 'http://localhost:5000/mews';

setInterval(() => {
  loadmews();
}, 1000*0.01);
loading.style.display = "none";

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const mew = formData.get('mew');

  const data = {
    name,
    mew
  };

  form.style.display = "none";
  loading.style.display = "";

  fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
    .then(createdMew => {
      form.reset();
      form.style.display = "";
      loadmews();
      loading.style.display = "none";
    });
})

function loadmews(){
  fetch(API_URL).then(response => response.json())
  .then(list => {
    mews.innerHTML = '';
    list.reverse();
    list.forEach(element => {
      let container = document.createElement('div'); 
      
      let heading = document.createElement('h3');
      let content = document.createElement('p');
      let date = document.createElement('small');

      date.className = "date";
      heading.className = "heading";
      content.className = "content";

      date.textContent = element.created;
      heading.textContent = element.name;
      content.textContent = element.content;

      container.appendChild(heading);
      container.appendChild(date);
      container.appendChild(content);

      mews.appendChild(container);
    });
    });
}