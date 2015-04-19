'use strict';

exports.defineTags = function(dictionary) {
    dictionary.defineTag('tsdoc', {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            if (tag.value == "method") {
                doclet.addTag('kind', 'function');
            }
            else {
                doclet.addTag('kind', 'class');
            }

            doclet.tsdoc = tag.value;
        }
    });
};
