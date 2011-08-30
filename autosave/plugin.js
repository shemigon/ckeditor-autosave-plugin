/**
 * Autosave plugin for CKEditor (requires jQuery)
 * 
 * CKEDITOR.config.autosave_delay - delay in seconds before request is sent (located in config.js)
 * #AUTO_SAVE_URL - input (usually hidden) with save url (located on the page)
 * 
 * Server's supposed to send back {status: ok|error, (optional message: text)}
 *
 * Place it in plugins/autosave directory
 * @author Boris Shemigon <i@boris.co>
 */

(function() {
    var pluginName = 'autosave';

    var timeOutId = 0,
        delay = CKEDITOR.config.autosave_delay || 1, // in seconds
        url = $('#AUTO_SAVE_URL').val(),
        ajaxActive = false;

    if(url) {
        var startTimer = function(event) {
            if(timeOutId) {
                clearTimeout(timeOutId);
            }
            timeOutId = setTimeout(onTimer, delay*1000, event);
        }
        var onTimer = function (event) {
            if(ajaxActive) {
                startTimer(event);
            }
            else {
                ajaxActive = true;
                $.post(url, {
                    content: event.editor.getData()
                }, function(response) {
                    ajaxActive = false;
                    if(response.status !== 'ok') {
                        alert(response.message || 'Unknown error happened');
                    }
                }, 'json');
            }
        }
        
        CKEDITOR.plugins.add( pluginName, {
            init : function( editor ) {
                editor.on('key', startTimer);
            }
        });
    }
    else {
        throw 'AUTO_SAVE_URL hidden input not found';
    }
})();
