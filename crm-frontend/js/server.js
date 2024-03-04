function delArrayClientsItem(id) {
    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
    });
}

async function patchArrayClients(item, id) {
    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name: item['name'],
            surname: item['surname'],
            lastName: item['lastName'],
            contacts: item['contacts'],
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

async function saveArrayClients(item) {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
            name: item['name'],
            surname: item['surname'],
            lastName: item['lastName'],
            contacts: item['contacts'],
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

async function loadingArrayClients() {
    const response = await fetch('http://localhost:3000/api/clients');
    const list = await response.json();
    return list;
}