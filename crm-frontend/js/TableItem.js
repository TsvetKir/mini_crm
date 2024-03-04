function createContact(contactsList) {
  let contact = document.createElement('li');
  let contactType = document.createElement('select');
  let op1 = document.createElement('option');
  let op2 = document.createElement('option');
  let op3 = document.createElement('option');
  let op4 = document.createElement('option');
  let op5 = document.createElement('option');
  let contactValue = document.createElement('input');
  let btn = document.createElement('button');
  op1.textContent = 'Телефон';
  op2.textContent = 'Email';
  op3.textContent = 'Vk';
  op4.textContent = 'Facebook'
  op5.textContent = 'Другое';
  op5.value = 'Other';

  btn.classList.add('contacts__del');
  contactType.classList.add('contacts__select');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    contact.remove();
  });

  contactType.addEventListener('change', () => {
    if (contactType.value === 'Other') {
      contactType.remove();
      contactType = document.createElement('input');
      contactType.classList.add('contacts__select');
      contact.prepend(contactType);
    }
  });

  contact.classList.add('contacts__item');
  contactType.append(op1, op2, op3, op4, op5);
  contact.append(contactType, contactValue, btn);
  contactsList.append(contact);
  return {
    contact,
    contactType,
    contactValue,
  }
}

function createTableItem(arrayClientsItem, arrayClients) {
  let clientsItem = document.createElement('tr');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td3Time = document.createElement('span');
  let td4 = document.createElement('td');
  let td4Time = document.createElement('span');
  let td5 = document.createElement('td');
  let td6 = document.createElement('td');
  let del = document.createElement('button');
  let change = document.createElement('button');
  let dataTitle;

  td1.textContent = `${arrayClientsItem['id']}`;
  td2.textContent = `${arrayClientsItem['surname'] + ' ' + arrayClientsItem['name']
    + ' ' + arrayClientsItem['lastName']}`
  let createdAt = new Date(arrayClientsItem['createdAt']);
  td3.textContent = createdAt.toLocaleDateString();
  td3Time.textContent = createdAt.toLocaleTimeString().slice(0, -3);
  td3Time.classList.add('tdTime');
  td3.append(td3Time);
  let updatedAt = new Date(arrayClientsItem['updatedAt']);
  td4.textContent = updatedAt.toLocaleDateString();
  td4Time.textContent = updatedAt.toLocaleTimeString().slice(0, -3);
  td4Time.classList.add('tdTime');
  td4.append(td4Time);

  addContactsIcon(arrayClientsItem);
  
  del.textContent = 'Удалить';
  del.classList.add('js-open-modal');
  del.setAttribute('data-modal', '3');

  del.addEventListener('click', () => {
    modalOpen(del);
    let clientsId = clientsItem.getElementsByTagName('td')[0].textContent
    let delClient = document.querySelector('.modal-del__btn');
    delClient.addEventListener('click', () => {
      delArrayClientsItem(clientsId, clientsItem);
    });
  });

  change.textContent = 'Изменить';
  change.classList.add('js-open-modal');
  change.setAttribute('data-modal', '2');

  change.addEventListener('click', () => {
    modalOpen(change);
    changeArrayClientsItem(clientsItem, arrayClients);
  });

  // del.addEventListener('click', () => {
  //   let clientsId = clientsItem.getElementsByTagName('td')[0].textContent
  //   let delClient = document.querySelector('.modal-del__btn');
  //   delClient.addEventListener('click', () => {
  //     delArrayClientsItem(clientsId, clientsItem);
  //   });
  // });

  // change.addEventListener('click', () => {
  //   changeArrayClientsItem(clientsItem, arrayClients);
  // });

  td6.append(change, del);
  clientsItem.append(td1, td2, td3, td4, td5, td6);
  return clientsItem;
}

function addContactsChange() {
  
}

function addContactsIcon(arrayClientsItem) {
  for (let i = 0; i < arrayClientsItem['contacts'].length; i++) {
    let img = document.createElement('img');
    let span = document.createElement('span');
    let tooltip = document.createElement('span');
    switch (arrayClientsItem['contacts'][i]['type']) {
      case 'Телефон':
        img.src = './img/phone.svg';
        break;

      case 'Email':
        img.src = './img/Subtract.svg';
        break;

      case 'Vk':
        img.src = './img/vk.svg';
        break;

      case 'Facebook':
        img.src = './img/fb.svg';
        break;

      default:
        img.src = './img/Subtract-1.svg';
        break;
    }
    if ('VkEmailFacebookТелефон'.includes(arrayClientsItem['contacts'][i]['type'])) {
      dataTitle = arrayClientsItem['contacts'][i]['value'];
    } else {
      dataTitle = arrayClientsItem['contacts'][i]['type'] + ': ' + arrayClientsItem['contacts'][i]['value'];
    }
    tooltip.classList.add('tooltip-text');
    span.classList.add('contact-img', 'tooltip-text');
    span.setAttribute('data-title', dataTitle);
    span.append(img, tooltip);
    td5.append(span);
  }
}