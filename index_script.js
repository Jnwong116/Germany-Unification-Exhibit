const form = document.getElementById('query');
const searchButton = document.getElementById('searchButton');

const map = document.getElementById('map');
const berlin = document.getElementById('berlin');
const koniggratz = document.getElementById('koniggratz');
const prague = document.getElementById('prague');
const anhalt = document.getElementById('anhalt');
const france = document.getElementById('france');
const bavaria = document.getElementById('bavaria');
const austria = document.getElementById('austria');

const berlin_preview = document.getElementById('berlin_preview');
const koniggratz_preview = document.getElementById('koniggratz_preview');
const prague_preview = document.getElementById('prague_preview');
const anhalt_preview = document.getElementById('anhalt_preview');
const france_preview = document.getElementById('france_preview');
const bavaria_preview = document.getElementById('bavaria_preview');
const austria_preview = document.getElementById('austria_preview');

var map_pins = [berlin, koniggratz, prague, anhalt, france, bavaria, austria];

const dateDisplay = document.getElementById('dateDisplay');

var dates = ["April, 1861", "April, 1866", "May, 1866", "June 3, 1866", "July 3, 1866", "July 5, 1866", "September, 1866", "December, 1866", "April 11, 1868"];
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

    if (dateIndex > 5) {
        map.src = 'Germany_Map_After.png';
    }

    if (dateIndex <= 5) {
        map.src = 'German Map Before.svg';
    }

    updateMap();
}

function updateMap() {
    clearMap();

    var map_pin;

    switch(dateIndex) {
        case 0:
            map_pin = berlin;
            break;
        case 1:
            map_pin = berlin;
            break;
        case 2: 
            map_pin = prague;
            break;
        case 3:
            map_pin = berlin;
            break;
        case 4:
            map_pin = koniggratz;
            break;
        case 5:
            map_pin = anhalt;
            break;
        case 6:
            map_pin = france;
            break;
        case 7:
            map_pin = bavaria;
            break;
        case 8: 
            map_pin = austria;
            break;
    }

    map_pin.style.display = "block";
    map_pin.scrollIntoView({block: "center"});

    showPreview();
}

function clearMap() {
    for (var i = 0; i < map_pins.length; i++) {
        map_pins[i].style.display = "none";
    }
}

