export async function getEvents(page) {
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=PBl0brP6qk41r3o6LHruGQHEHK0yTyK9&page=${page}`);
    const info = await res.json()
    return info
}


// bhasbdhbasd
// getEvents().then(res=> console.log(res._embedded.events))
