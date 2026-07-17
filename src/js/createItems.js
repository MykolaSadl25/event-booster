import { getEvents } from "./getEvents";
import debounce from "lodash.debounce";
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";

let page = 0;
let imgURL = null;
let date = null;
let code = "US";
let keyword = "";

const eventListRef = document.querySelector(".event__list");
const endPoint = document.querySelector(".observer")
const keywordSearch = document.querySelector(".header_search_input")
const countryCode = document.querySelector(".header_country_select");



function createItems(events) {
  const items = events.map((event) => {
      const {
        id,
        name: eventName,
        images,
        dates: {
          start: { localDate },
        },
        _embedded: {
          venues: [
            {
              city: { name: cityName },
            },
          ],
        },
      } = event;

      return `
      <li data-aos="flip-up" class="event__item" data-id="${id}">
        <img class="event__poster" src="${images[0].url}" alt="${eventName}">
        <h2 class="event__name">${eventName}</h2>
        <p class="event__date">${localDate}</p>
        <p class="event__map">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 0C1.57011 0 0 1.55933 0 3.47595C0 5.88495 3.50344 10 3.50344 10C3.50344 10 7 5.76648 7 3.47595C7 1.55933 5.42995 0 3.5 0ZM4.55602 4.49371C4.26484 4.78284 3.88245 4.92743 3.5 4.92743C3.11761 4.92743 2.7351 4.78284 2.44404 4.49371C1.86173 3.91547 1.86173 2.97455 2.44404 2.39624C2.72601 2.11609 3.10108 1.96179 3.5 1.96179C3.89892 1.96179 4.27393 2.11615 4.55602 2.39624C5.13833 2.97455 5.13833 3.91547 4.55602 4.49371Z" fill="white" />
</svg>
          ${cityName}
        </p>
        <div  class="event__position"></div>
      </li>
    `;
    })
    .join("");

  eventListRef.insertAdjacentHTML("beforeend",items)
}

async function render(keyword,countryCode,page) {
  const res = await getEvents(keyword,countryCode,page)
  if (!res._embedded) {
    if (page === 0) {
      eventListRef.innerHTML = "<p>No events found.</p>";
      info({
  title: 'No events(',
  text: 'There is no events in your country. Try picking another country maybe there are some events.'
});
    }
    return;
  }

  createItems(res._embedded.events);
}

keywordSearch.addEventListener("input",debounce((e)=>{
  keyword = e.target.value;
  page = 0;
  eventListRef.innerHTML = "";
  render(keyword,code,page)
},500));

countryCode.addEventListener("input",(e)=>{
  code = e.target.value;
  page = 0;
  eventListRef.innerHTML = "";
  render(keyword,code,page)
});

render(keyword,code,page)

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(async entry=>{
    if (entry.isIntersecting) {
            page++
            const res = await getEvents(keyword, code, page)
             render(keyword, code, page)
        }
  })
},{
  rootMargin:"200px"
})

observer.observe(endPoint)

//  afsdfdsfdsf