function showPreview() {
    switch(dateIndex) {
        case 0:
            berlin_preview.childNodes[1].src = './sources/Prussian-needle-rifle.jpg';    
        
            berlin_preview.childNodes[3].innerHTML = "In 1861, Helmuth von Moltke, the Chief of the Prussian General Staff reviewed Prussia's military improvements, particularly \
            the new needle gun. He evaluated how it would change the way the Prussian army fought and how it would give the Prussian military an advantage over neighboring\
            countries, particularly France. He takes note of the fact none of their neighboring powers have brought their firearms up to the same level and how this new technology \
            will bring Prussia great success in the event of a war breaking out.";
            
            berlin.onclick = function() {
                location.href = 'moltke_gun_improvements/moltke_gun_doc.html';
            }
            break;
        case 1:
            berlin_preview.childNodes[1].src = './sources/prussia-railways.jpg';
            
            berlin_preview.childNodes[3].innerHTML = "In 1866, with the possibility of war between Prussia and Austria rising up, Helmuth von Moltke began to formulate a strategy \
            for mobilizing Prussian troops and to win the war. With Prussia’s disadvantage in terms of numbers, Moltke had to find a way to overcome this disadvantage. The \
            solution he comes up with is to utilize Prussia’s railroads. By doing so, he notes that Prussia can have their army on the front-lines much faster than Austria and \
            its potential allies as they do not have as many railroads. By getting troops to the fight faster than Austria and its allies, Prussia will encounter a much smaller \
            army and will remove the advantage of numbers.";

            berlin.onclick = function() {
                location.href = 'prussian_railways/prussian_railways.html';
            }

            berlin_preview.style.height = '500px';
            break;
        case 2:
            prague_preview.childNodes[1].src = './sources/austrian-propaganda.png';

            prague_preview.childNodes[3].innerHTML = "In May of 1866, this cartoon was printed in a Czech magazine. The title says: “What would these two give for having eyes \
            in the back?”. In the cartoon there are two boats, one is Prussia and the other is Italy. Prussia has Schleswig-Holstein in its boat and Italy has Venice. Both boats \
            are going backwards down the waterfall of war. At the bottom of the waterfall there is a rock which is the united forces of Austrian nations. ";

            prague.onclick = function() {
                location.href = 'austrian_propaganda/austrian_propaganda.html';
            }

            prague_preview.style.height = '450px';
            break;
        case 3:
            berlin_preview.childNodes[1].src = './sources/prussian-propaganda.jpg';
            
            berlin_preview.childNodes[3].innerHTML = "On June 3, just two weeks before the outbreak of the war, Wilhelm Scholz published this cartoon in a Prussian satirical \
            journal called Kladderadatsch. The caption reads: “The opportunity is favorable, either to become great and respond to the wishes of the Prussian people, or to become \
            the most popular man in Germany by acceding to their general wishes.” The left hand side shows a detailed plan of how Bismarck can respond to the wishes of Prussia \
            through reform, and the other side shows Bismarck covering his ears to chants demanding he resign.";

            berlin.onclick = function() {
                location.href = 'prussian_cartoon/prussian_cartoon.html';
            }

            berlin_preview.style.height = '450px';
            break;
        case 4:
            koniggratz_preview.childNodes[1].src = './sources/battle-of-koniggratz.jpg';

            koniggratz_preview.childNodes[3].innerHTML = "On July 3, 1866, the Battle of Koniggratz took place. This was the decisive battle in the Austro-Prussian war. \
            The image above depicts the battle between the Austrian and Prussian army. You can see the chaos of the battle and how the Austrian forces appear as though they are \
            making their last stand.";

            koniggratz.onclick = function() {
                location.href = 'battle_of_koniggratz/battle_of_koniggratz.html';
            }

            break;
        case 5:
            anhalt_preview.childNodes[1].src = '';

            anhalt_preview.childNodes[3].innerHTML = "Two days after the Battle of Koniggratz, on July 5, 1866, Wilhelm von Kugelgen wrote this letter, reflecting on the \
            war and how the people of Prussia had reacted to news of the battle. He speaks about the pain families feel after losing their children and his hopes for the future \
            of Germany under Bismarck.";

            anhalt.onclick = function() {
                location.href = 'bismarck_popular_prussia/bismarck_popular_prussia.html';
            }


            anhalt_preview.style.height = '200px';
            break;
        case 6:
            france_preview.childNodes[1].src = './sources/france-cartoon.jpg';

            france_preview.childNodes[3].innerHTML = "In September, 1866, a caricature appeared in a French journal Le Charivari. It shows a Prussian soldier trying to \
            stitch together the defeated German states: Saxony, Hanover, Nassau, and Frankfurt; together with Prussia. The caption says: “It’s one thing to know how to use a \
            needle … But it’s a skill that should not be abused.”";

            france.onclick = function() {
                location.href = 'french_cartoon/french_cartoon.html';
            }


            france_preview.style.height = '500px';
            break;
        case 7:
            bavaria_preview.childNodes[1].src = '';

            bavaria_preview.childNodes[3].innerHTML = "After Prussia’s victory, many states were forced into the North German Confederation. The southern German states still \
            remained independent however. In December of 1866, Sir Henry Francis Howard wrote a report to the British Foreign Office on the mood in the annexed territories and \
            southern states. Sir Henry was the British envoy to Bavaria from 1866 to 1872.";

            bavaria.onclick = function() {
                location.href = 'mood_in_bavarian_states/mood_in_bavaria.html';
            }


            bavaria_preview.style.height = '200px';
            break;
        case 8:
            austria_preview.childNodes[1].src = './sources/southern-german-states-cartoon.jpg';

            austria_preview.childNodes[3].innerHTML = "Two years after the war, in April 1868, this woodcut appeared in an Austrian journal Figaro. It shows Prussia whipping \
            the other Germans into the North German Confederation. The caption reads, “In the end, the South Germans, too, will join; we are obviously still too liberal for them!”";

            austria.onclick = function() {
                location.href = 'south_german_cartoon/south_german_cartoon.html';
            }


            austria_preview.style.height = '300px';
            break;
    }
}

autocomplete(form, dates, searchButton);
dateDisplay.innerHTML = dates[dateIndex];
updateMap();