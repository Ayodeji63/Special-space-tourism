const destinationContainer = document.querySelector('.destination .main');
const body =  document.querySelector('body');
const sections = document.querySelectorAll('section');
const navbars = document.querySelectorAll('nav li a');
const destContainer = document.querySelector('.destination .main');
const destMain = document.querySelector('.destination');
const crewContainer = document.querySelector('.crew .main');
const crewMain = document.querySelector('.crew');
const techContainer = document.querySelector('.technology .main');
const techMain = document.querySelector('.technology');
const harmburger = document.querySelector('.hamburger');
const close = document.querySelector('.close');
const nav = document.querySelector('nav');


let linksElement;
let articleElement;
let tabsElement;
let tabArticle;
let techElement;
let techArticle;

/******** Event Listeners ********* */
destMain.addEventListener('click', (e) => {
  articleLinks(e)
});
crewMain.addEventListener('click', (e) => {
  crewLinks(e);
});
techMain.addEventListener('click', (e) => {
  techLinks(e);
})
body.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  if (id) {
    navbars.forEach(nav => {
      nav.classList.remove('active');
      e.target.classList.add('active');
    });
    sections.forEach(section => {
      section.classList.add('hidden')
      const element = document.getElementById(id);
      element.classList.remove('hidden');
    })
  }
})
harmburger.addEventListener('click', () => {
  if (nav.classList.contains('hidden')) {
    nav.classList.remove('hidden')
  }
 nav.classList.add('show');
});
close.addEventListener('click', () => {
  nav.classList.remove('show')
  nav.classList.add('hidden');
})





/*****Get Data ****** */
function fetchData() {
  return  fetch('./data.json')
.then(response => response.json())
.then(data => {
           return data;
})
}

  fetchData().then(data => {
    showDestinations(data, 'destinations'); 
    showCrew(data, "crew");
    showTechnology(data, "technology", decision);
  })

  /********functions ****** */
  function getWidth() {
    let size;
    if (techMain.getBoundingClientRect().width < '997' ) {
      size = 'land';
    }
    else {
      size = 'port';
    }
    return size;
  }
 let decision = getWidth();


  function showDestinations(data, values) {
    let elementHtml = "";
    let elements = data[values]
    elements.forEach(element => {
      elementHtml += `   <article class = "hidden"  id ="${element.name}">
      <div class="row">
        <!--===== first div start =====  -->
        <div class="first-div">
          <h3> <span>01</span> Pick your destination
         </h3>
        <div class="img">
          <img src="${element.images.png}" alt="">
        </div>
         </div>
          <!--===== first div end =====  -->

          <!--===== second div start =====  -->
          <div class="second-div">
            <div class="links">
              <ul>
               <li><a href="#" class="active" data-set="Moon">Moon</a></li>
               <li><a href="#" data-set="Mars">Mars</a></li>
               <li><a href="#" data-set="Europa">Europa</a></li>
               <li><a href="#" data-set="Titan">Titan</a></li>
              </ul>
            </div>
            <div class="text">
                <h1>${element.name}</h1>
            <p>${element.description}</p>
            </div>
            <div class="information">
              <div class="distance">
                <p>AVG. distance</p>
                <h3>${element.distance}</h3>
              </div>
              <div class="duration">
                <p>EST. Travel time</p>
                <h3>${element.travel}</h3>
              </div>
            </div>
            </div>
          
          <!--===== second div ends =====  -->
      </div>
    </article> `;
    
    });

    destContainer.innerHTML += elementHtml;
    destContainer.children[0].classList.remove('hidden');
    const articles = document.querySelectorAll('.destination article');
    const links = document.querySelectorAll('.links li a');
    articleElement = articles
    linksElement = links;

  }

  function articleLinks(e) {
    const id = e.target.dataset.set;

    if (id) { 
      linksElement.forEach(link => {
       link.classList.remove('active');
      });
      articleElement.forEach(article => {
        article.classList.add('hidden');
        const element = document.getElementById(id);
        element.classList.remove('hidden');
        const currentLink = element.querySelectorAll('li a');
        currentLink.forEach(current => {
          if (id === current.dataset.set) {
            current.classList.add('active');
          }
        })
      })
    }
  }

  function showCrew(data, values) {
    let elementHtml = "";
    let elements = data[values]
    elements.forEach(element => {
      elementHtml += ` <article class = "hidden" id = "${element.id}">
      <div class="row">
         <!--===== first div start =====  -->
         <div class="first-div">
           <div class="text">
         
         <h4>${element.role}</h4>
         <h2>${element.name}</h2>
         <p>${element.bio}<p>
        </div>
        <div class="tabs">
          <span class ="active" data-tab ="one"></span>
          <span data-tab ="two"></span>
          <span data-tab ="three"></span>
          <span data-tab ="four"></span>
        </div>
         </div>
          <!--===== first div end =====  -->
          <!-- ==== second div start ==== -->
          <div class="second-div">
            <div class="img">
              <img src="${element.images.png}" alt="">
            </div>
          </div>
          <!-- ==== second div ends ==== -->
      </div>
      </article>`;
    
    });
    crewContainer.innerHTML = elementHtml;
    crewContainer.children[0].classList.remove('hidden');
    const crewTabs = document.querySelectorAll('.crew .tabs span');
    tabsElement = crewTabs;
    const crewArticle = document.querySelectorAll('.crew article');
    tabArticle = crewArticle;
  }


  function crewLinks(e) {
    let id = e.target.dataset.tab;

    if (id) {
      tabsElement.forEach(tab => {
        tab.classList.remove('active');
      });
      tabArticle.forEach(article => {
      if (!article.classList.contains("hidden")) {
        article.classList.add('hidden');
      }
        const element = document.getElementById(id);
       element.classList.remove('hidden')
        tabsElement.forEach(tab => {
          if (id === tab.dataset.tab) {
            tab.classList.add('active')
          }
        })
      })
    }
  }

 
  function showTechnology(data, values, decision) {
    let elementHtml = "";
    let elements = data[values]
    elements.forEach(element => {
      elementHtml += `  <article class="hidden" id = "${element.id}" data-article = "article">
      <div class="row">
         <!--===== first div start =====  -->
         <div class="first-div">
          <div class="tabs">
            <span data-tech= "vehicle" class = "active">1</span>
            <span data-tech= "spaceport">2</span>
            <span data-tech= "capsule">3</span>
          </div>
           <div class="text">
         <h4>the techology...</h4>
         <h2>${element.name}</h2>
         <p>${element.description}</p>
        </div>
        
         </div>
          <!--===== first div end =====  -->
          <!-- ==== second div start ==== -->
          <div class="second-div">
          <div class="img">
              <img src="${element.images.port}" alt="">
            </div> 
          </div>
          <!-- ==== second div ends ==== -->
  
          
      </div>
      </article>`;
    
    });

    techContainer.innerHTML = elementHtml;
    techContainer.children[0].classList.remove('hidden');
     
    const DataArticle = document.querySelectorAll('[data-article]');

    const techTabs = document.querySelectorAll('.technology .tabs span');
    techArticle = DataArticle;
    techElement = techTabs ;
  }

  function techLinks(e) {
    let id  = e.target.dataset.tech;
    if (id) {
      techElement.forEach(tab => {
        tab.classList.remove('active');
      });
      techArticle.forEach(article => {
        if (!article.classList.contains('hidden')) {
          article.classList.add('hidden')
        }
        const element = document.getElementById(id);
        element.classList.remove('hidden');
        techElement.forEach(tab => {
          if (id === tab.dataset.tech) {
            tab.classList.add('active')
          }
        })
      })
    }
  }

