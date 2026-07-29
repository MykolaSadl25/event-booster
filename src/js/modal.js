import { getEvents } from "./getEvents";
import debounce from "lodash.debounce";
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";

const API_KEY = "EaVwaSyjrcgjBR5rG4iPpD3xr5XTzSEJ";
const eventListRef = document.querySelector(".event__list");

if (eventListRef) {
  eventListRef.addEventListener("click", async (e) => {
    const card = e.target.closest(".event__item");
    if (!card) return;

    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${card.dataset.id}.json?apikey=${API_KEY}`);
    const event = await res.json();

    openModal(event);
  });
}

function truncateText(text, maxLength = 100) {
  if (!text) return "no info";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

function getTicketUrl(event) {
  return event.url || event._links?.self?.href || "#";
}

function getPriceText(event) {
  const price = event.priceRanges?.[0];
  if (!price) return "You can look at our Website";
  
  const min = price.min ?? 0;
  const max = price.max ?? min;
  const currency = price.currency || "UAH";
  
  return min === max ? `${min} ${currency}` : `${min}-${max} ${currency}`;
}

function openModal(event) {
  const venue = event._embedded?.venues?.[0];
  const imgUrl = event.images?.[0]?.url || "";
  const authorName = event._embedded?.attractions?.[0]?.name || "Artist";

  const rawInfo = event.info || event.pleaseNote || "Sorry, no info.";
  const formattedInfo = truncateText(rawInfo, 100);

  const ticketUrl = getTicketUrl(event);
  const priceText = getPriceText(event);

  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  backdrop.innerHTML = `
    <div class="modal">
      <button class="modal-close-btn" type="button">✕</button>
      
      <div class="circle-thumb">
        <img class="circle" src="${imgUrl}" alt="${authorName}">
      </div>

      <div class="in-modal">
        <img class="modal-img" src="${imgUrl}" alt="${authorName}">

        <div class="modal-text">
          <h2 class="modal-h2">INFO</h2>
          <p class="main-modal-text">${formattedInfo}</p>

          <h2 class="modal-h2">WHEN</h2>
          <p class="main-modal-text">${event.dates?.start?.localDate || "TBA"}<br>${event.dates?.start?.localTime || ""} (${event.dates?.timezone || ""})</p>

          <h2 class="modal-h2">WHERE</h2>
          <p class="main-modal-text">${venue?.city?.name || ""}, ${venue?.country?.name || ""}<br>${venue?.name || ""}</p>

          <h2 class="modal-h2">WHO</h2>
          <p class="main-modal-text">${authorName}</p>

          <h2 class="modal-h2">PRICES</h2>
          <p class="main-modal-text">${priceText}</p>

          <a class="modal-button modal-tickets" href="${ticketUrl}" target="_blank" rel="noopener noreferrer">BUY TICKETS</a>
        </div>
      </div>

      <button class="modal-Author" type="button">MORE FROM THIS AUTHOR</button>
    </div>
  `;

  const closeModal = () => backdrop.remove();

  backdrop.querySelector(".modal-close-btn").onclick = closeModal;
  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeModal();
  };

  document.body.appendChild(backdrop);
}

