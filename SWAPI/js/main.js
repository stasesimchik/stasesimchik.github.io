let heroList = localStorage.getItem('heroes') ? JSON.parse(localStorage.getItem('heroes')) : [];

function getInfoFromLS(searchIndex) {
  document.getElementById('modalOpen').setAttribute('data-toggle', 'modal');
  document.getElementById('modalOpen').setAttribute('data-target', '#exampleModal')
  document.getElementById('name').textContent = searchIndex.name;
  document.getElementById('height').textContent = searchIndex.height;
  document.getElementById('mass').textContent = searchIndex.mass;
  document.getElementById('hairColor').textContent = searchIndex.hairColor;
  document.getElementById('skinColor').textContent = searchIndex.skinColor;
  document.getElementById('eyeColor').textContent = searchIndex.eyeColor;
  document.getElementById('birthYear').textContent = searchIndex.birthYear;
  document.getElementById('gender').textContent = searchIndex.gender;
};

function getRequest(index) {
  document.getElementById('modalOpen').setAttribute('data-toggle', 'modal');
  document.getElementById('modalOpen').setAttribute('data-target', '#exampleModal')

  fetch(`https://swapi.dev/api/people/${index}/`)
    .then(response => response.json())
    .then(function(hero) {
      document.getElementById('name').textContent = hero.name;
      document.getElementById('height').textContent = hero.height;
      document.getElementById('mass').textContent = hero.mass;
      document.getElementById('hairColor').textContent = hero.hair_color;
      document.getElementById('skinColor').textContent = hero.skin_color;
      document.getElementById('eyeColor').textContent = hero.eye_color;
      document.getElementById('birthYear').textContent = hero.birth_year;
      document.getElementById('gender').textContent = hero.gender;

      heroList.push({ name: hero.name,
                      height: hero.height,
                      mass: hero.mass,
                      hairColor: hero.hair_color,
                      skinColor: hero.skin_color,
                      eyeColor: hero.eye_color,
                      birthYear: hero.birth_year,
                      index: index,
                      gender: hero.gender});
                      
    localStorage.setItem('heroes', JSON.stringify(heroList));
    })
};

modalOpen.addEventListener('click', function(e){
  e.preventDefault();

  let index = document.getElementById('heroes').value;
  let searchIndex = heroList.find(item => item.index == index);

  (heroList.length == 0) ? getRequest(index):
  (searchIndex) ? getInfoFromLS(searchIndex):getRequest(index);  
      
})

