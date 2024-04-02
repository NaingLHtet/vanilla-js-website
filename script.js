const body = document.querySelector(".body");
const sideBar = document.querySelector(".sidebar");
const goUpBtn = document.querySelector(".go-to-top");
const sidebarLinkEls = document.querySelector(".sidebar-links");

const aboutEl = document.querySelectorAll(".about-El");
const appIcons = document.querySelectorAll(".fa-brands");
const navbarBtns = document.querySelectorAll(".navLink-con");

const hobbitImagecon = document.querySelector("#hobbit-imgcon");
const lotrImagecon = document.querySelector("#lotr-imgcon");


//Day-Night icons
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

//menu icon & close icon
const openBtn = document.querySelector(".fa-bars");
const closeBtn = document.querySelector(".fa-x");

//comment tags
const commentText = document.querySelector("#commentText");
const commentsInput = document.querySelector("#commentarea");
const resultCommentsCon = document.querySelector(".resultComments-con");
const userNameInput = document.querySelector("#userNameInput");

//toast alert
const toastAlertContainer = document.querySelector(".toastAlertContainer");
const commentBtn = document.querySelector(".comment-btn");
const commented = "commented";
const commentDelete = "comment deleted";




//show sidebar when menu icon is click
openBtn.addEventListener("click", () => {
  sideBar.style.left = "0%";
});
//hide sidebar when close(x) icon is click
closeBtn.addEventListener("click", () => {
  closeSidebar();
});

//close sidebar when the div tags inside sidebar are click
sidebarLinkEls.addEventListener("click", () => {
  closeSidebar();
});
//function to close sidebar
function closeSidebar() {
  sideBar.style.left = "-100%";
}

//apply smooth scrolling effect on goUp button
goUpBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



//send user to the certain view base on the clicked element
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  
  if(section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  };
};






function dayMood() {
  sunIcon.style.display = "none";
  moonIcon.style.display = "block";
  body.style.color = "rgb(0,0,0)";
  backgroundCl("rgb(255,255,255)","rgb(0,0,0)");
  
  commentText.classList.add("commentText-dayMood");
  
  //store the day theme in localStorage
  localStorage.setItem("theme", "day");
};
function nightMood() {
  moonIcon.style.display = "none";
  sunIcon.style.display = "block";
  body.style.color = "rgb(255,255,255)";
  commentText.classList.remove("commentText-dayMood");
  
  body.style.backgroundColor = "rgb(19,19,19)";
  sideBar.style.backgroundColor = "rgb(19,19,19)";
  hobbitImagecon.style.backgroundColor = "rgb(52, 58, 64)";
  lotrImagecon.style.backgroundColor = "rgb(52, 58, 64)";
  userNameInput.style.backgroundColor = "rgb(70,70,70)";
  commentsInput.style.backgroundColor = "rgb(70,70,70)";
  userNameInput.style.color = "rgb(255,255,255)";
  commentsInput.style.color = "rgb(255,255,255)";
  
  //store the night theme in localStorage
  localStorage.setItem("theme", "night");
};

function  backgroundCl(BackgroundC,color) {
  body.style.backgroundColor = BackgroundC;
  sideBar.style.backgroundColor = BackgroundC;
  hobbitImagecon.style.backgroundColor = BackgroundC;
  lotrImagecon.style.backgroundColor = BackgroundC;
  userNameInput.style.backgroundColor = BackgroundC;
  commentsInput.style.backgroundColor = BackgroundC;
  userNameInput.style.color = color;
  commentsInput.style.color = color;
};

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "day") {
    dayMood();
  }else {
    nightMood();
  };
});
//change Light & Dark moods
sunIcon.addEventListener("click", () => {
  dayMood();
});
moonIcon.addEventListener("click", () => {
  nightMood();
});



//store the comments in localStorage
const addComment = () => {
  //store user's comment and name in variable
  const userComment = commentsInput.value.trim();
  const userName = userNameInput.value.trim();
  //if user clicked comment button without writing comment
  if(userComment === "") {
    alert("Please write your comment first...");
    return;
  }else {
    toastAlert(commented);
  };
    
  // variable to store texts with key name comments inside localStorage that were changed as an array or if the comments key is not defined,create an empty array
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  // store usernames
  let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
  
  //push user's comment text inside comments array
  comments.push(userComment);
  //add user's comment texts in key name comments inside localStorage
  localStorage.setItem("comments",JSON.stringify(comments));
  
  //store user names in localStorage
  usernames.push(userName);
  localStorage.setItem("usernames",JSON.stringify(usernames));
  
  //call display function to show comments inside localStorage
  displayComment();
  //clear the text between textarea after comment posted
  commentsInput.value = "";
  userNameInput.value = "";
};



