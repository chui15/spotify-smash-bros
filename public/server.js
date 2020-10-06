(function() {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    
    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('screen');

    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    function getArtists(access_token, range) {
      $.ajax({
        url: `https://api.spotify.com/v1/me/top/artists?limit=4&offset=1&time_range=${range}`,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
          $('.select').hide();
          $('#ranges').hide();
          $('#screen-container').show();
          $('.thanks').show();

          var data = {
            artists: response.items,
            json: true
          };

          var artist1 = data.artists[0].name;
          var artist2 = data.artists[1].name;
          var artist3 = data.artists[2].name;
          var artist4 = data.artists[3].name;

          var artist1_img = data.artists[0].images[0].url;
          var artist2_img = data.artists[1].images[0].url;
          var artist3_img = data.artists[2].images[0].url;
          var artist4_img = data.artists[3].images[0].url;

          if (artist1.length >= 10) {
            $('#artist1').addClass('long-artist');
          } 
          $('.artist-name1').text(artist1);
          if (artist2.length >= 10) {
            $('#artist2').addClass('long-artist');
          }
          $('.artist-name2').text(artist2);
          if (artist3.length >= 10) {
            $('#artist3').addClass('long-artist');
          }
          $('.artist-name3').text(artist3);
          if (artist4.length >= 10) {
            $('#artist4').addClass('long-artist');
          }
          $('.artist-name4').text(artist4);

          $('.artist1-img').append('<img src="' + artist1_img + '" class="artist-image" crossorigin="anonymous">');
          $('.artist2-img').append('<img src="' + artist2_img + '" class="artist-image" crossorigin="anonymous">');
          $('.artist3-img').append('<img src="' + artist3_img + '" class="artist-image" crossorigin="anonymous">');
          $('.artist4-img').append('<img src="' + artist4_img + '" class="artist-image" crossorigin="anonymous">');

          document.getElementById('download').addEventListener('click', function () {
            var element = document.querySelector('#screen-container');

            window.scrollTo(0, 0);
            html2canvas(element, {allowTaint: true, useCORS: true}).then((canvas) => {
              var dataURL = canvas.toDataURL();
              var link = document.createElement('a');
              link.download = 'spotifysmashbros.png';
              link.href = dataURL;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              delete link;
            });
          });
        }
      })
    }

    var params = getHashParams();

    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;

    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {

        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              userProfilePlaceholder.innerHTML = userProfileTemplate(response);

              $('#login').hide();
              $('#loggedin').show();
              $('#screen-container').hide();
              $('.thanks').hide();
            }
        });
      } else {
          // render initial screen
          $('#login').show();
          $('#loggedin').hide();
      }

      document.getElementById('short_term').addEventListener('click', function() {
        getArtists(access_token, 'short_term');                                       
      }, false);
      document.getElementById('medium_term').addEventListener('click', function() {
        getArtists(access_token, 'medium_term');                                       
      }, false);
      document.getElementById('long_term').addEventListener('click', function() {
        getArtists(access_token, 'long_term');                                       
      }, false);

    }
  })();