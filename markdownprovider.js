(function($) {
    var MAIN_URL = 'https://api.github.com/repos/owner/repo/contents/posts/';
    var methods = {
        init: function(options) {
            return this.each(function() {

                var $this = $(this);

                var load_msg = "<p>Loading post.</p>";

                $this.html(load_msg);

                $.ajax({

                    url: MAIN_URL,
                    headers: {
                        'Accept': 'application/vnd.github.html'
                    },

                    success: function(data) {
                        $this.html('');
                        if (data.length === 0) {
                            console.log('No posts to look at...');
                            return $this.html('No posts to look at...');
                        }
                        console.log('Found ' + data.length + ' post(s):');
                        for (var i = data.length - 1; i >= 0; i--) {
                            console.log(data[i].name);
                            $this.append('<li onmouseover="" style="cursor: pointer;" onClick="loadLog(this)" id="' + data[i].name + '">' + displayName(data[i].name) + '</li>');
                        }
                    },
                    error: function(data) {
                        $this.html('Error loading post list.');
                    }

                });

                function displayName(s) {
                    s = s.substring(0, s.length - 3);
                    s = s.replace(/([a-z])([0-9])/g, '$1 $2');
                    s = s.replace(/\w\S*/g, function(s) {
                        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
                    });
                    return s;
                }


            });
        },
        load: function(options) {
            return this.each(function() {
                var $this = $(this);
                $.ajax({

                    url: MAIN_URL + options.id,
                    headers: {
                        'Accept': 'application/vnd.github.html'
                    },

                    success: function(data) {
                        console.log('Loaded post ' + options.id);
                        $this.html(data);
                    },
                    error: function(data) {
                        $this.html('Error loading post ' + options.id);
                    }

                });
            });
        }
    };

    $.fn.markdownprovider = function(method) {
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };

console.log('MarkDownProvider booted.');
})(jQuery);