// function for user's comments
const displayComment = () => {
  resultCommentsCon.innerHTML = "";
  
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
  
  for(let i = 0;i < comments.length;i++ ) {
    const nameCommentCon = document.createElement("div");
    nameCommentCon.classList.add("nameCommentCon");
    
    //element to store username
    const userNameCon = document.createElement("div");
    userNameCon.classList.add("userName-con");
    userNameCon.textContent = usernames[i] ? `${usernames[i]} :` : `Anonymous :`;
    
    //add the texts from comments array stored in localStorage
    const commentText = document.createElement("div");
    commentText.textContent = comments[i];
    
  //create trash icon and remove comment by clicking that
   const trashIcon = document.createElement("i");
   trashIcon.classList.add("fa-solid","fa-trash");
   trashIcon.addEventListener("click", () => {
     confirmation(i,comments,usernames);
    });
    
    nameCommentCon.append(userNameCon,commentText, trashIcon)
    resultCommentsCon.append(nameCommentCon);
  };
};


//confirmation box
function confirmation(i,comments,usernames) {
  const confirmBox = document.createElement("div");
  confirmBox.classList.add("confirm-box");
  
  const messageText = document.createElement("div");
  messageText.classList.add("message-text");
  messageText.textContent = "Are you sure to delete this comment?";
  
  const buttonCon = document.createElement("div");
  buttonCon.classList.add("button-con");
  
  const cancelButton = document.createElement("div");
  cancelButton.classList.add("cancel");
  cancelButton.textContent = "Cancel";
  const okButton = document.createElement("div");
  okButton.classList.add("ok");
  okButton.textContent = "Ok";
  
  buttonCon.append(cancelButton,okButton);
  confirmBox.append(messageText,buttonCon);
  body.append(confirmBox);
  
  cancelButton.addEventListener("click", () => {
    confirmBox.remove();
  });
  
  okButton.addEventListener("click", () => {
    confirmBox.remove();
    comments.splice(i, 1);
    usernames.splice(i, 1);
    toastAlert(commentDelete);
    localStorage.setItem("comments", JSON.stringify(comments));
    localStorage.setItem("usernames", JSON.stringify(usernames));
    displayComment();
  });
};

//show comments from localStorage when the page is loaded
window.addEventListener("load", displayComment);
commentBtn.addEventListener("click", addComment);
window.addEventListener("scroll", () => {
  const confirmBox = document.querySelector(".confirm-box");
  if(confirmBox) {
    confirmBox.remove();
  };
});


const textAboveComment = () => {
  setTimeout(() => {
    commentText.textContent = "What's your Favourite movies?";
  }, 0);
  setTimeout(() => {
    commentText.textContent = "Leave a comment about your fav movies _";
  }, 6000);
};

textAboveComment();
setInterval(() => {
  textAboveComment();
}, 12000);


// toast alert on clicking comment button
const toastAlert = (text) => {
  //clear alert container everytime user click
  toastAlertContainer.innerHTML = "";
  
  //create a new div inside alert container
  const toastAlert = document.createElement("div");
  toastAlert.classList.add("toastAlert");
  toastAlert.textContent = text;
  
  toastAlertContainer.append(toastAlert);
  
  toastAlert.style.bottom = `-${toastAlert.offsetHeight}px`;
  //show alert message after 0.1s
  setTimeout(() => {
    toastAlert.style.bottom = "0px";
  }, 100);
  //make alert message disappear after 3s
  setTimeout(() => {
    toastAlert.style.bottom = `-${toastAlert.offsetHeight}px`;
  }, 2000);
};







aboutEl.forEach((e) =>  {
  e.addEventListener("click", () => {
  alert("I used Html,Css and Vanilla Javascript to create this website.Stored data in localStorage.This is just a message.");
 });
});

appIcons.forEach((e) => {
  e.addEventListener("click", () => {
  alertBox();
 });
});

const alertBox = () => {
  alert("Oops,I didn't insert links here!");
};

