const flickrImages = []

class FlickrImage {
  constructor(id, src, alt) {
    this.id = id
    this.src = src
    this.alt = alt
    this.html = $("<img/>").attr({"src": src, "id": id, "alt": alt})
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
        let currImg = new FlickrImage(id, src, alt)
        console.log(currImg);
        flickrImages.push(currImg)
        currImg.html.prependTo(".flickrPhotos")
      })
    })
  })
}

$(document).ready(loadPhotos())
