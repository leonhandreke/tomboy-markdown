var tomboyString = 'Test Note\
Bold cat is <bold>bold</bold>.\n\
Italic cat is i<italic>talic</italic>\n\
Strikeout cat is <strikethrough>striked out</strikethrough>.\n\
Highlighted cat is <highlight>highlighted</highlight>.\n\
Monospace cat is <monospace>monospaced</monospace>.\n\
\n\
<size:small>Small cat</size:small>\n\
Normal cat\n\
<size:large>Large cat</size:large>\n\
<size:huge>Huge cat</size:huge>\n\
\n\
<list><list-item dir="ltr">first cat\n\
</list-item><list-item dir="ltr">second <bold>bold</bold> cat\n\
</list-item><list-item dir="ltr">third <highlight>highlight</highlight> cat\n\
<list><list-item dir="ltr">fourth second-level cat\n\
</list-item></list></list-item><list-item dir="ltr">first-level <italic>italic</italic> cat</list-item></list>';

doneParsing = function (output) {
    console.log(output);
}
var tomboyMarkdown = new TomboyMarkdown ();

tomboyMarkdown.convert(tomboyString, doneParsing);

document.getElementById('example-output').value = tomboyString;
//alert(tomboyString);
