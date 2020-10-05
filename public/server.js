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
          console.log(response.items);
          $('#screen-container').show();
          $('.thanks').show();

          document.getElementById('download').addEventListener('click', function () {
            var offScreen = document.querySelector('#screen-container');

            window.scrollTo(0, 0);
            html2canvas(offScreen).then((canvas) => {
              var dataURL = canvas.toDataURL();
              console.log(dataURL);
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