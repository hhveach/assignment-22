import Backbone from 'backbone';
import $ from 'jquery';
import {MegsModels} from './models.js';

const CreateListingView = Backbone.View.extend({
  el: '#app-container',

  events: {
    'submit .form' : 'validateSubmit',
    'click .home' : 'homeClick',
    'click .new-edit' : 'editClick',

  },

  homeClick: function(evt){
    window.location.hash = '';
  },

  editClick: function(evt){
    window.location.hash = 'new';
  },

  _validateItem: function(domEl){
    let item = domEl.item.value;
    let message = document.querySelector('.item-new .input-msg');
    if(item.length === 0){
      message.innerHTML = '*You must enter an item name.';
      message.classList.add('red');
      message.classList.remove('green');
    }
    else {
      message.innerHTML = '&#10003';
      message.classList.add('green');
      message.classList.remove('red');
    }
  },

  _validatePrice: function(domEl){
    let price = domEl.price.value;
    let message = document.querySelector('.price-new .input-msg');
    if(price.length === 0){
      message.innerHTML = '*You must enter an item price.';
      message.classList.add('red');
      message.classList.remove('green');
    }
    else if(isNaN(price) === true){
      message.innerHTML = '*Price must be a numeric value.';
      message.classList.add('red');
      message.classList.remove('green');
    }
    else {
      message.innerHTML = '&#10003';
      message.classList.add('green');
      message.classList.remove('red');
    }
  },

  _validateDescription: function(domEl){
    let description = domEl.description.value;
    let message = document.querySelector('.description-new .input-msg');
    if(description.length === 0){
      message.innerHTML = '*You must enter a description.';
      message.classList.add('red');
      message.classList.remove('green');
    }
    else {
      message.innerHTML = '&#10003';
      message.classList.add('green');
      message.classList.remove('red');
    }

  },

  _validateCategory: function(domEl){
    let category = domEl.category.value;
    let message = document.querySelector('.category-new .input-msg');
    if(category.length === 0){
      message.innerHTML = '&#10003';
      message.classList.add('green');
      message.classList.remove('red');
    }
    else {
      message.innerHTML = '&#10003';
      message.classList.add('green');
      message.classList.remove('red');
    }
  },

  _validateImage: function(domEl){
    let image = domEl.image.value;
    let message = document.querySelector('.imgLink-new .input-msg');
    if(image.length === 0){
      message.innerHTML = '*You must enter an image link.';
      message.classList.add('red');
      message.classList.remove('green');
    }
    else {
      message.innerHTML = '&#10003';
      message.classList.add('green');
      message.classList.remove('red');
    }
  },

  _validateForSale: function(domEl){
    let sale = domEl.sale;
    let message = document.querySelector('.forSale-new .input-msg');
        message.innerHTML = '&#10003';
        message.classList.add('green');
  },

  validateSubmit: function(evt){
    evt.preventDefault();
    let target = evt.target;

    this._validateItem(target);
    this._validatePrice(target);
    this._validateDescription(target);
    this._validateCategory(target);
    this._validateImage(target);
    this._validateForSale(target);

    let newListItem = {
      item: target.item.value,
      price: parseInt(target.price.value),
      forSale: target.sale.checked,
      description: target.description.value,
      imgLink: target.image.value,
      category: target.category.value
    };

    let valObj = function(obj){
      for (var prop in obj){
        if(prop !== 'category' && obj[prop].length === 0){
          alert('Please fill out all required fields to create your listing!');
          return;
        }
        else {
          let newItem = new MegsModels();
          newItem.set(obj);
          // let viewInstance = this;
          newItem.save().then(function(){
          window.location.hash = '';
          });
          return;
        }
    }
  };
    valObj(newListItem);
  },

  buildNewListingHtml: function(){
    let finalStr = `<div class="nav-bar">
                      <h1>Hank's List</h1>
                      <span class="home">Home</span>
                      <span class="new-edit">Add New Listing</span>
                      </div>
                    <div class="column-container">`;

    let homeStr =  `<form class="form">

              <div class="item-new">
                <label>Item Name</label>
                <input type="text" name="item"/>
                <p class="input-msg"></p>
              </div>

              <div class="price-new">
                <label>Price</label>
                <input type="text" name="price"/>
                <p class="input-msg"></p>
              </div>

              <div class="forSale-new">
                <label>For Sale</label>
                <input type="checkbox" name="sale"/>
                <p class="input-msg"></p>
              </div>

              <div class="description-new">
                <label>Description</label>
                <input type="text" name="description"/>
                <p class="input-msg"></p>
              </div>

              <div class="imgLink-new">
                <label>Image Link</label>
                <input name="image"/>
                <p class="input-msg"></p>
              </div>

              <div class="category-new">
                <label>Category (optional)</label>
                <input type="text" name="category"/>
                <p class="input-msg"></p>
              </div>

              <button class="submit-button" type="submit">Submit</button>
              <button class="reset-button">Reset</button>
            </form>`;

            return finalStr + homeStr + `</div>`;
  },

  render: function(){
    this.el.innerHTML = this.buildNewListingHtml();
  },

});

export default CreateListingView;
