const flickrImages = []

class FlickrImage {
  constructor(id, src, alt, position) {
    this.id = id
    this.src = src
    this.alt = alt
    this.position = position
    this.html = $("<img/>").attr({"src": src, "id": id, "alt": alt, "position": position})
  }
}

function loadPhotos() {$("document").ready( () => {
    var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=4d4e0eb9dc1f28df279a4e2c50ebc4d2&safe_search=1&per_page=10"
    $.getJSON(url + "&format=json&jsoncallback=?", function(data) {
      $.each(data.photos.photo, function(i, item){
        let src = `http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}_c.jpg`;
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

function toggle(){
  let id = event.target.id
  let photo = $(`#${id}`)
  if (photo.css('top') !== "auto") {
    photo.removeAttr('style')
  } else {
    photo.css({
      "position": "fixed",
      "display": "block",
      "width": "95%",
      "height": "95%",
      "top": "0",
      "left": "0",
      "right":"0",
      "bottom":"0",
      "cursor":"pointer",
    })
  }
}

function overlay(){
  $(".flickrPhotos").click(toggle)
}


$(document).ready(loadPhotos())

$(window).load(function(){
  overlay()
})
