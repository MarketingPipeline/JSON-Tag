# JSON-Tag
 
<p align="center">
  <img height="400" src="https://imgur.com/oQgTNF3.png" />
</p>
                                                                     


   <p align="center">
    The easiest way to show JSON data on your website locally or from a API etc!
  
  <br>
  <small> <b><i>Show your support!</i> </b></small>
  <br>
   <a href="https://github.com/MarketingPipeline/Markdown-Tag">
    <img title="Star on GitHub" src="https://img.shields.io/github/stars/MarketingPipeline/Markdown-Tag.svg?style=social&label=Star">
  </a>
  <a href="https://github.com/MarketingPipeline/Markdown-Tag/fork">
    <img title="Fork on GitHub" src="https://img.shields.io/github/forks/MarketingPipeline/Markdown-Tag.svg?style=social&label=Fork">
  </a>
   </p>  



Easily render data from JSON locally or from a API / URL (no JavaScript experience needed) on your website inside of a json tag. 



## Example and usage



You can view a demo of <b><i>JSON Tag</b></i> in use [here.](https://marketingpipeline.github.io/Markdown-Tag)


How to use <b><i>JSON Tag</b></i>:

To use JSON data locally - first you must define the data inside of a  <code><script></code> tag or another JavaScript file that the DOM can access.  


Example JSON data - 

```js
<script>
   let YourJSONData = {
  example: "hello",
  example2: "world"
}; 
</script>
```

Create a ```<json>``` tag with the attribute ```local-json``` with your variable name of the JSON data - then you can access it like so using pure HTML. 

```html
 <json local-json="YourJSONData">@{{example}} @{{example2}}.</json>
````



include this [script](https://github.com/MarketingPipeline/Markdown-Tag/blob/main/markdown-tag.js) at the <b>bottom</b> of your HTML document.
         
    <script src="https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Tag/markdown-tag.js"></script> 

<br>

How to fetch <b><i>JSON data</b></i> from a <b>API / URL</b>:

Instead of using a ```<json>``` tag with the attribute ```local-json``` use ```fetch-json``` with a URL to JSON data.

Note:  fetched JSON data will be returned inside of a nested JSON object called ```json```. 

Example of usage below! 

```html
<json fetch-json="https://randomusesr.me/api/?gender=female&results=10">@{{json.results.1.name.title}} {{#json.results}} Your name is {{name.title}}  <br/>{{/json.results}}</json> 
```

<br>

How to prevent <b>Flash of Unstyled Content</b>:

<b><i>JSON Tag</i></b> adds a <code>json-rendered</code> attribute after the element(s) content(s) has been rendered to HTML. This allows you to style / hide unrendered content until it is rendered however you please (via JavaScript page loader, CSS or etc), here is a basic example of hiding un-rendered content using a <code>:not()</code> CSS selector.

> Note: by default, if an error occurs a <code>json-error</code> attribute will be added to the element. 

```css
json:not([json-rendered]) { display: none }
```


<br>


How to customize <b>Error Messages</b>:

<b><i>JSON Tag</i></b> by default will return any errors inside of the JSON tag. To customize / use your own error message. Simply use a ```error-message``` attribute like the following example below - 

```html
<json error-message="Your Message Here!"></json>
```

<br>

How to handle <b>Errors</b>:

<b><i>JSON Tag</i></b> adds a <code>json-error</code> attribute if the element(s) content(s) has **NOT** been successfully rendered to HTML. This allows you to style / hide unrendered content however you please (via JavaScript, CSS or etc), here is a basic example of hiding un-rendered JSON content using a <code>:has()</code> CSS selector.

```css
json:has(json-error) {
  display:none;
}
```

## Using For Loops

<details>
<summary>
How to use a <b><i>for loop</b></i> with <b>local JSON data</b>:
</summary>

<br>

To use a for loop with local JSON data. Your JSON data must be inside of a nested object - example below.

```js
var data = {"list" : [
   {
       "email": "abc@example.com",
       "name": "abc",
       "date": "05/01/2015"
   },
   {
       "email": "xyz@example.com",
       "name": "xyz",
       "date": "05/01/2015"
   }
]};  

```




You can then access it via object key name like the example below - 

```html
<json local-json="data">{{#list}} Your name is {{name}} and email is {{email}} <br/>{{/list}}
```


</details>

<br>

<details>
<summary>
How to use a <b><i>for loop</b></i> with <b>fetched JSON data</b>:
</summary>
<br>

Note:  fetched JSON data will be returned inside of a nested JSON object called ```json```. - example below.

```js
{
    "json": {
        "list": [
            {
                "email": "abc@example.com",
                "name": "abc",
                "date": "05/01/2015"
            },
            {
                "email": "xyz@example.com",
                "name": "xyz",
                "date": "05/01/2015"
            }
        ]
    }
}
```

You can then access it via object key name like the example below - 

```html
<test fetch-json="https://randomuser.me/api/?gender=female&results=10">{{#json.list}} Your name is {{title}}  <br/>{{/json.list}}</test>
```

</details>


## Handling untrusted content

By default, <b><i>JSON Tag</i></b> does not sanitize the content you provide, since in most use cases the content is trusted.

Any other content provided from user's on your website etc. Should be sanitized before adding it to prevent XSS. 



## Contributing ![GitHub](https://img.shields.io/github/contributors/MarketingPipeline/Markdown-Tag)

Want to improve this? Create a pull request with detailed changes / improvements! If approved you will be added to the list of contributors of this awesome project!


Looking for a task to work on? Check the tasks that need improved in the [to-do](https://github.com/MarketingPipeline/Markdown-Tag/blob/main/.github/U.md) list.


See also the list of
[contributors](https://github.com/MarketingPipeline/Markdown-Tag/graphs/contributors) who
participate in this project.

## License ![GitHub](https://img.shields.io/github/license/MarketingPipeline/markdown-tag)

This project is licensed under the GPL-3.0 License - see the
[LICENSE.md](https://github.com/MarketingPipeline/Markdown-Tag/blob/main/LICENSE) file for
details.

