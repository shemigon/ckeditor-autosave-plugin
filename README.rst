
Autosave plugin for CKEditor
----------------------------

Installation
............

Place it in plugins/autosave directory where CKEditor is installed and don't forget to add 'autosave' to config.extraPlugins

Config
......

*CKEDITOR.config.autosave_delay* - delay in seconds before request is sent (located in config.js)

*CKEDITOR.config.autosave_extra_post_data* - object with extra data to be passed to the server with POST request

*input[id=AUTO_SAVE_URL]* - input (usually hidden) with save url (located on the page)

Notice
......

Server's supposed to send back {status: ok|error, (optional message: text)}
