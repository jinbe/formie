# Guide

1. Create a form
 * Write a form using json
 * Add groups and fields to the form
 * Set validation rules to the fields
 * Add help messages to the fields
2. Add the form data to your views
 * Create a directive
 * Set the form data
 * Configure the directive options


## Create a form

A [Form](#/docs/doclet/Form) requires three properties, id (string), title (string) and fields (an array of form fields):

```js
{
  "id": "formId",
  "title": "Form Title",
  "fields": []
}
```

Next, add some form fields to the fields array.

A [FormField](#/docs/doclet/FormField) consists of three basic properties, id (string), type (string) and label (string):

```js
{
  "id": "formId",
  "title": "Form Title",
  "fields": [
    {
      "id": "textFieldId",
      "type": "text",
      "label": "Write some text"
    }
  ]
}
```

The enumeration [FormFieldType](#/docs/doclet/FormFieldType) describes all the accepted field types, including two group types and many input types.

The group types are 'group' and 'choiceGroup'.


## Add the form data to your views

This step is pretty simple, just declare a [tsForm](#/docs/doclet/tsForm) directive in your view and set the 'form' parameter with the form data.

```html
<ts-form form="form"></ts-form>
```
