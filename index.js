displayRes();

function Validate(formval) {
  var isEdit = formval.userId.value ? true : false;
  var idValue = Math.floor(Math.random() * 1000);
  var oldItems = JSON.parse(localStorage.getItem("userDetails")) || [];

  if (isEdit) {
    oldItems.map((item, index) => {
      if (item.id === parseInt(formval.userId.value)) {
        oldItems[index].fname = formval.First_Name.value;
        oldItems[index].lname = formval.Last_Name.value;
        oldItems[index].email = formval.Email.value;
      }
    });
  } else {
    var newItem = {
      fname: formval.First_Name.value,
      lname: formval.Last_Name.value,
      email: formval.Email.value,
      id: idValue,
    };
    oldItems.push(newItem);
  }

  localStorage.setItem("userDetails", JSON.stringify(oldItems));

  displayRes();
}

function displayRes() {
  var data = JSON.parse(localStorage.getItem("userDetails")) || [];
  if (data) {
    var Result = "";
    data.map((user, index) => {
      Result +=
        `<tr ${user.id}><td class='FName1'>` +
        user.fname +
        `</td><td class='LName1'>` +
        user.lname +
        `</td><td class='Email'>` +
        user.email +
        `</td>
              <td id='deleteicon' ><i onclick='removeItem(${user.id})' class='fas fa-trash' /i></td>
              <td id='editIcon' ><i onclick='editItem(${user.id})' class="fa fa-pencil-square-o" /i></td>
              </tr>`;
    });

    var DisplayResult =
      "<table class='Table'><tr><th class='FName Heading'>First Name</th><th class='LName Heading'>Last Name</th> <th class='Email Heading'>Email</th><th colspan='2' class='delete'>Action</th></tr>" +
      Result +
      "</table>";
    document.getElementById("root").innerHTML = DisplayResult;
  }
}

function removeItem(id) {
  var storedVal = JSON.parse(localStorage.getItem("userDetails"));
  var afterRemoveVal = storedVal.filter((item) => item.id !== id);

  localStorage.setItem("userDetails", JSON.stringify(afterRemoveVal));
  displayRes();
}

function editItem(id) {
  var storedVal = JSON.parse(localStorage.getItem("userDetails"));
  var selectedVal = storedVal.filter((item) => item.id === id);

  document.getElementById("First_Name").value = selectedVal[0].fname;
  document.getElementById("Last_Name").value = selectedVal[0].lname;
  document.getElementById("Email").value = selectedVal[0].email;
  document.getElementById("userId").value = selectedVal[0].id;
  document.getElementById("submit").value = "Edit Row";
}
