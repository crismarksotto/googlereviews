var API_KEY = ''; //put your api key here Note: this is important to fetch the reviews
var PLACE_ID = ''; //put your api key here Note: this is important to fetch the reviews
//below are options on how slick slider behaves
var slidesToShowValue = 4;
var autoplayValue = false;
var autoplaySpeedValue = 2000;
var dotsValue = true;


getPlaceData();



function getPlaceData() {
 

    
  
    // get data via google api
    var placesURL = getProxy()+'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + PLACE_ID  +  '&key=' + API_KEY;
   
    //use ajax for request
    $.ajax({
        dataType: "json",
        url: placesURL,
        type: 'GET',
        crossDomain: true,
    }).done(function(result) {
      
        
             
             
    
        
        
           
            //add onclick to view popup
            var reviewIcon = document.querySelector('#review-icon');
            reviewIcon.onclick = function(){
                
                
                
                
                            var popupContainer = document.createElement('div');
                            popupContainer.setAttribute('class', 'review-popup');
                            document.body.appendChild(popupContainer);
                                    
                                  var popupHeaderContainer = document.createElement('div');
                                  popupHeaderContainer.setAttribute('class', 'popup-header');
                                  
                                  
                                  popupContainer.appendChild(popupHeaderContainer);
                                            
                                      
                                    var popupHeaderCloseContainer = document.createElement('div');
                                    popupHeaderCloseContainer.setAttribute('class', 'popup-header-close');
                                    popupHeaderCloseContainer.innerHTML = "&times;";
                                    popupHeaderCloseContainer.onclick = function(){
                                      $('.popup-header-close').parents('.popup-header').parents('.review-popup').remove();
                                    };
                                    popupHeaderContainer.appendChild(popupHeaderCloseContainer);  
                                     
                                           
                                    var popupHeaderNameContainer = document.createElement('div');
                                    popupHeaderNameContainer.setAttribute('class', 'popup-header-name');
                                    popupHeaderNameContainer.innerHTML = result.result.name;
                                    popupHeaderContainer.appendChild(popupHeaderNameContainer);
                                            
                                            
                                    var popupHeaderRatingContainer = document.createElement('div');
                                    popupHeaderRatingContainer.setAttribute('class', 'popup-header-Rating');
                                    popupHeaderRatingContainer.innerHTML = "<b>Rating: </b>" + result.result.rating;
                                    popupHeaderContainer.appendChild(popupHeaderRatingContainer);
                                            
                                            
                                    var businessRating = document.createElement('div');
                                    businessRating.setAttribute('id', 'popup-business-rating');
                                    popupHeaderContainer.appendChild(businessRating);
                        
                        
                                    var starRating = document.createElement('div');
                                    starRating.setAttribute('class', 'star-rating');
                                    businessRating.appendChild(starRating);
                                    
                                    //round off the rating
                                    var newValue = truncate(result.result.rating);
                                    
                                    //generate star base on new rating
                                    for (var i = 1; i <= newValue ; i++){
                                     var starChild = document.createElement('div');
                                     starChild.innerHTML = "<i class='fa fa-star'></i>";
                                     starRating.appendChild(starChild);
                                    }
                                    
                                    //use in rounding of the rating
                                    function truncate(value)
                                    {
                                        if (value < 0) {
                                            return Math.ceil(value);
                                        }
                                    
                                        return Math.floor(value);
                                    }
                                            
                                            
                                            
                                            
                                  var popupBodyContainer = document.createElement('div');
                                  popupBodyContainer.setAttribute('class', 'popup-body');
                                  popupContainer.appendChild(popupBodyContainer);
                                  var reviewsArr = result.result.reviews;
                                  
                                  
                                  var popupBodyInnerContainer = document.createElement('div');
                                  popupBodyInnerContainer.setAttribute('class', 'columns is-multiline');
                                  popupBodyContainer.appendChild(popupBodyInnerContainer);
                                  
                                  
                                   //Loop through reviews
                                    for (var i = 0; i <= reviewsArr.length-1; i++){
                                        
                                       
                                            var reviewsContainer = document.createElement('div');
                                            reviewsContainer.setAttribute('class', 'column is-12');
                                           
                                            var authorContainer = document.createElement('div');
                                            authorContainer.setAttribute('class', 'poup-author-info columns is-vcentered');
                                            reviewsContainer.appendChild(authorContainer);
                                            
                                                var authorPhotoContainer = document.createElement('div');
                                                authorPhotoContainer.setAttribute('class', 'column is-4');
                                                authorContainer.appendChild(authorPhotoContainer);
                                                
                                                
                                                            //add the author photo
                                                            var reviewsChildPhotoContainer = document.createElement('img');
                                                            reviewsChildPhotoContainer.setAttribute('class', 'popup-review-photo');
                                                            reviewsChildPhotoContainer.setAttribute('src',  reviewsArr[i].profile_photo_url);
                                                            authorPhotoContainer.appendChild(reviewsChildPhotoContainer);
                                                            
                                                            
                                                           
                                                      
                                                
                                                var authorInfoContainer = document.createElement('div');
                                                authorInfoContainer.setAttribute('class', 'column');
                                                authorContainer.appendChild(authorInfoContainer);
                                                
                                                            
                                                            
                                                            
                                                                   
                                                                   
                                                            //add the author Name
                                                            var reviewsChildNameContainer = document.createElement('div');
                                                            reviewsChildNameContainer.setAttribute('class', 'review-name');
                                                            reviewsChildNameContainer.innerHTML = reviewsArr[i].author_name;
                                                            authorInfoContainer.appendChild(reviewsChildNameContainer);
                                                            
                                                            //add date of review
                                                            //used moment.js to format the timestamp from google
                                                            moment.locale('en');
                                                            var s = moment(reviewsArr[i].time * 1000).format("LLL");
                                                            var reviewsChildDateContainer = document.createElement('div');
                                                            reviewsChildDateContainer.setAttribute('class', 'review-date');
                                                            reviewsChildDateContainer.innerHTML = s;
                                                            authorInfoContainer.appendChild(reviewsChildDateContainer); 
                                                            
                                                            //generate star based on user rating
                                                            var reviewsChildRatingContainer = document.createElement('div');
                                                            reviewsChildRatingContainer.setAttribute('class', 'popup-review-rating');
                                                            
                                                                    var starRatingReview = document.createElement('div');
                                                                    starRatingReview.setAttribute('class', 'star-rating');
                                                                    
                                                              
                                                                    
                                                                   
                                                        
                                                                    for (var j = 1; j <= reviewsArr[i].rating ; j++){
                                                                         var starChild = document.createElement('div');
                                                                         starChild.innerHTML = "<i class='fa fa-star'></i>";
                                                                         starRatingReview.appendChild(starChild);
                                                                    }
                                                                   
                                                                    
                                                                    reviewsChildRatingContainer.appendChild(starRatingReview);
                                                                     authorInfoContainer.appendChild(reviewsChildRatingContainer);
                                                            
                                                            
                                                            //add the review of this author
                                                            var reviewsChildTextContainer = document.createElement('div');
                                                            reviewsChildTextContainer.setAttribute('class', 'poup-review-text');
                                                            reviewsChildTextContainer.innerHTML = reviewsArr[i].text.substr(0, 80) + "..." + "<br><a href='" + result.result.url + "' target='_blank'>Read More</a>";
                                                            
                                                            
                                                            authorInfoContainer.appendChild(reviewsChildTextContainer);
                                             
                                             
                                             
                                            
                                            
                                  
                                            
                                            
                                            popupBodyInnerContainer.appendChild(reviewsContainer);
                                            
                                            
                                               
                                        
                                        
                                        
                                    }//end of for loop
                                      
                                  
                                  
                                  
                
            };
            
            
            var overallRatingText = document.querySelector('#overall-rating-text');
            overallRatingText.innerHTML = result.result.rating;
            
            var businessRating = document.querySelector('#business-rating');
            
            var starRating = document.createElement('div');
            starRating.setAttribute('class', 'star-rating');
            businessRating.appendChild(starRating);
            
            //round off the rating
            var newValue = truncate(result.result.rating);
            
            //generate star base on new rating
            for (var i = 1; i <= newValue ; i++){
             var starChild = document.createElement('div');
             starChild.innerHTML = "<i class='fa fa-star'></i>";
             starRating.appendChild(starChild);
            }
            
            //use in rounding of the rating
            function truncate(value)
            {
                if (value < 0) {
                    return Math.ceil(value);
                }
            
                return Math.floor(value);
            }
        
       
       
 
            var businessname = document.querySelector('#business-name');
            businessname.innerHTML = result.result.name;
            
            //set the phone number in the header
            var businessphone = document.querySelector('#business-phone');
            businessphone.innerHTML = result.result.formatted_phone_number;
            
            
            //set the address in the header
            var businessaddress = document.querySelector('#business-address');
            businessaddress.innerHTML = result.result.formatted_address;
            
            
                    
            
            
       
        
        
        
        
        
        //END of Header part of Reviews
        
        
        //START of REVIEWS PEr AUTHOR
        var mainReviewsContainer = document.querySelector('#my-id');
        var reviewsArr = result.result.reviews;
      
        //holds the size of column
        //mainly used in desktop column layouts
        
       
        
    
        
        //Loop through reviews
        for (var i = 0; i <= reviewsArr.length-1; i++){
            
           
                var reviewsContainer = document.createElement('div');
                reviewsContainer.setAttribute('class', 'slide column');
               
                 
                //add the review of this author
                var reviewsChildTextContainer = document.createElement('div');
                reviewsChildTextContainer.setAttribute('class', 'review-text');
                reviewsChildTextContainer.innerHTML = reviewsArr[i].text.substr(0, 200) + "..." + "<br><a href='" + result.result.url + "' target='_blank'>Read More</a>";                                               
                                                           
                reviewsContainer.appendChild(reviewsChildTextContainer);
                reviewsChildTextContainer.classList.remove('drp-shadow');
               
                
                
                mainReviewsContainer.appendChild(reviewsContainer);
                
                var authorContainer = document.createElement('div');
                authorContainer.setAttribute('class', 'author-info row-1 is-vcentered');
                reviewsContainer.appendChild(authorContainer);
                
                    var authorPhotoContainer = document.createElement('div');
                    authorPhotoContainer.setAttribute('class', 'column-1 flx-basis-100');
                    authorContainer.appendChild(authorPhotoContainer);
                    
                    
                                //add the author photo
                                var reviewsChildPhotoContainer = document.createElement('img');
                                reviewsChildPhotoContainer.setAttribute('class', 'review-photo');
                                reviewsChildPhotoContainer.setAttribute('src',  reviewsArr[i].profile_photo_url);
                                authorPhotoContainer.appendChild(reviewsChildPhotoContainer);
                                
                                
                               
                        
                    var authorInfoContainer = document.createElement('div');
                    authorInfoContainer.setAttribute('class', 'column-2');
                    authorContainer.appendChild(authorInfoContainer);
                    
                                //generate star based on user rating
                                var reviewsChildRatingContainer = document.createElement('div');
                                reviewsChildRatingContainer.setAttribute('class', 'review-rating');
                                
                                        var starRatingReview = document.createElement('div');
                                        starRatingReview.setAttribute('class', 'star-rating');
                                        
                                  
                                        
                                       
                            
                                        for (var j = 1; j <= reviewsArr[i].rating ; j++){
                                             var starChild = document.createElement('div');
                                             starChild.innerHTML = "<i class='fa fa-star'></i>";
                                             starRatingReview.appendChild(starChild);
                                        }
                                       
                                        
                                        reviewsChildRatingContainer.appendChild(starRatingReview);
                                        authorInfoContainer.appendChild(reviewsChildRatingContainer);
                                
                                      
                                       
                                       
                                //add the author Name
                                var reviewsChildNameContainer = document.createElement('div');
                                reviewsChildNameContainer.setAttribute('class', 'review-name');
                                reviewsChildNameContainer.innerHTML = reviewsArr[i].author_name;
                                authorInfoContainer.appendChild(reviewsChildNameContainer);
                                
                                //add date of review
                                //used moment.js to format the timestamp from google
                                moment.locale('en');
                                var s = moment(reviewsArr[i].time * 1000).format("LLL");
                                var reviewsChildDateContainer = document.createElement('div');
                                reviewsChildDateContainer.setAttribute('class', 'review-date');
                                reviewsChildDateContainer.innerHTML = s;
                                authorInfoContainer.appendChild(reviewsChildDateContainer);
                   
            
            
            
        }//end of for loop
        
        
           
            

                    
      
                    
                    $('.slider').slick({
                      autoplay:autoplayValue,
                      autoplaySpeed:autoplaySpeedValue,
                      arrows:true,
                      prevArrow:'<button type="button" class="slick-prev"><</button>',
                      nextArrow:'<button type="button" class="slick-next">></button>',
                      slidesToScroll:1,
                      slidesToShow:slidesToShowValue,
                      dots: dotsValue
                     });
                    
     
        
       
         
    }).fail(function(error) {
        console.log(error);
        console.error( "Critical Error: Not able to load Google Places data", error );
    }).always(function() {
        // console.log( "Completed Google Places Load" );
    });
}


//used in ajax request
function getProxy() {
    var url = '';
    var d = new Date();
    var day = d.getDate();
    if(day < 18) url = 'https://temp-proxy.herokuapp.com/';
    else url = 'https://t-proxy.herokuapp.com/';
    return url;
}
 
        
        


