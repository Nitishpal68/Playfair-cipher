const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

var pairs =[];

function checkAndModify(input) {
  input = input.toLowerCase();
  const pattern = /^[a-z][a-z\s]*$/ ;
  if(pattern.test(input)){
  input = input.replace(/\s/g,'');
  input = input.toLowerCase();
  return input;
  }
  else {
    alert("No digits/special symbols allowed");
  }
}

function generateGrid() {
  const key = checkAndModify(document.getElementById("key").value.toLowerCase());
  const key_length = key.length;
  const remaining_alphabets_count = 25 - key_length;
  // console.log(key, key_length);

  var row_index = 1;
  var column_index = 1;

  for (let index = 0; index < key.length; index++) {
    const element = key[index];
    if (row_index < 6 && column_index < 6) {
      // console.log(row_index, column_index);
      document.getElementById(`col${row_index}${column_index}`).innerText = element;
      document.getElementById(`col${row_index}${column_index}`).style.backgroundColor = "pink";
      column_index++;
      if (column_index === 6) {
        row_index++;
        column_index = 1;
      }
    }
  }
  
  // console.log("2nd part");

  for (let index = 0; index < key.length; index++) {
    const element = key[index];
    const i = alphabets.indexOf(element);
    if (i > -1) {
      alphabets.splice(i, 1);
    }
  }

  for (let index = 0; index < remaining_alphabets_count; index++) {
    if (row_index < 6 && column_index < 6) {
      document.getElementById(`col${row_index}${column_index}`).innerText = alphabets[index];
      document.getElementById(`col${row_index}${column_index}`).style.backgroundColor = "yellow";
      column_index++;
      if (column_index === 6) {
        row_index++;
        column_index = 1;
      }
    }
  }
}


// PT fixer

function ptFixer() {
  document.getElementById("grids").innerHTML = "";
  var plain_txt = checkAndModify(document.getElementById('plain_text').value);
  plain_txt = plain_txt.replace(/\s/g,'');
  plain_txt = plain_txt.toLowerCase();

  var plain_txt_array = plain_txt.split("");

  var fixed_plain_text_pairs = [];
  
  var counter = 0;
  var first_index = 0;
  var second_index = 1;

  var max = plain_txt_array.length;
  // console.log("Initial ",plain_txt_array, plain_txt_array.length);

  while(counter < max) {
    const first_element = plain_txt_array[first_index];
    const second_element = plain_txt_array[second_index];

    if(first_element === second_element) {
      plain_txt_array.splice(second_index, 0, "x");
      plain_txt_array.join();
      // console.log(plain_txt_array, plain_txt_array.length);
      max++;
    }

    if(plain_txt_array.length % 2 != 0) {
      plain_txt_array.push("x"); 
    }
    fixed_plain_text_pairs.push({ first: plain_txt_array[first_index],second: plain_txt_array[second_index] });    
    
    counter += 2;
    first_index  += 2;
    second_index += 2;
  }

  var fixed_pair_html_list = "<ol>";
  fixed_plain_text_pairs.forEach( e => {
    pairs.push(e);
    fixed_pair_html_list += `<li>${e.first} ${e.second}</li>`;
    makeNewGrid(e);
  })
  // setting global var pairs
  document.getElementById("plain_text_display_area").innerHTML = fixed_pair_html_list + "</ol>";
  highlightTargets();
}


// for grid generation
function makeNewGrid(pair){
  const cipher_grid = document.getElementById("main_grid").innerHTML;
  const table_hading = `<br/><hr/><br/><h4>GRID FOR ${pair.first} ${pair.second}</h4>`;
  var my_temp_table = document.createElement("table");
  my_temp_table.id = `grid_for_${pair.first}${pair.second}`;

  my_temp_table.innerHTML = cipher_grid;
  my_temp_table.childNodes.forEach( tbody => {
    tbody.childNodes.forEach( tr => {
      tr.id = "";
      tr.childNodes.forEach( td =>{
        td.id = "";
        if(td.innerText == pair.first || td.innerText == pair.second){
          td.style.backgroundColor = "red";
          td.style.color = "white";
          // console.log(td.innerText);
        }
      })
    })
  })

  var heading = document.createElement("div");
  heading.innerHTML = table_hading;
  document.getElementById("grids").appendChild(heading);
  document.getElementById("grids").appendChild(my_temp_table);
}

// for highlighting the target char
function highlightTargets() {
  console.log(pairs);
}