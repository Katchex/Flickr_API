
//variables
var flickApiUrl= "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

var flickApiUrl2="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6e7e169c9890dd483c8b55ec4a4336e5&format=json&nojsoncallback=1";
var flickrOptions={
    tags:"cat",
    text:"",
    extras:"description,owner_name,tags",
    safe_search : 1,
    content_type : 1,
    sort : "interestingness-asc",
}

var photoLink="";
var img="";

var tags="";
$(function(){
    $( "#tagInput" ).keypress(function( event ) {
        if ( event.which == 13 ) {
            searchPhotos();
        }
    });
    
    $.getJSON(flickApiUrl2,flickrOptions).done(function(data){
        $.each(data.photos.photo,function(index,photo){
            addItem2 (photo.farm , 
                photo.server , 
                photo.id , 
                photo.secret , 
                textSlicer(photo.title) , 
                photo.owner , 
                textSlicer(photo.ownername) , 
                textSlicer(photo.description._content), 
                textSlicer(photo.tags));
        
        
        })}).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
    

});

function searchPhotos(){
    var typedTag=$("#tagInput").val();
    $.getJSON(flickApiUrl2,{
        tags:typedTag,
        text:"",
        extras:"description,owner_name,tags",
        safe_search : 1,
        content_type : 1,
        sort : "interestingness-asc",
    }).done(function(data){
        console.log(data.photos);
        //console.log(data.photos.photo);
        $.each(data.photos.photo,function(index,photo){
            addItem2 (photo.farm , 
                photo.server , 
                photo.id , 
                photo.secret , 
                textSlicer(photo.title) , 
                photo.owner , 
                textSlicer(photo.ownername) , 
                textSlicer(photo.description._content) , 
                textSlicer(photo.tags));
        
        
        })}).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
    if(!typedTag){
        alert("first type any tag");
    }else{
        $("ul:contains(li)").empty();

    }
    
}

function refrBtn (){
document.location.reload();
}
function textSlicer(text){
    var slicedText="";
    if(text.length>=20){
        slicedText=text.substring(0,20)+"...";
        //console.log("text: "+text+"/ sliced: "+slicedText);
        return slicedText;
    }else{return text;}
}

function addItem2 (farmId,serverId,photoId,secret,photoTitle,ownerId,ownerName,descr,tags) {
    var item="<li><div class='box-item'><div class='box-img'><img src='https://farm"+farmId+".staticflickr.com/"+serverId+"/"+photoId+"_"+secret+"_n.jpg' alt='image'></div><div class='box-content'><div class='row'><a href='https://www.flickr.com/photos/"+ownerId+"/"+photoId+"' class='item-title'><strong>"+photoTitle+"</strong></a><a href='https://www.flickr.com/people/"+ownerId+"' class='item-author'> <i class='fas fa-user'></i>&nbsp<strong>"+ownerName+"</strong></a></div><div class='row'><strong>Description: </strong><span class='descr'>"+descr+"</span></div><div class='row'><i class='fas fa-tag'></i><span class='tags'>"+tags+"<span></div></div></div></li>";
    $(".container").append(item);
}