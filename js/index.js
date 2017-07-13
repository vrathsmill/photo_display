const flickrImages = []

class FlickrImage {
  constructor(id, src, alt, position) {
    this.id = id
    this.src = src
    this.alt = alt
    this.position = $("<h1/>").attr({"position": position})
    this.html = $("<img/>").attr({"src": src, "id": id, "alt": alt, "position": position})
  }
}

function loadPhotos() {$("document").ready( () => {
    var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=4d4e0eb9dc1f28df279a4e2c50ebc4d2&safe_search=1&per_page=10"
    $.getJSON(url + "&format=json&jsoncallback=?", function(data) {
      console.log(data);
      $.each(data.photos.photo, function(i, item){
        let src = `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
        let id = item.id
        let alt = item.title
        let position = data.photos.photo.indexOf(item) + 1
        let currImg = new FlickrImage(id, src, alt, position)
        flickrImages.push(currImg)
        currImg.html.appendTo('.flickrPhotos').before(`<h2>${position}</h2>`)
      })
    })
  })
}




$(document).ready(loadPhotos())
