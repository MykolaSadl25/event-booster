export function getEvents() {
    return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=PBl0brP6qk41r3o6LHruGQHEHK0yTyK9`).then(res => res.json())
}

// getEvents().then(res=> console.log(res._embedded.events))
