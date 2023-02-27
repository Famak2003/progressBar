// The inbuilt XMLHttpRequest is used to construct an https request
const progress = document.getElementById("progress-bar");
const file = document.getElementById("file");
const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  // payload
  const userImg = file.files[0]; // the file we are uploading....since user can only upload one file, it will be the first in the files list
  const payLoad = new FormData(); // used to simmplify the post request that should be made
  payLoad.append("user-image", userImg, "userImg.jpg"); // first argument is the reference name for what is been appended, the second argument is the data that you want to attach/append, the third is optional, its the name you want the file to be saved with, it overides the original name of the file.

  // request
  const req = new XMLHttpRequest();
  req.open("POST", "https://httpbin.org/post"); // The first argument is the type of request we want to make in this case a POST request. The second argument is the 'end point'....where you want to send the data
  req.upload.addEventListener("progress", function (e) {
    //This listens out for any progress on the upload
    const loaded = e.loaded; // tells how much of the payload has been uploaded so far
    const total = e.total; // tell the total size of the payload the will be uploaded
    const progessComplete = (loaded / total) * 100;
    progress.setAttribute("value", progessComplete); // The first argument is the value we want to set. The second argument is what we want to put in it
    progress.nextElementSibling.nextElementSibling.innerText =
      Math.round(progessComplete) + "%"; // This is used to update the text under the progress bar
  });
  req.addEventListener("load", function () {
    // This is fired up when the request is complete
    console.log(req.status); // Gives the status code
    console.log(req.response); // Returns the response of the request
  });
  req.send(payLoad); // Lastly, we send off the request with our payload
});
