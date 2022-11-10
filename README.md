# Jace-Tag
 
<p align="center">
  <img height="400" alt="Jace Tag Repo Banner" src="https://user-images.githubusercontent.com/86180097/201008829-13b55fa3-7016-4eeb-aa9b-3acc3e884e21.png" />
</p>
                                                                     


   <p align="center">
 The easiest way to show JSON data on your website locally or from a API etc & <b>LOTS</b> more!
  
  <br>
  <small> <b><i>Show your support!</i> </b></small>
  <br>
   <a href="https://github.com/MarketingPipeline/Jace-Tag">
    <img title="Star on GitHub" src="https://img.shields.io/github/stars/MarketingPipeline/Jace-Tag.svg?style=social&label=Star">
  </a>
  <a href="https://github.com/MarketingPipeline/Jace-Tag/fork">
    <img title="Fork on GitHub" src="https://img.shields.io/github/forks/MarketingPipeline/Jace-Tag.svg?style=social&label=Fork">
  </a>
   </p>  



<b><i>Jace Tag</b></i> easily allows you to render JSON data from a API / URL or locally inside your HTML document with no JavaScript experience needed & **LOTS** more on your website inside of a json tag. 



## Example and usage



You can view a demo of <b><i>Jace Tag</b></i> in use [here.](https://marketingpipeline.github.io/Jace-Tag/demo)


How to use <b><i>Jace Tag</b></i>:

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

Create a ```<jace>``` tag with the attribute ```local-json``` with your variable name of the JSON data - then you can access it like so using pure HTML. 

```html
 <jace local-json="YourJSONData">@{{example}} @{{example2}}.</jace>
````



include this [script](https://github.com/MarketingPipeline/Jace-Tag/blob/main/dist/jace-tag.min.js) in your HTML document. 
         
    <script src="https://cdn.jsdelivr.net/gh/MarketingPipeline/Jace-Tag@v1.0.0/dist/jace-tag.min.js" type="module"></script> 


<br>

How to fetch <b><i>JSON data</b></i> from a <b>API / URL</b>:

Instead of using a ```<jace>``` tag with the attribute ```local-json``` use ```fetch-json``` with a URL to JSON data.

Note:  fetched JSON data will be returned inside of a nested JSON object called ```json```. 

Example of usage below! 

```html
<jace fetch-json="https://api.github.com/users/MarketingPipeline/repos"> All of MarketingPipeline's public repos <br> {{#json}} Repo title {{name}} <b>Description</b> {{description}} <b>Stars</b>: {{stargazers_count}} Repo URL <a href="{{url}}">Click to view!</a><br/>{{/jace}}</json> 
```

<br>

How to prevent <b>Flash of Unstyled Content</b>:

<b><i>Jace Tag</i></b> adds a <code>jace-rendered</code> attribute after the element(s) content(s) has been rendered to HTML. This allows you to style / hide unrendered content until it is rendered however you please (via JavaScript page loader, CSS or etc), here is a basic example of hiding un-rendered content using a <code>:not()</code> CSS selector.

> Note: by default, if an error occurs a <code>jace-error</code> attribute will be added to the element. 

```css
jace:not([jace-rendered]) { display: none }
```


<br>


How to customize <b>Error Messages</b>:

<b><i>Jace Tag</i></b> by default will return any errors inside of the JSON tag. To customize / use your own error message. Simply use a ```error-message``` attribute like the following example below - 

```html
<jace error-message="Your Message Here!"></jace>
```

<br>

How to handle <b>Errors</b>:

<b><i>Jace Tag</i></b> adds a <code>jace-error</code> attribute if the element(s) content(s) has **NOT** been successfully rendered to HTML. This allows you to style / hide unrendered content however you please (via JavaScript, CSS or etc), here is a basic example of hiding un-rendered JSON content using a <code>:has()</code> CSS selector.

```css
jace:has(jace-error) {
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
<jace local-json="data">{{#list}} Your name is {{name}} and email is {{email}} <br/>{{/list}}</jace>
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
<jace fetch-json="https://YOUR_URL_HERE.com">{{#json.list}} Your name is {{title}}  <br/>{{/json.list}}</jace>
```

</details>

 
 
## Functions
 
 
 
<details>
<summary>
 How to use <b><i>Functions</b></i> with <i><b>Jace Tag</b></i>:
</summary>

<br>

To use a JSON key as a function - set the JSON value key as a function like the example(s) below - 

```js
 <script>
let FunctionExample = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  },
   bold: function () {
    return function (text) {
      return `<b> ${text} was bolded </b>`;
    }
   },
};
 </script>
```

 and then use the function(s) in your HTML document - example below.
 
```html
<jace local-json="FunctionExample">Calculate function - {{title}} spends {{calc}}. Bold function - {{#bold}} {{title}}.{{/bold}}</jace>
```      
 
 </details>
 

## Notice
 
 <b><i>Jace Tag</i></b> uses [Mustache](http://mustache.github.io/) templating language which is compiled with [Hogan.js](https://github.com/twitter/hogan.js/). For information
on Mustache, see the [manpage](http://mustache.github.io/mustache.5.html) and
the [spec](https://github.com/mustache/spec).

**psstt** - you might find another cool function that <b><i>Jace Tag</b></i> is capable of via Mustache templating language, if you think you came across something & it should be documented or added, feel free to submit a PR or feature request, etc!
 

## Contributing ![GitHub](https://img.shields.io/github/contributors/MarketingPipeline/Jace-Tag)

Want to improve this? Create a pull request with detailed changes / improvements! If approved you will be added to the list of contributors of this awesome project!

See also the list of
[contributors](https://github.com/MarketingPipeline/Jace-Tag/graphs/contributors) who
participate in this project.

## License ![GitHub](https://img.shields.io/github/license/MarketingPipeline/Jace-Tag)

This project is licensed under the GPL-3.0 License - see the
[LICENSE](https://github.com/MarketingPipeline/Jace-Tag/blob/main/LICENSE) file for
details.
