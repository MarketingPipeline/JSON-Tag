
// import module(s)
import Hogan from "https://cdn.skypack.dev/hogan.js@3.0.2";



// selector all tags
let JSON_Tag = document.querySelectorAll("test")



/// Main function

JSON_Tag.forEach(tag => {
  try {

   
     var template = Hogan.compile(tag.innerHTML);
    // check if rendering local JSON inside HTML or JS file etc... 
    if (tag.hasAttribute("local-json")){
        var output = template.render(eval(tag.getAttribute("local-json")));
  tag.innerHTML = output
        
        } else{
         /// fetch URL from attribute
          
      // make sure attribute is found..
          if (tag.hasAttribute("fetch-json")){
     fetchJSON_From_URL(tag)
        }
                
     }

    // things went smoothly - set rendered attribute
    setAttribute(tag)
    
} catch (error) {
 handleError(tag, error)
 
}

 
})





function handleError(tag, err){
    
  /// allow users to set their own custom error messages - on failed fetch attempts etc.. 
    if (tag.hasAttribute("error-message")){
     tag.innerHTML =  tag.getAttribute("error-message"); 
    } else{
      // default error message
      tag.innerHTML = `JSON-Tag Error: ${err.message}`; 
    }
    
    // let developer know in the console!
      console.error( err.message );
    
    // set error attribute - so it can be handled via CSS or JS etc.... 
      setAttribute(tag, "error")
}




function setAttribute(tag, error){
  // function to set rendered attribute 
  if (error){
    tag.setAttribute('json-error', '') 
    
  } else{
    // no error occured
     tag.setAttribute('json-rendered', '') 
  } 
  
  
}





async function fetchJSON(url) {
  const rsp = await fetch(url),
  data = await rsp.json();
  let JSON = {json : data}
  return JSON;
}




async function fetchJSON_From_URL(tag)
{
  try {
  let data = await fetchJSON(tag.getAttribute("fetch-json"));
  let template = Hogan.compile(tag.innerHTML);
  let output = template.render(data);
  tag.innerHTML = output
  } catch( err ) {
       handleError(tag, err)
    
  }
}
