The extension performs translation of a web page through injection of javascript files that call a locally run fastAPI server that manages comunication with a locally run llm using ollama.
The extension is currently configured to run on the youtube.com website.

To add the extension to firefox:
- navigate to about:debugging
- go to this firefox
- load temporary Add-on
- select any file from the extension folder

To run the extension:
- start the local llm with "ollama run llm-name"
- start the fastAPI server with "fastapi dev index.py"
- at the bottom left of the youtube web page click the button and the translation will begin
