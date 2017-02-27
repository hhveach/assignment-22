import Backbone from 'backbone';
import $ from 'jquery';
import {MegsModels, MegsCollections} from './models.js';
import HomeView from './homeView.js';
import ListingView from './listingView.js';
import CreateListingView from './newListingView.js';
import EditView from './editView.js';

const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start();
  },

  routes: {
    'item/:id/edit' : 'editListing',
    'item/:id' : 'singleListing',
    'new' : 'createNewListing',
    ''  : 'homePage',
  },

  // editListing: function(id){
  //
  // }.

  singleListing: function(id){
    // let current = window.location.hash.slice(6);`${current}`
    let single = new MegsModels(id);
    single.fetch().then(function(){
      let view = new ListingView();
      view.render(single);
    });
  },

  createNewListing: function(){
    let view = new CreateListingView();
    view.render();
  },

  homePage: function(){
    let allListings = new MegsCollections();
    allListings.fetch().then(function(){
      let view = new HomeView();
      view.render(allListings);
    });
  },
});

const SickApp = new AppRouter();
