const form = document.querySelector(".add-contact"),
      editForm = document.querySelector(".edit-contact"),
      addBtn = document.querySelector(".add-btn"),
      contactBody = document.querySelector(".contact-body"),
      contactList = document.querySelector(".contacts"),
      filter = document.querySelector(".filter"),
      inputFullName = document.querySelector(".fullName"),
      inputPhoneNumber = document.querySelector(".phoneNumber"),
      addContactModal = document.querySelector(".add-contact"),
      addBtnIcon = document.querySelector(".addBtn"),
      closeIcon = document.querySelector(".icon-close"),
      iconClose = document.querySelector(".close"),

      errorName = document.querySelector(".error-name"),
      errorNum = document.querySelector(".error-num");
  
  

//load all EventListener
loadEventListeners();

function loadEventListeners() {

    // dom load
    document.addEventListener("DOMContentLoaded", getContactFromLS);

    //add contact
    form.addEventListener("submit", addContact);
    // addBtn.addEventListener("click", addContact);

    //remove contact
    contactList.addEventListener("click", removeContact);

    //edit contact
    contactList.addEventListener("click", editContact);


    //filter contact
    filter.addEventListener("keyup", filterContacts);

    //show form
    addBtnIcon.addEventListener("click", showForm);

    //hide form
    closeIcon.addEventListener("click", hideForm);
    iconClose.addEventListener("click", closeEditForm);
}

function showForm() {
    form.classList.add("active");
    contactBody.style.opacity = ".2";
}

function hideForm() {
    form.classList.remove("active");
    contactBody.style.opacity = "1";
}

function showEditForm() {
    editForm.classList.add("active");
    contactBody.style.opacity = ".2";
}

function closeEditForm() {
    editForm.classList.remove("active");
    contactBody.style.opacity = "1";
}

//add contact
function addContact(e) {
    // e.preventDefault();
    //create li element
    const li = document.createElement("li");
    li.className = "contact";

    //create div
    const avatar = document.createElement("div");
    avatar.className = "avatar";


    // const redColor = Math.floor(Math.random() * 255);
    // const greenColor =  Math.floor(Math.random() * 255);
    // const blueColor =  Math.floor(Math.random() * 255);

    // console.log(redColor)
    // avatar.style.backgroundColor = `rgba(${redColor}, ${greenColor}, ${blueColor}, 1)`;
    
    //pick colors randomly for an array of color
    const randomColors = ["#eb9595", "#3fc6bd", "#8c7399", "#189ad3", "#ea3d3d"];
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    // console.log(randomColor);

    //set the avatar's background color
    avatar.style.backgroundColor = randomColor;


    //create the h5 in avatar
    const inputInitials = document.createElement("h5");

    //get initials
    const initials = `${inputFullName.value[0]}${inputFullName.value[1]}`;
    // console.log(initials);

    // console.log(inputFullName.value);
    inputInitials.innerHTML = initials;

    //append initials to avatar
    avatar.appendChild(inputInitials);

    //create contact info
    const contactInformation = document.createElement("div");
    contactInformation.className = "contact-info";


    //create fullname
    const fullName = document.createElement("p");
    fullName.className = "full-name";
    fullName.appendChild(document.createTextNode(inputFullName.value));

    //create phone number
    const phoneNumber = document.createElement("p");
    phoneNumber.className = "phone-number";

    //append the input first name to p
    phoneNumber.appendChild(document.createTextNode(inputPhoneNumber.value));

    //append fullname and phone number to contact information
    contactInformation.appendChild(fullName);
    contactInformation.appendChild(phoneNumber);


    //create icons div
    const icons = document.createElement("div");
    icons.className = "icons";

    //create icon-delete
    const iconDelete = document.createElement("div");
    iconDelete.classList = "icon icon-delete";

    //create icon-edit
    const iconEdit = document.createElement("div");
    iconEdit.classList = "icon icon-edit";

    //append icon edit and icon delete to icons
    icons.appendChild(iconEdit);
    icons.appendChild(iconDelete);

    //append to li
    li.appendChild(avatar);
    li.appendChild(contactInformation);
    li.appendChild(icons);
    
    contactList.appendChild(li);

    //store in local storage
    storeContactInLS();

    form.reset();
    // inputFullName.value ="";
    // inputPhoneNumber.value = "";
}

