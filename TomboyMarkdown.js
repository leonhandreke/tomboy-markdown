
function TomboyMarkdown () {
    this._init ();
}

TomboyMarkdown.prototype = {
    _init : function () {
                this.TomboyElements = {
                    bold : { open: '**', close: '**' },
                    italic : { open: '*', close: '*' },
                    strikethrough : { open: '-', close: '-' },
                    highlight : 'highlight',
                    monospace : 'monospace',

                    small : 'size:small',
                    large : 'size:large',
                    huge : 'size:huge',

                    links : ['link:url', 'link:internal'],

                    list : 'list',
                    listItem : 'list-item'
                }; 
            },

    startElement : function (name, attributes) {
                       if (name in this.TomboyElements) {
                           this._outputStream += this.TomboyElements[name].open;
                       }
                   },

    characters : function (data, start, length) {
                     this._outputStream += data.substr(start, length);
                 },

    endDocument : function () {
                      this._callback(this._outputStream);
                  },

    convert : function (tomboy, callback) {
                  this._outputStream = '';
                  this._callback = callback;

                  var saxParser = new SAXDriver();
                  saxParser.setDocumentHandler (this);
                  saxParser.setLexicalHandler (this);
                  saxParser.setErrorHandler (this);
                  saxParser.parse('<note-content>' + tomboy + '</note-content>');
              }
};

