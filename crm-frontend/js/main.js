(() => {

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

  function createArrayClintsItem() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let lastName = document.getElementById('lastName').value;
    let arrayContactsItem = document.querySelector('.contacts__list').childNodes
    let contacts = [];
    for (const i of arrayContactsItem) {
      let arrayContactsValues = i.childNodes
      contacts.push({ type: arrayContactsValues[0].value, value: arrayContactsValues[1].value });
    }
    let arrayClientsItem = { name: name, surname: surname, lastName: lastName, contacts: contacts };
    saveArrayClients(arrayClientsItem);
  }

  function changeArrayClientsItem(clientsItem, arrayClients) {

    let tr = clientsItem.getElementsByTagName('td');
    let titleId = document.getElementById('titleId');
    let contactsListChange = document.querySelector('.contacts__list-change');

    for (const i of arrayClients) {
      if (i['id'] === tr[0].textContent) {
        titleId.textContent = `ID: ${i['id']}`

        document.getElementById('surnameChange').value = i['surname'];
        document.getElementById('nameChange').value = i['name'];
        document.getElementById('lastNameChange').value = i['lastName'];

        let cont = i['contacts']

        for (let i = 0; i < cont.length; i++) {
          let contact = createContact(contactsListChange);
          if ('VkEmailFacebookТелефон'.includes(cont[i]['type'])) {
            contact.contactType.value = cont[i]['type'];
          } else {
            contact.contactType.value = 'Other';
            let event = new Event('change');
            contact.contactType.dispatchEvent(event);
            let select = document.querySelectorAll('.contacts__select');
            select[i].value = cont[i]['type'];
          }
          contact.contactValue.value = cont[i]['value'];
        }
        break;
      }
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

    clientsItem.classList.add('tbody__item');

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

    addContactsIcon(arrayClientsItem, td5);

    del.textContent = 'Удалить';
    del.classList.add('js-open-modal');
    del.setAttribute('data-modal', '3');
    del.addEventListener('click', () => {
      let clientsId = clientsItem.getElementsByTagName('td')[0].textContent;
      document.querySelector('.modal-del__title').setAttribute('data-id', clientsId);
      modalOpen(del);
    });

    change.textContent = 'Изменить';
    change.classList.add('js-open-modal');
    change.setAttribute('data-modal', '2');
    change.addEventListener('click', () => {
      modalOpen(change);
      changeArrayClientsItem(clientsItem, arrayClients);
    });

    td6.append(change, del);
    clientsItem.append(td1, td2, td3, td4, td5, td6);
    return clientsItem;
  }

  function addContactsIcon(arrayClientsItem, td5) {
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

  function removeTable(table) {
    let oldTbody = document.getElementById('tbody');
    oldTbody.remove();

    let tbody = document.createElement('tbody');
    tbody.id = 'tbody';
    tbody.classList.add('tbody');

    table.append(tbody);
  }

  function addTable(arrayClients) {
    for (const item of arrayClients) {
      let clientsItem = createTableItem(item, arrayClients);
      tbody.append(clientsItem);
    }
  }

  function search(arrayClients, filterArrayClients, filter) {
    for (const i of arrayClients) {
      let fullName = [i['surname'], i['name'], i['lastname']].join(' ').toUpperCase();
      if (fullName.includes(filter.toUpperCase())) {
        filterArrayClients.push(i);
      }
    }
  }

  function modalOpen(item) {
    let modalId = item.getAttribute('data-modal');
    let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
    let overlay = document.querySelector('#overlay-modal');
    overlay.setAttribute('data-modal', modalId);

    modalElem.classList.add('active');
    overlay.classList.add('active');
  }

  function sortTable(item, cnt, sort, arrayClients) {
    switch (cnt) {
      case '1':
        arrayClients.sort((prev, next) => {
          if (prev.id > next.id) return 1;
          if (prev.id < next.id) return -1;
        });
        break;

      case '2':
        arrayClients.sort((prev, next) => {
          if ((prev.surname + prev.name + prev.lastname) > (next.surname + next.name + next.lastname)) return 1;
          else if ((prev.surname + prev.name + prev.lastname) < (next.surname + next.name + next.lastname)) return -1;
        });
        break;

      case '3':
        arrayClients.sort((prev, next) => {
          if (prev.createdAt > next.createdAt) return 1;
          else if (prev.createdAt < next.createdAt) return -1;
        });
        break;

      case '4':
        arrayClients.sort((prev, next) => {
          if (prev.updatedAt > next.updatedAt) return 1;
          else if (prev.updatedAt < next.updatedAt) return -1;
        });
        break;
    }
    if (sort === '1') {
      arrayClients.reverse();
      item.setAttribute('sort', '2');
      item.style.color = '#B0B0B0';
      item.childNodes[1].src = './img/Vector.svg';
    } else {
      item.setAttribute('sort', '1');
      item.style.color = '#9873FF';
      item.childNodes[1].src = './img/arrow_downward.svg';
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {

    // document.onreadystatechange = function () {
    //   var state = document.readyState
    //   if (state == 'interactive') {
    //        document.getElementById('contents').style.visibility="hidden";
    //   } else if (state == 'complete') {
    //       setTimeout(function(){
    //          document.getElementById('interactive');
    //          document.getElementById('load').style.visibility="hidden";
    //          document.getElementById('contents').style.visibility="visible";
    //       },1000);
    //   }
    // }

    setTimeout(() => { }, 2000);

    let thSort = document.querySelectorAll('.th-sort');
    let arrayClients = await loadingArrayClients();
    sortTable(thSort[0], '1', '0', arrayClients);
    addTable(arrayClients);

    let overlay = document.querySelector('#overlay-modal'),
      closeButtons = document.querySelectorAll('.js-modal-close');
    let contactsButtons = document.querySelectorAll('.contacts__btn');
    let contactsList = document.querySelector('.contacts__list');
    let contactsListChange = document.querySelector('.contacts__list-change')
    let saveButton = document.querySelector('.modal__save');
    let searcher = document.getElementById('search');
    let table = document.getElementById('table');
    let btn = document.querySelector('.main__btn');

    thSort.forEach((item) => {
      item.addEventListener('click', () => {
        let cnt = item.getAttribute('data-sort');
        let sort = item.getAttribute('sort');
        sortTable(item, cnt, sort, arrayClients);
        removeTable(table);
        addTable(arrayClients);
      });
    });

    btn.addEventListener('click', () => {
      modalOpen(btn);
    });

    searcher.addEventListener('input', async () => {
      let filterArrayClients = [];
      arrayClients = await loadingArrayClients();
      setTimeout(search(arrayClients, filterArrayClients, searcher.value), 300);
      removeTable(table);
      addTable(filterArrayClients);
    })

    document.getElementById('change-del').addEventListener('click', () => {
      let id = document.getElementById('titleId').textContent.split(' ')[1];
      let clientsItem = tbody.childNodes;
      for (const i of clientsItem) {
        if (i.childNodes[0].textContent === id) {
          delArrayClientsItem(id);
          i.remove();
          break;
        }
      }
    });

    document.querySelector('.modal-del__btn').addEventListener('click', () => {
      const id = document.querySelector('.modal-del__title').getAttribute('data-id')
      let clientsItem = tbody.childNodes;
      for (const i of clientsItem) {
        if (i.childNodes[0].textContent === id) {
          delArrayClientsItem(id);
          i.remove();
          break;
        }
      }
    });

    closeButtons.forEach((item) => {
      item.addEventListener('click', () => {
        let modalId = item.getAttribute('data-modal');
        let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

        modalElem.classList.remove('active');
        overlay.classList.remove('active');
        // document.getElementById('titleId').textContent = '';

        Object.keys(contactsList.childNodes).reverse()
          .forEach((index) => {
            contactsList.childNodes[index].remove();
          });

        Object.keys(contactsListChange.childNodes).reverse()
          .forEach((index) => {
            contactsListChange.childNodes[index].remove();
          });
      });
    });

    contactsButtons.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item === contactsButtons[1]) {
          createContact(contactsListChange);
        } else {
          createContact(contactsList);
        }
      });
    });

    saveButton.addEventListener('click', async (e) => {
      // e.preventDefault();
      createArrayClintsItem();
      arrayClients = await loadingArrayClients();

      let modalElem = document.querySelector('.modal[data-modal="1"]');
      modalElem.classList.remove('active');
      overlay.classList.remove('active');

      removeTable(table);
      addTable(arrayClients);
    });

    document.getElementById('change').addEventListener('click', (e) => {
      // e.preventDefault();
      let id = document.getElementById('titleId').textContent.split(' ')[1];

      for (const i of arrayClients) {
        if (i['id'] === id) {
          i['name'] = document.getElementById('nameChange').value;
          i['surname'] = document.getElementById('surnameChange').value;
          i['lastName'] = document.getElementById('lastNameChange').value;

          let arrayContactsItem = document.querySelector('.contacts__list-change').childNodes
          let contacts = [];
          for (const i of arrayContactsItem) {
            let arrayContactsValues = i.childNodes
            if (arrayContactsValues[1].value !== '') {
              contacts.push({ type: arrayContactsValues[0].value, value: arrayContactsValues[1].value });
            }
          }
          i['contacts'] = contacts;
          patchArrayClients(i, id);
          break;
        }
      }
    });

  });
})();