//get from LS
function getContactFromLS (e) {
    e.preventDefault();

    let contactDetails;
    //if the local storage is empty
    if (localStorage.getItem("contactDetails") === null) {
        //it creates an empty array
        contactDetails = [];
    } 
    //if the local storage isn't
    else {
        //retriving the contactDetails array by the key "contactDetails"
        contactDetails = JSON.parse(localStorage.getItem("contactDetails"));
    }

    contactDetails.forEach(function(contact) {
        //create li element
        const li = document.createElement("li");
        li.className = "contact";

        //create div
        const avatar = document.createElement("div");
        avatar.className = "avatar";

        //pick colors randomly for an array of color
        const randomColors = ["#eb9595", "#3fc6bd", "#8c7399", "#189ad3", "#ea3d3d"];
        const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        //set the avatar's background color
        avatar.style.backgroundColor = randomColor;

        //create the h5 in avatar
        const inputInitials = document.createElement("h5");

        //get initials
        const initials = `${contact.contactName[0]}${contact.contactName[1]}`;
        inputInitials.innerHTML = initials;

        //append initials to avatar
        avatar.appendChild(inputInitials);

        //create contact info
        const contactInformation = document.createElement("div");
        contactInformation.className = "contact-info";


        //create fullname
        const fullName = document.createElement("p");
        fullName.className = "full-name";
        fullName.appendChild(document.createTextNode(contact.contactName));

        //create phone number
        const phoneNumber = document.createElement("p");
        phoneNumber.className = "phone-number";

        //append the input first name to p
        phoneNumber.appendChild(document.createTextNode(contact.phoneNumber));

        //append fullname and phone number to contact information
        contactInformation.appendChild(fullName);
        contactInformation.appendChild(phoneNumber);


        //create icons div
        const icons = document.createElement("div");
        icons.className = "icons";
        //create icon-delete
        const iconDelete = document.createElement("div");
        iconDelete.classList = "icon icon-delete";

        //create icon-edit
        const iconEdit = document.createElement("div");
        iconEdit.classList = "icon icon-edit";

        //append icon edit and icon delete to icons
        icons.appendChild(iconEdit);
        icons.appendChild(iconDelete);

        //append to li
        li.appendChild(avatar);
        li.appendChild(contactInformation);
        li.appendChild(icons);

        contactList.appendChild(li);
    })
}

//store contactdetails in LS
function storeContactInLS() {

    let contactDetail = {
        contactName: inputFullName.value,
        phoneNumber: inputPhoneNumber.value
    };

    //STOP FROM OVERRIDING
    let contactDetails;
    //if the local storage is empty
    if (localStorage.getItem("contactDetails") === null) {
        //it creates an empty array
        contactDetails = [];
    } 
    //if the local storage isn't
    else {
        //retriving the contactDetails array by the key "contactDetails"
        contactDetails = JSON.parse(localStorage.getItem("contactDetails"));
    }

    //insert contact detail in bigger array which is the contactDetails
    contactDetails.push(contactDetail);

    //convert the array to string and stores the array in LS with the key "contactDetails"
    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
}

//edit contact
function editContact(e) {
    // console.log(e.target);

    //if what we are targetting has a class of icon-edit...
    if(e.target.classList.contains("icon-edit")) {
        // console.log("clicked");
        let fullName = e.target.parentElement.previousElementSibling.childNodes[0];
            phoneNumber = e.target.parentElement.previousElementSibling.childNodes[1];

        console.log(fullName.innerHTML);

        let name = document.querySelector('input[name="fullName"]')
        console.log(name.value);
        name.value = fullName.innerHTML;

        let phone = document.querySelector('input[name="phoneNumber"]')
        phone.value = phoneNumber.innerHTML;

        showEditForm();       
    }
}

//remove contact
function removeContact(e) {
    //if what we are targetting has a class of icon-delete, remove the parent of the parent...in this case..div:icon li
    if(e.target.classList.contains("icon-delete")) {
        e.target.parentElement.parentElement.remove();

        //remove from LS
        removeContactFromLS(e.target.parentElement.parentElement);
    }
}

//remove from LS
function removeContactFromLS(e) {
    // console.log(e);
    let fullName = e.querySelector(".full-name");
    let phoneNumber = e.querySelector(".phone-number");

    // console.log(fullName.innerHTML);
    // console.log(phoneNumber.innerHTML);

    let contactDetails;
    //if the local storage is empty
    if (localStorage.getItem("contactDetails") === null) {
        //it creates an empty array
        contactDetails = [];
    } 
    //if the local storage isn't
    else {
        //retriving the contactDetails array by the key "contactDetails"
        contactDetails = JSON.parse(localStorage.getItem("contactDetails"));
    }

    contactDetails.forEach(function(contactDetail, index) {
        // console.log(contactDetail);
        
        // console.log(contactDetail.contactName);
        // console.log(contactDetail.phoneNumber);

        if(fullName.innerHTML === contactDetail.contactName && phoneNumber.innerHTML === contactDetail.phoneNumber){
            contactDetails.splice(index, 1);
        }
    })

    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
}

//filter contacts
function filterContacts(e) {
    //getting the value of what is being type in the search field and converting to lowercase
    const text = e.target.value.toLowerCase();
    //selecting the lis with the class contact in the ul
    const contactInfo = document.querySelectorAll(".contact");
    
    contactInfo.forEach(function(contact) {
        //getting the second element in the li
        const contactname = contact.firstElementChild.nextElementSibling.textContent;
        // console.log(contactname);

        // if what is being typed in the search bar matches the text in second element in the li
        if(contactname.toLowerCase().indexOf(text) != -1) {
            contact.style.display = "block";
        } 
        //if not don't show
        else {
            contact.style.display = "none";
        }
    });
}



