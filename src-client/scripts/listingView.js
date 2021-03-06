import Backbone from 'backbone';
import $ from 'jquery';
import {MegsModels, MegsCollections} from './models.js';

const ListingView = Backbone.View.extend({
  el: '#app-container',

  events: {
    'click .home' : 'homeClick',
    'click .fa-trash' : 'delete',
    },

  delete: function(){
      let deleteModel = new MegsModels();
      deleteModel.set({_id: window.location.hash.slice(6)});
      deleteModel.destroy().then(function(){
        window.location.hash = '';
      });
  },

  homeClick: function(evt){
    window.location.hash = '';
  },

  listingHtml: function(model){
    let sale = model.get('forSale');
    let find = function(sale){
      if(sale === 1){
        return 'Yes';
      }
      else if (sale === 0){
        return 'No';
      }
    }
    let final = find(sale);

    let finalStr = `<div class="nav-bar">
                      <h1>Hank's List</h1>
                      <span class="home">Home</span>
                      <span class="new-edit"><i class="fa fa-plus" aria-hidden="true"></i> Listing</span>
                      </div>
                    <div class="column-container">

                    <div class="single-view-img">
                      <img src="${model.get('imgLink')}"/>
                    </div>
                    <div class="single-view-description" data-id="${model.get('_id')}">
                      <h1>${model.get('item')}</h1>
                      <h3>$${model.get('price')}</h3>
                      <h3>For Sale: ${final}</h3>
                      <p>${model.get('description')}</p>
                    </div>
                    <div class="delete">
                    <p class="red">Delete this listing? (this action cannot be undone)<span><i class="fa fa-trash" aria-hidden="true"></i></span></p>
                    </div>
                    </div>`;
    return finalStr;
  },

  render: function(data){
    this.el.innerHTML = this.listingHtml(data);
  },
});

export default ListingView;
