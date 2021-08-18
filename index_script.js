const form = document.getElementById('query');
const searchButton = document.getElementById('searchButton');

const map = document.getElementById('map');

const dateDisplay = document.getElementById('dateDisplay');

var dates = ["April, 1861", "April, 1866", "May, 1866", "July 3, 1866", "July 5, 1866", "December, 1866"];
var dateIndex = 0;

function autocomplete(inp, arr, button) {
  var currentFocus;

  //Executes function when someone writes in the field
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;      // this refers to the input field
      closeAllLists();

      /*if (!val) {
          return false;
      }*/

      currentFocus = -1;

      // Creates div to contain items
      a = document.createElement('div');
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              b = document.createElement('div');

              // Makes matching letters bold
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);

              // Adds hidden input in case someone clicks on the item
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
                  inp.value = this.getElementsByTagName("input")[0].value;
                  button.click();
                  closeAllLists();
              });
              
              a.appendChild(b);
          }
      }
  });

  // Gives dropdown options when clicks on Search bar
  inp.addEventListener("click", function(e) {
      var a, b, i, val = this.value;      // this refers to the input field
      closeAllLists();

      currentFocus = -1;

      // Creates div to contain items
      a = document.createElement('div');
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              b = document.createElement('div');

              // Makes matching letters bold
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);

              // Adds hidden input in case someone clicks on the item
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
                  inp.value = this.getElementsByTagName("input")[0].value;
                  button.click();
                  closeAllLists();
              });
              
              a.appendChild(b);
          }
      }
  });

  // Executes a function when a key is pressed
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      
      // If DOWN key is pressed
      if (e.keyCode == 40) {
          currentFocus++;

          addActive(x);
      }
      // If UP key is pressed
      else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
      }
      // If ENTER key is pressed
      else if (e.keyCode == 13) {
          //e.preventDefault();
          if (currentFocus > -1) {
              if (x) x[currentFocus].click();
          }
      }
  });

  function addActive(x) {
      if (!x) return false;

      removeActive(x);

      if (currentFocus >= x.length) {
          currentFocus = 0;
      }

      if (currentFocus < 0) {
          currentFocus = (x.length - 1);
      }

      x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
      }
  }
   
  //Closes all autocomplete lists in except the one passed as an arg
  function closeAllLists(el) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
          if (el != x[i] && el != inp) {
              x[i].parentNode.removeChild(x[i]);
          }
      }    
  }

  // When someone clicks off elsewhere on the page close the list
  document.addEventListener("click", function(e) {
      closeAllLists(e.target);
  });
}

function dateChange(direction) {
    if (direction == 'back') {
        if (dateIndex != 0) {
            dateIndex -= 1;
            dateDisplay.innerHTML = dates[dateIndex];
        }
    }

    else if (direction == 'forward') {
        if (dateIndex != dates.length - 1) {
            dateIndex += 1;
            dateDisplay.innerHTML = dates[dateIndex];
        } 
    }

    if (dateIndex > 4) {
        map.src = 'Germany_Map_After.png';
    }

    if (dateIndex <= 4) {
        map.src = 'German Map Before.svg';
    }
}

autocomplete(form, dates, searchButton);
dateDisplay.innerHTML = dates[dateIndex];