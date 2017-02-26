import Backbone from 'backbone';
import $ from 'jquery';

export const MegsModels = Backbone.Model.extend({
  urlRoot: 'api/item',
  idAttribute: '_id',

  initialize: function(id){
    if(id !== undefined){
    this.url = `api/item/${id}`;
    }
  },
});

export const MegsCollections = Backbone.Collection.extend({
  model: MegsModels,
  url: 'api/item',
});
