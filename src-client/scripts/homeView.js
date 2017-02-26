import Backbone from 'backbone';
import $ from 'jquery';

const HomeView = Backbone.View.extend({
  el: '#app-container',

  events: {
    'click .home-list' : 'listClick',
    'click .home' : 'homeClick',
    'click .new-edit' : 'editClick',

  },

  homeClick: function(evt){
    window.location.hash = '';
  },

  editClick: function(evt){
    window.location.hash = 'new';
  },

  listClick: function(evt){
    let current = evt.currentTarget.dataset.id;
    window.location.hash = `item/${current}`;
  },

  buildHomeHtml: function(modelsList){
    let finalStr = `<div class="nav-bar">
                      <h1>Hank's List</h1>
                      <span class="home">Home</span>
                      <span class="new-edit">Add New Listing</span>
                      </div>
                    <div class="column-container">`;
    let items = modelsList.map(function(listEl){
      return `<div class="home-view">
              <ul>
              <li class="home-list" data-id="${listEl.get('_id')}"><h1>${listEl.get('item')}</h1><p>$${listEl.get('price')}</p></li>
              <hr/>
              </ul>
              </div>`;
            }).join('');
            return finalStr + items + `</div>`;
  },

  render: function(data){
    this.el.innerHTML = this.buildHomeHtml(data);
  },

});

export default HomeView;
