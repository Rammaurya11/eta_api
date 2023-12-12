// fetchcheck function Start

function fetchcheck() {
    fetch("http://13.235.98.4:7100/check", {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
        authkey: localStorage.getItem("authkey"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          showpage("dashboard");
          let id = 0;
          const elem = document.querySelector("#dashboard");
          let pos = -80;
          clearInterval(id);
          id = setInterval(frame, 3);
          function frame() {
            if (pos == 0) {
              clearInterval(id);
            } else {
              pos++;
              elem.style.bottom = pos + "%";
            }
          }
        } else {
          showpage("login");
        }
      });
  }
  fetchcheck();
  
  //  fetchcheck function End
  //  fetchlogin function Start
  
  function fetchlogin() {
    var mobile = document.querySelector("input[name=mobile]").value;
    var password = document.querySelector("input[name=password]").value;
  
    fetch("http://13.235.98.4:7100/login", {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify({
        mobile: mobile,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") {
          localStorage.setItem("authkey", data.authkey);
          fetchcheck();
        } else {
          document.querySelector(".msg").innerHTML = data.msg;
          document.querySelector(".msg").style.color = "red";
        }
      });
  }
  // fetchlogin function End
  // fetchnewentry function start
  function fetchnewentry() {
    var amount = document.querySelector("input[name=amount]").value;
    var type = document.querySelector("input[name=type]").value;
    var description = document.querySelector("input[name=description]").value;
  
    fetch("http://13.235.98.4:7100/entries", {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
        authkey: localStorage.getItem("authkey"),
      },
      body: JSON.stringify({
        amount: amount,
        description: description,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") {
          document.querySelector(".msg1").innerHTML = data.msg;
          document.querySelector(".msg1").style.color = "rgb(36, 196, 36)";
          document.querySelector("#newdataentry > form").reset();
          showpage("newdataentry");
        } else {
          document.querySelector(".msg1").innerHTML = data.msg;
          document.querySelector(".msg1").style.color = "red";
        }
      });
  }
  // fetchnewentry function End
  
  // fetchget function Start
  function fetchget() {
    fetch("http://13.235.98.4:7100/entries", {
      method: "GET",
      headers: {
        "content-type": "application/JSON",
        authkey: localStorage.getItem("authkey"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        document.querySelector("tbody").innerHTML = "";
        console.log(data);
        data.rows.forEach((e) => {
          let tbody = `<tr>
              <td>${e.id}</td>
              <td>${e.amount}</td>
              <td>${e.description}</td>
              <td>${e.type}</td>
              <td>${e.date}</td>
              <td>
              <p class="delete" id="${e.id}">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                ></path>
              </svg>
              </p>
              <p class="edit" id="">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                ></path>
              </svg>
              </p>
              </td>
              </tr>`;
          document.querySelector("tbody").innerHTML += tbody;
        });
        deleteevent();
      });
  }
  //---- fetchget function End-----
  
  // deleteevent function start
  function deleteevent() {
    var deletebutton = document.querySelectorAll(".delete");
    deletebutton.forEach((button) => {
      button.addEventListener("click", function () {
        var iddelete = button.getAttribute("id");
        deletedata(iddelete);
      });
    });
  
    function deletedata(id) {
      fetch(`http://13.235.98.4:7100/entries/?id=${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/JSON",
          authkey: localStorage.getItem("authkey"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            fetchget();
            console.log("data deleted", data);
          } else {
            console.log("data is not deleted", data);
          }
        });
    }
  }
  // deleteevent function End
  //showpage function start
  function showpage(id) {
    document.querySelectorAll(".page").forEach((e) => {
      e.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
  }
  //showpage function End
  
  // login page code start
  var form = document.querySelector(".login");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetchlogin();
  });
  var form = document.querySelector("#newdataentry");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetchnewentry();
  });
  // newdatabtn  page code Start
  
  document.querySelector(".newdatabtn").onclick = function () {
    let id = 0;
    const elem = document.querySelector(".newdataentry");
    let pos = -80;
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.bottom = pos + "%";
      }
    }
    showpage("newdataentry");
  };
  
  // newdatabtn  page code End
  // viewdatabtn  page code Start
  
  document.querySelector(".viewdatabtn").onclick = function () {
    let id = 0;
    const elem = document.querySelector("#table");
    let pos = -80;
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.bottom = pos + "%";
      }
    }
    showpage("table");
    fetchget();
  };
  
  // viewdatabtn  page code End
  
  // back from page code start
  
  document.querySelector(".left").onclick = function () {
    let id = 0;
    const elem = document.querySelector(".dashboard");
    let pos = -80;
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.bottom = pos + "%";
      }
    }
    fetchcheck("dashboard");
  };
  
  document.querySelector(".backbt").onclick = function () {
    let id = 0;
    const elem = document.querySelector(".dashboard");
    let pos = -80;
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.bottom = pos + "%";
      }
    }
    fetchcheck("dashboard");
  };
  // back from  page code End