
function handleFormSubmit(event)
{
    event.preventDefault();
    const ImageDetails = {
      url: event.target.url.value,
      title: event.target.title.value,
      desc: event.target.desc.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/523b7bcf1c834679880eef1b22a84aa5/appointmentData",
        ImageDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data,response.data.length)})
      .catch((error) => console.log(error));
  
  } 
  window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/523b7bcf1c834679880eef1b22a84aa5/appointmentData")
    .then((response) =>{
        for(let i=0; i<response.data.length; i++)
        {
            displayUserOnScreen(response.data[i],response.data.length)
        }
    } )
      .catch((error) => console.log(error));
  })
  function displayUserOnScreen(ImageDetails,count) {
    console.log(count)
    // Clearing the input fields
    document.getElementById("url").value = "";
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";

    const userItem = document.createElement("div");
    userItem.innerHTML=
    `<h2>${ImageDetails.title}</h2>
    <img src="${ImageDetails.url}" height=200 width= 300>
    <p>${ImageDetails.desc}</p>`
    
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Blog"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit Blog"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("#container");
    userList.appendChild(userItem);
    
    const counter = document.querySelector(".num");
    counter.appendChild(document.createTextNode(`${count}`));
    
    deleteBtn.addEventListener("click", function (event) {
        axios.delete(`https://crudcrud.com/api/523b7bcf1c834679880eef1b22a84aa5/appointmentData/${ImageDetails._id}`)
        .then((response) => console.log(response.data))
         .catch((error) => console.log(error));
         userList.removeChild(event.target.parentElement);
    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      document.getElementById("url").value = ImageDetails.url;
      document.getElementById("title").value = ImageDetails.title;
      document.getElementById("desc").value = ImageDetails.desc;
      axios.delete(`https://crudcrud.com/api/962ae7dbb8304f338218e083000426a2/appointmentData/${ImageDetails._id}`)
        .then((response) => console.log(response.data))
         .catch((error) => console.log(error));
         
    });
  }

