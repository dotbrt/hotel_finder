// // // handle adding URL to list
// // const addButton = document.querySelector('.add-button');
// // addButton.addEventListener('click', function() {
// //   const urlInput = document.querySelector('#url');
// //   const url = urlInput.value;
// //   if (url) {
// //     const urlList = document.querySelector('#url-list');
// //     const newUrl = document.createElement('p');
// //     newUrl.innerHTML = url;
// //     urlList.appendChild(newUrl);
// //     urlInput.value = '';
// //   }
// // });

// {/* <script>
// document
//   .getElementById("add-button")
//   .addEventListener("click", function () {
//     // get the value of the current input field
//     var url = document.getElementById("url-input").value;

//     // create a new input field
//     var input = document.createElement("input");
//     input.type = "text";
//     input.name = "urls";
//     input.value = url;

//     // add the input field to the form
//     document.getElementById("url-form").appendChild(input);

//     // clear the value of the current input field
//     document.getElementById("url-input").value = "";

//     // add the URL to the list
//     var list = document.getElementById("url-list");
//     var item = document.createElement("div");
//     item.innerHTML = url;
//     list.appendChild(item);
//   });
// </script> */}

// // <!-- Table to display the extracted hotel information -->
// // {% if hotel_dataset %}
// // <table>
// //   <!-- Table header -->
// //   <tr>
// //     <th>Name</th>
// //     <th>Address</th>
// //     <th>Stars</th>
// //     <th>Rating</th>
// //     <th>Distance</th>
// //     <th>Time</th>
// //   </tr>
// //   <!-- Table rows for each hotel -->
// //   {% for hotel in hotel_dataset %}
// //   <tr>
// //     <td>{{ hotel.name }}</td>
// //     <td>{{ hotel.address }}</td>
// //     <td>{{ hotel.stars }}</td>
// //     <td>{{ hotel.rating }}</td>
// //     <td>{{ hotel.distance }}</td>
// //     <td>{{ hotel.time }}</td>
// //   </tr>
// //   {% endfor %}
// // </table>

// // {% endif %}

let form = document.querySelector(".project");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // This prevents the window from reloading

    let formdata = new FormData(this);
    let input = formdata.get("lname");
    let url = "/new-project?lname=" + input;
    let p = document.getElementById("feedback-field");
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            p.innerHTML = data;
        });
});
var urlArray = [];

document.getElementById("add-button").addEventListener("click", function () {
    // get the value of the current input field
    var url = document.getElementById("url-input").value;

    // add the URL to the array
    urlArray.push(url);

    // clear the value of the current input field
    document.getElementById("url-input").value = "";

    // add the URL to the list
    var list = document.getElementById("url-list");
    var item = document.createElement("div");
    item.innerHTML = url;
    list.appendChild(item);
});

// handle the form submission
document
    .getElementById("url-form")
    .addEventListener("submit", function (event) {
        // prevent the form from being submitted
        event.preventDefault();

        // clear the current list
        document.getElementById("url-list").innerHTML = "";

        // loop through the array and add each URL to the list
        for (var i = 0; i < urlArray.length; i++) {
            var url = urlArray[i];
            var list = document.getElementById("url-list");
            var item = document.createElement("div");
            item.innerHTML = url;
            list.appendChild(item);
            console.log(list);
        }

        // submit the form with the list of URLs as a string
        document.getElementById("url-form").submit();
    });

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
