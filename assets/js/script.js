let menuItems = [];

function getMenu() {
  return fetch('https://adityapandey1111.github.io/Food-Delivery-JSON/FoodDelivery.json')
    .then(response => response.json())
    .then(data => {
      menuItems = data;
      const menuContainer = document.getElementById('menu');
      menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.setAttribute('data-id', item.id); // Add data-id attribute
        const itemImg = document.createElement('img');
        itemImg.src = item.imgSrc;
        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        const orderButton = document.createElement('button');
        orderButton.textContent = 'Place Order';
        orderButton.classList.add('order-button');
        itemDiv.appendChild(itemImg);
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(orderButton);
        // <a id="takeOrderBtn" class="button menu__button">Place Order</a>
        orderButton.addEventListener('click', () => {
            takeOrder().then(orderedItems => {
                console.log('Ordered Items:', orderedItems);
                orderPrep().then(orderStatus => {
                  console.log('Order Status:', orderStatus);
                  payOrder().then(paymentStatus => {
                    console.log('Payment Status:', paymentStatus);
                    thankyouFnc(orderedItems);
                  });
                });
              });
        });
        menuContainer.appendChild(itemDiv);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function getSelectedItems() {
  const selectedItems = [];
  const selectedDivs = document.getElementsByClassName('selected');
  for (let i = 0; i < selectedDivs.length; i++) {
    const selectedDiv = selectedDivs[i];
    const itemId = parseInt(selectedDiv.getAttribute('data-id'));
    const selectedItem = menuItems.find(item => item.id === itemId);
    selectedItems.push(selectedItem);
  }
  return selectedItems;
}

function updateTakeOrderButton() {
  const selectedItems = getSelectedItems();
  const takeOrderBtn = document.getElementById('takeOrderBtn');
  takeOrderBtn.disabled = selectedItems.length === 0;
}

function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = [
          { id: 1, name: 'Cheeseburger', price: 5.99 },
          { id: 2, name: 'Veggie Burger', price: 8.99 },
          { id: 3, name: 'Chicken Burger', price: 10.99 }
        ];
        const selectedBurgers = burgers.slice(0, 3);
        const selectedItems = getSelectedItems();
        const orderedItems = selectedBurgers.concat(selectedItems);
        resolve(orderedItems);
      }, 2500);
    });
  }

  
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }

  
  
  async function handlePromises() {
    try {
      await getMenu();
      const orderedItems = await takeOrder();
      console.log('Ordered Items:', orderedItems);
      const orderStatus = await orderPrep();
      console.log('Order Status:', orderStatus);
      const paymentStatus = await payOrder();
      console.log('Payment Status:', paymentStatus);
      thankyouFnc();
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    getMenu();
  });