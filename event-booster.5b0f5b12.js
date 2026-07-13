async function e(e){let t=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=PBl0brP6qk41r3o6LHruGQHEHK0yTyK9&page=${e}`);return await t.json()}let t=0,n=document.querySelector(".event__list"),s=document.querySelector(".observer");function a(e){let t=e.map(e=>{let{id:t,name:n,images:s,dates:{start:{localDate:a}},_embedded:{venues:[{city:{name:i}}]}}=e;return`
      <li class="event__item" data-id="${t}">
        <img class="event__poster" src="${s[0].url}" alt="${n}">
        <h2 class="event__name">${n}</h2>
        <p class="event__date">${a}</p>
        <p class="event__map">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 0C1.57011 0 0 1.55933 0 3.47595C0 5.88495 3.50344 10 3.50344 10C3.50344 10 7 5.76648 7 3.47595C7 1.55933 5.42995 0 3.5 0ZM4.55602 4.49371C4.26484 4.78284 3.88245 4.92743 3.5 4.92743C3.11761 4.92743 2.7351 4.78284 2.44404 4.49371C1.86173 3.91547 1.86173 2.97455 2.44404 2.39624C2.72601 2.11609 3.10108 1.96179 3.5 1.96179C3.89892 1.96179 4.27393 2.11615 4.55602 2.39624C5.13833 2.97455 5.13833 3.91547 4.55602 4.49371Z" fill="white" />
</svg>
          ${i}
        </p>
        <div  class="event__position"></div>
      </li>
    `}).join("");n.insertAdjacentHTML("beforeend",t)}e(t).then(e=>a(e._embedded.events)),new IntersectionObserver(n=>{n.forEach(async n=>{n.isIntersecting&&(t++,a((await e(t))._embedded.events))})},{rootMargin:"200px"}).observe(s);
//# sourceMappingURL=event-booster.5b0f5b12.js.map
