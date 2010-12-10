function TomboyMarkdown () {};
TomboyMarkdown.prototype = {
    /* -1 means no list entered yet */
    _listLevel : -1,

    startElement : function (name, attributes) {
                       if (name in this._outputStream) {
                           var tomboyElement = this._outputStream[name];
                           this._outputStream.append (tomboyElement.open ());
                       }
                       if (name == 'list') {
                           this._outputStream._listLevel += 1;
                       }
                   },

    endElement : function (name) {
                     if (name in this._outputStream) {
                         var tomboyElement = this._outputStream[name];
                         this._outputStream.append (tomboyElement.close ());
                     }
                     if (name == 'list') {
                         this._outputStream._listLevel -= 1;
                     }
                 },

    characters : function (data, start, length) {
                     this._outputStream.append(data.substr(start, length));
                 },

    endDocument : function () {
                      this._callback(this._outputStream.toString());
                  },

    convert : function (tomboy, callback) {
                  this._outputStream = markdownOutputStream;
                  this._callback = callback;

                  var saxParser = new SAXDriver();
                  saxParser.setDocumentHandler (this);
                  saxParser.setLexicalHandler (this);
                  saxParser.setErrorHandler (this);
                  saxParser.parse('<note-content>' + tomboy + '</note-content>');
              }
};


String.prototype.repeat = function(num) {
    return new Array(isNaN(num)? 1 : ++num).join(this);
};

Object.prototype._returnString = function (string) {
    return function () {
        return string;
    };
                                               };
var markdownOutputStream = {
    _output : '',
    _listLevel : -1,

    toString : function () {
        return this._output;
    },

    append : function (string) {
                 this._output += string;
             },

    _returnString : function(string) {
        return function() {
            return string;
        };
    },

    bold : { open : this._returnString('**'), close : this._returnString('**') },
    italic : { open : this._returnString('*'), close : this._returnString('*') },
    strikethrough : { open : this._returnString('-'), close : this._returnString('-') },
    highlight : { open : this._returnString('***'), close :this. _returnString('***') },
    monospace : { open : this._returnString('`'), close : this._returnString('`') },

    'size:small' : { open : this._returnString('### '), close : this._returnString(' ###') },
    'size:large' : { open : this._returnString('## '), close : this._returnString(' ##') },
    'size:huge' : { open : this._returnString('# '), close : this._returnString(' #') },

    'list-item' : {
        open : function() {
            return '  '.repeat(markdownOutputStream._listLevel) + '* ';
    }, close : this._returnString('') }
}
