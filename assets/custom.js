/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line
  
  var perishableZones = document.getElementsByTagName('body')[0].dataset.localDeliveryZones.split(',');

  var currentPostal = document.getElementById('current_postal');
  var containerBtn = document.querySelector('.product_selection_container_p');
  var alertContainer = document.querySelector('.delivery_alert_container_p');
  var methodModalContainer = document.querySelector(".methodModal_container_p");
  var methodDropdownContainer = document.querySelector("#methodDropdown");
  var local_methodContainer = document.querySelector("#methodModal .method_selector_p .local_p");
  var pickup_methodContainer = document.querySelector("#methodModal .method_selector_p .pickup_p");
  var mail_methodContainer = document.querySelector("#methodModal .method_selector_p .mail_p");
  var local_methodContainerDrop = document.querySelector("#methodDropdown .method_selector_p .local_p");
  var pickup_methodContainerDrop = document.querySelector("#methodDropdown .method_selector_p .pickup_p");
  var mail_methodContainerDrop = document.querySelector("#methodDropdown .method_selector_p .mail_p");
  var inputPostalModal = document.getElementById('postalcode');
  var inputPostalDropdown = document.getElementById('postalcode_drop');
  var M1T = document.querySelector('body').dataset.m1t;
  var M2T = document.querySelector('body').dataset.m2t;
  var QAE = document.querySelector('body').dataset.qae;
  var MSA = document.querySelector('body').dataset.msa;
  var mainNav = document.querySelector('.main_nav_wrapper');
  var shippingNav = document.querySelector('.shipping_nav_wrapper');
  var mainNavMob = document.querySelector('.main_menu_mobwrapper');
  var shippingNavMob = document.querySelector('.shipping_menu_mobwrapper');
  var cartItems = document.querySelectorAll('.cart__items .cart-item');
  var checkoutBtn = document.querySelector(`[name="checkout"]`);
  
  window.onresize = () => {
    if (localStorage.getItem('method')) {
      document.getElementById('MainContent').style.marginTop = '0';
    }
  }
  
  window.onload = function() {
    // var zapierContainer = document.querySelectorAll('#storePickupApp .checkoutMethod');
    var mthod = localStorage.getItem("method");
    
    // var waitForInput = () => {
    //   var deliveryGeoSearchField = document.getElementById('deliveryGeoSearchField');
    //   if (!deliveryGeoSearchField) {
    //     setTimeout(waitForInput, 100);
    //     return;
    //   }
    //   deliveryGeoSearchField.value = localStorage.getItem('postalcode') || '';
    //   deliveryGeoSearchField.nextElementSibling.click();            
    // }
    
    // var waitForPickup = () => {
    //   var location = document.querySelector('.locations');
    //   if (!location) {
    //     setTimeout(waitForPickup, 100);
    //     return;
    //   }
    //   switch (localStorage.getItem('postalcode')) {
    //     case M2D1:
    //       location.querySelector('div:first-child').click();
    //       break;
    //     case M2D2: 
    //       location.querySelector('div:last-child').click();
    //       break;
    //     default:
    //       break;
    //   }
    // }
    
    if (mthod == '' || mthod == null) {
      openMethodModal();
    }
    else {
      mainNav.style.display = 'none';
      shippingNav.style.display = 'none';
      mainNavMob.style.display = 'none';
      shippingNavMob.style.display = 'none';
      document.querySelectorAll('.header__wrapper .header__dropdown').forEach((el) => {
        el.classList.add('active');
      });
      if (document.getElementById('template-product')) {
        if (alertContainer && mthod == '3') {
          alertContainer.style.display = 'block';
          containerBtn.style.display = 'none';
        }
      }
      document.querySelectorAll('[data-quick-add-label]').forEach((el) => {
        el.querySelector('small:first-child').innerText = "quick add";
      });
      var method, data;
      switch (localStorage.getItem("method")) {
        case '1':
          // if (zapierContainer[1]) {
          //   zapierContainer[1].click();
          //   setTimeout((e)=>{zapierContainer[0].classList.add('disable')}, 1);
          // }          
          // waitForInput();
          mainNav.style.display = 'block';
          mainNavMob.style.display = 'block';
          method = M1T;
          data = localStorage.getItem("postalcode");
          inputPostalDropdown.value = data;
          inputPostalDropdown.classList.add('active');
          inputPostalDropdown.style.display = 'block';
          break;
        case '2':
          mainNav.style.display = 'block';
          mainNavMob.style.display = 'block';
          method = "Delivery Method";
          data = M2T;
          // if (zapierContainer[1]) {
          //   zapierContainer[2].click();
          //   setTimeout((e)=>{zapierContainer[0].classList.add('disable')}, 1);
          // }          
          // waitForPickup();
          break;
        case '3':
          // if (zapierContainer[1]) {
          //   zapierContainer[0].click();
          // }
          shippingNav.style.display = 'block';
          shippingNavMob.style.display = 'block';
          document.querySelectorAll('[data-quick-add-label]').forEach( el => {
            if (el.dataset.tag != "Shipping") {
              el.querySelector('small:first-child').innerText = QAE;
            }
          });
          method = "Delivery Method";
          data = 'Shipping';
          if (checkoutBtn) {
            cartItems.forEach((el) => {
              if (el.dataset.shipping != 1) {
                // shipping_alert.style.display = 'block';
                checkoutBtn.style.display = 'none';
              }
            });
          }
          break;
      }
      currentPostal.innerHTML = method + ": <span>" + data + "</span>";
      stickHeader();
    }
    
   	// if (zapierContainer[0]) {
 	  // zapierContainer[0].addEventListener('click', (e) => {
    //     cartItems = document.querySelectorAll('.cart__items .cart-item');
    //     cartItems.forEach((el) => {
    //       if (el.dataset.shipping != 1) {
    //         // shipping_alert.style.display = 'block';
    //         checkoutBtn.style.display = 'none';
    //       }
    //     });
	  // });
    // }
    
    // if (zapierContainer[1]) {
 	  // zapierContainer[1].addEventListener('click', (e) => {
    //     // shipping_alert.style.display = 'none';
    //     checkoutBtn.style.display = 'block';
	  // });
    // }
    
    // if (zapierContainer[2]) {
 	  // zapierContainer[2].addEventListener('click', (e) => {
    //     // shipping_alert.style.display = 'none';
    //     checkoutBtn.style.display = 'block';
	  // });
    // }  

    if (document.getElementById('method_confirm_drop')) {
      document.getElementById('method_confirm_drop').onclick = () => {
        document.querySelectorAll('.header__wrapper .header__dropdown').forEach((el) => {
          el.classList.add('active');
        });
        mainNav.style.display = 'none';
        shippingNav.style.display = 'none'
        mainNavMob.style.display = 'none';
        shippingNavMob.style.display = 'none';
        
        var mthd = localStorage.getItem("method"), dtad;
        
        if (mthd == '' || mthd == null) {
          alert(MSA);
          return;
        }
        
        document.querySelectorAll('[data-quick-add-label]').forEach( el => {
          el.querySelector('small:first-child').innerText = "quick add";
        });
        
        switch (mthd) {
          case '1':
            localStorage.setItem('postalcode', inputPostalDropdown.value);
            // if (zapierContainer[1]) {
            //   zapierContainer[1].click();
            //   waitForInput();
            // }
            mainNav.style.display = 'block';
            mainNavMob.style.display = 'block';
            dtad = localStorage.getItem('postalcode');
            var zip = dtad.slice(0, 3);
            if (perishableZones.join(',').toLowerCase().split(',').indexOf(zip.toLowerCase()) == -1){
              document.querySelector('.post_alert_d').style.display = 'block';
              return;
            }
            document.querySelector('.post_alert_d').style.display = 'none';
            currentPostal.innerHTML = M1T + ": <span>" + dtad + "</span>";
            if (alertContainer) {
              alertContainer.style.display = 'none';
              containerBtn.style.display = 'block';
            }
            stickHeader();
            methodDropdownContainer.classList.remove('active');
            if (checkoutBtn) {
              // shipping_alert.style.display = 'none';
              checkoutBtn.style.display = 'block';
            }
            break;
          case '2':
            // if (zapierContainer[2]) {
            //   zapierContainer[2].click();
            // }
            // waitForPickup();
            mainNav.style.display = 'block';
            mainNavMob.style.display = 'block';
            methodDropdownContainer.classList.remove('active');
            if (alertContainer) {
              alertContainer.style.display = 'none';
              containerBtn.style.display = 'block';
            }
            currentPostal.innerHTML = "Delivery Method: <span>" + M2T + "</span>";
            stickHeader();
            if (checkoutBtn) {
              // shipping_alert.style.display = 'none';
              checkoutBtn.style.display = 'block';
            }
            break;
          case '3':
            localStorage.setItem("postalcode", "Shipping");
            // if (zapierContainer[0]) {
            //   zapierContainer[0].click();
            // }
            shippingNav.style.display = 'block';
            shippingNavMob.style.display = 'block';
            document.querySelectorAll('[data-quick-add-label]').forEach( el => {
              if (el.dataset.tag != "Shipping") {
                el.querySelector('small:first-child').innerText = QAE;
              }
            });
            methodDropdownContainer.classList.remove('active');
            currentPostal.innerHTML = "Delivery Method: <span>Shipping</span>";
            if (alertContainer) {
              alertContainer.style.display = 'block';
              containerBtn.style.display = 'none';  
            }
            stickHeader();
            if (checkoutBtn) {
              cartItems = document.querySelectorAll('.cart__items .cart-item');
              cartItems.forEach((el) => {
                if (el.dataset.shipping != 1) {
                  // shipping_alert.style.display = 'block';
                  checkoutBtn.style.display = 'none';
                }
              });
            }
            break;
        }
      }
    }
    
    if (document.getElementById('method_confirm')) {
      document.getElementById('method_confirm').onclick = () => {
        document.querySelectorAll('.header__wrapper .header__dropdown').forEach((el) => {
          el.classList.add('active');
        });
        mainNav.style.display = 'none';
        shippingNav.style.display = 'none'
        mainNavMob.style.display = 'none';
        shippingNavMob.style.display = 'none'
        var mth = localStorage.getItem("method");
        if (mth == '' || mth == null) {
          alert(MSA);
          return;
        }
        var dta = localStorage.getItem('postalcode');
        switch (mth) {
          case '1':
            localStorage.setItem('postalcode', document.querySelector('#methodModal #postalcode').value);
            // if (zapierContainer[1]) {
            //   zapierContainer[1].click();
            //   waitForInput();
            // }
            mainNav.style.display = 'block';
            mainNavMob.style.display = 'block';
            var zip = dta.slice(0, 3);
            if (perishableZones.join(',').toLowerCase().split(',').indexOf(zip.toLowerCase()) == -1){
              document.querySelector('.post_alert_p').style.display = 'block';
              return;
            }
            document.querySelector('.post_alert_p').style.display = 'none';
            currentPostal.innerHTML = M1T + ": <span>" + dta + "</span>";
            if (alertContainer) {
              alertContainer.style.display = 'none';
              containerBtn.style.block = 'block';
            }
            stickHeader();
            inputPostalDropdown.value = document.querySelector('#methodModal #postalcode').value;
            inputPostalDropdown.classList.add('active');
            inputPostalDropdown.style.display = 'block';
            methodModalContainer.classList.remove('active');
            break;
          case '2':
            // if (zapierContainer[2]) {
            //   zapierContainer[2].click();
            // }
            // waitForPickup();
            mainNav.style.display = 'block';
            mainNavMob.style.display = 'block';
            methodModalContainer.classList.remove('active');
            if (alertContainer) {
              alertContainer.style.display = 'none';
              containerBtn.style.display = 'block';
            }
            currentPostal.innerHTML = "Delivery Method: <span>" + M2T + "</span>";
            stickHeader();
            break;
          case '3':
            localStorage.setItem("postalcode", "Shipping");
            // if (zapierContainer[0]) {
            //   zapierContainer[0].click();
            // }
            shippingNav.style.display = 'block';
            shippingNavMob.style.display = 'block';
            methodModalContainer.classList.remove('active');
            currentPostal.innerHTML = "Delivery Method: <span>Shipping</span>";
            if (alertContainer) {
              alertContainer.style.display = 'block';
              containerBtn.style.display = 'none';  
            }
            else {
              if (containerBtn) {
                containerBtn.style.display = 'block';
              }
            }
            stickHeader();
            break;
        }
      }
    }
    
    if (local_methodContainerDrop) {
      local_methodContainerDrop.onclick = () => {
        local_methodContainerDrop.classList.add('active');
        mail_methodContainerDrop.classList.remove('active');
        pickup_methodContainerDrop.classList.remove('active');
        inputPostalDropdown.style.display = 'block';
        inputPostalDropdown.classList.remove('active');
        localStorage.setItem("method", 1);
      }
    }
    
    if (pickup_methodContainerDrop) {
      pickup_methodContainerDrop.onclick = () => {
        local_methodContainerDrop.classList.remove('active');
        mail_methodContainerDrop.classList.remove('active');
        pickup_methodContainerDrop.classList.add('active');
        inputPostalDropdown.classList.add('active');
        document.querySelector('.post_alert_d').style.display = 'none';
        localStorage.setItem("method", 2);
      }
    }
    
    if (mail_methodContainerDrop) {
      mail_methodContainerDrop.onclick = () => {
        local_methodContainerDrop.classList.remove('active');
        pickup_methodContainerDrop.classList.remove('active');
        mail_methodContainerDrop.classList.add('active');
        document.querySelector('.post_alert_d').style.display = 'none';
        inputPostalDropdown.classList.add('active');
        localStorage.setItem("method", 3);
      }
    }
    
    if (local_methodContainer) {
      local_methodContainer.onclick = () => {
        local_methodContainer.classList.add('active');
        mail_methodContainer.classList.remove('active');
        pickup_methodContainer.classList.remove('active');
        inputPostalModal.style.display = 'block';
        localStorage.setItem("method", 1);
      }
    }
    
    if (pickup_methodContainer) {
      pickup_methodContainer.onclick = () => {
        local_methodContainer.classList.remove('active');
        mail_methodContainer.classList.remove('active');
        pickup_methodContainer.classList.add('active');
        inputPostalModal.style.display = 'none';
        document.querySelector('.post_alert_p').style.display = 'none';
        localStorage.setItem("method", 2);
      }
    }
    
    if (mail_methodContainer) {
      mail_methodContainer.onclick = () => {
        local_methodContainer.classList.remove('active');
        mail_methodContainer.classList.add('active');
        pickup_methodContainer.classList.remove('active');
        inputPostalModal.style.display = 'none';
        document.querySelector('.post_alert_p').style.display = 'none';
        localStorage.setItem("method", 3);
      }
    }

	if (document.getElementById('change_code_p')) {
      document.getElementById('change_code_p').onclick = () => {
        openMethodDropdown()
      }
    }
    
    if (document.getElementById('change_postal')) {
      document.getElementById('change_postal').onclick = () => {
        openMethodDropdown()
      }
    }
    
    if (document.querySelector('.close_tip_modal_p')) {
      document.querySelector('.close_tip_modal_p').onclick = () => {
        document.querySelector('.tipModal_container_p').classList.remove('active');
      }
    }
    
    if (document.getElementById('tip_modal_p')) {
      document.getElementById('tip_modal_p').onclick = () => {
        document.querySelector('.tipModal_container_p').classList.add('active');
      }
    }
    
    if (document.querySelector('.close_method_dropdown_p')) {
      document.querySelector('.close_method_dropdown_p').onclick = () => {
        closeMethodDropdown();
      }
    }
    
    if (document.querySelector('.close_method_modal_p')) {
      document.querySelector('.close_method_modal_p').onclick = () => {
        closeMethodModal();
      }
    }    

    function stickHeader() {
      document.querySelector('.header__postal_code_bar_p').classList.add('active');
      if (document.getElementById('template-product') && document.querySelector('.product__page .form__wrapper.is-sticky.with-sticky-header')) {
        document.querySelector('.product__page .form__wrapper.is-sticky.with-sticky-header').style.top = '125px';
      }
      if (document.querySelector('.template-index') == undefined) {
        document.getElementById('MainContent').style.marginTop = '29px';
      }
    }

    function closeMethodDropdown() {
      methodDropdownContainer.classList.remove("active");
    }
    
    function closeMethodModal() {
      document.querySelector(".methodModal_container_p").classList.remove("active");
    }
    
    function openMethodDropdown() {
      switch(localStorage.getItem("method")) {
        case "1":
          local_methodContainerDrop.classList.add('active');
          inputPostalDropdown.classList.remove('active');
          break;
        case "2":
          pickup_methodContainerDrop.classList.add('active');
          break;
        case "3":
          mail_methodContainerDrop.classList.add('active');
          break;
      }
      methodDropdownContainer.classList.add("active");
    }
 
    function openMethodModal() {
      if (methodModalContainer) {
        methodModalContainer.classList.add("active");
      }
    }
    
    var tipID;
    
    document.querySelectorAll('.tip-inputs .percent').forEach((el) => {
      el.addEventListener('click', (e) => {
        var percent = parseInt(el.innerText, 10), tipAmount;
       
        document.querySelectorAll('.tip-inputs .percent').forEach((ele) => {
          ele.classList.remove('active');
        });
        el.classList.add('active');
        
        fetch(theme.routes.root + 'cart.js')
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          tipAmount = Math.ceil(Math.min(100, response.total_price * percent / 10000));
          if (tipAmount > 20 && tipAmount < 26) {
            tipAmount = 25;
          }
          if (tipAmount > 25 && tipAmount < 31) {
            tipAmount = 30;
          }
          if (tipAmount > 30) {
            tipAmount = 35;
          }
          
          fetch(theme.routes.root + 'products/tip.js')
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            response.variants.forEach((variant) => {
              if (parseInt(variant.option1.slice(1), 10) == tipAmount) {
                tipID = variant.id;
              }
            });            
            
          })
          .catch((e) => {
            console.error(e);
          });
        });
      });
    });
    
    if (document.getElementById('tipModal')) {
      document.querySelector('#tipModal button').addEventListener('click', (e) => {
        var flag = true;
        document.querySelectorAll('.tip-inputs .percent').forEach((el) => {
          if (el.classList.value.indexOf('active') > -1) {
            flag = false;
          }
        });
        if (flag) {
          window.alert("Please select the percentage");
        }
        else {
          document.documentElement.dispatchEvent(
            new CustomEvent('cart:add-to-cart', {
              bubbles: true,
              detail: {
                data: {
                  id: tipID,
                  quantity: 1,
                }
              }
            })
          );

          setTimeout((e)=> {
            document.querySelector('.tipModal_container_p').classList.remove('active');
          }, 500);
        }
      });
    }
  };
  
  var callback = (e) => {
    fetch(theme.routes.root + 'cart.js')
    .then(this.handleErrors)
    .then((response) => response.json())
    .then((response) => {
      var freeGiftKey = '', freeVariantId, limitPrice;
      if (document.querySelector('.cart-dropdown__body .cart-dropdown__message')) {
        freeVariantId = document.querySelector('.cart-dropdown__body .cart-dropdown__message').getAttribute('data-id');
        limitPrice = document.querySelector('.cart-dropdown__body .cart-dropdown__message').getAttribute('data-limit');
      }
      if (document.querySelector('.cart')) {
        freeVariantId = document.querySelector('.cart').getAttribute('data-id');
        limitPrice = document.querySelector('.cart').getAttribute('data-limit');
      }
      
      for (var i=0; i<response.items.length; i++) {
        var item = response.items[i];
        if (item.variant_id == freeVariantId) {
          freeGiftKey = item.key;
        }
      }
      
      if (!freeGiftKey && response.items_subtotal_price >= limitPrice * 100) {
        document.documentElement.dispatchEvent(
          new CustomEvent('cart:add-to-cart', {
            bubbles: true,
            detail: {
              data: {
                id: freeVariantId,
                quantity: 1,
              }
            }
          })
        );
      }
      if (freeGiftKey && response.items_subtotal_price < limitPrice * 100) {
        const data = {
          'id': freeGiftKey,
          'quantity': 0
        };
        fetch(theme.routes.root + 'cart/change.js', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
      }
    });
  };
  document.addEventListener('cart:add-item', callback);
  document.addEventListener('cart:updated', callback);

  // ^^ Keep your scripts inside this IIFE function call to 
  // avoid leaking your variables into the global scope.
})();
