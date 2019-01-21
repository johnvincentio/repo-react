'use strict';

/*
this works:
https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCC5pd3SNjKYcfU5hIR0IviT212w2bkQmM&q=niagara%20falls&maxResults=20
*/

var YOUTUBE_SEARCH_APIS_URL = 'https://www.googleapis.com/youtube/v3/search';
var YOUTUBE_PLAY_VIDEO_URL= 'https://www.youtube.com/watch';

var APP = APP || {};

APP.model = {
    storage : [],
/*
get YouTube videos by Search term
*/
    getDataFromApi : function(searchTerm) {
        console.log(">>> getDataFromApi");
        var that = this;
        var request = $.ajax({
            url: YOUTUBE_SEARCH_APIS_URL,
            data: {
                part: 'snippet',
                key: 'AIzaSyCC5pd3SNjKYcfU5hIR0IviT212w2bkQmM',
                q: searchTerm,
                maxResults: '20'
            },
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            that.storage = data;
            $('main').trigger('model-changed');
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApi");
    },
/*
Get YouTube videos by channel id
*/
    getDataFromApiByChannel : function(idx) {
        console.log(">>> getDataFromApiByChannel");
        var item = this.getItem(idx);
        var channelid = item.snippet.channelId;
        var that = this;
        var request = $.ajax({
            url: YOUTUBE_SEARCH_APIS_URL,
            data: {
                part: 'snippet',
                key: 'AIzaSyCC5pd3SNjKYcfU5hIR0IviT212w2bkQmM',
                channelId: channelid,
                maxResults: '20'
            },
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            that.storage = data;
            $('main').trigger('model-changed');
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApiByChannel");
    },
    getItem: function(idx) {
        return this.storage.items[idx];
    },
    getPlayVideoUrl: function(idx) {
        var item = this.getItem(idx);
        return YOUTUBE_PLAY_VIDEO_URL + "?v=" + item.id.videoId;
    }
};
