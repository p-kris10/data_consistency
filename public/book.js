// Make connection
var socket = io.connect(`http://localhost:4000`);

//Query DOM
var num1 = document.getElementById('num1');
    num2 = document.getElementById('num2');
    btn = document.getElementById('add');
    out =  document.getElementById('out');
    hosp_name = document.getElementById('name');
    loc =  document.getElementById('location');
    covi =  document.getElementById('Covishield');
    cov =  document.getElementById('Covaxin');
    john =  document.getElementById('john');
    pfizer =  document.getElementById('pfizer');
    
let booked = 0;
let vaccine_booked = null;
let vacci = null;
btn.addEventListener('click',function(){
    console.log("clicked");
    var select = document.getElementById('vaccine');
    vacci = select.options[select.selectedIndex].value; 
    vaccine_booked = vacci;
    console.log(vacci);
    socket.emit("TOKEN_REQUEST");
    
});

//Listening for event
socket.on("result",function(data){
    if(booked === 1)
    {
        out.innerHTML = '<p><strong>Appointment Booked</strong></p>';
    }
    else
    {
        out.innerHTML = '';
    }
    
    socket.emit("update");

})
socket.on("GIVE_TOKEN",()=>{
    console.log("token recieved");
    if(booked === 0)
    {
        socket.emit("EXECUTE_CS_BOOK",{
            vacc: vacci,
            quantity: 1
        });
    }
    else
    {
        socket.emit("EXECUTE_CS_CANCEL",{
            vacc: vaccine_booked,
            quantity: 1
        });
    }
   
})
socket.on("done",()=>{
    
    socket.emit("RETURN_TOKEN");
    alert("Vaccine Booked Succesfully");
    booked = 1;
    btn.innerHTML = "Cancel Appointment"
})
socket.on("cancelled",()=>{
    
    socket.emit("RETURN_TOKEN");
    alert("Appointment Cancelled Succesfully");
    booked = 0;
    btn.innerHTML = "Book Appointment"
})
socket.on("wait",function(data){
    console.log("waiting");

})
socket.on("ERR",()=>{
    socket.emit("RETURN_TOKEN_ON_FAIL");
    alert("No Slots Available,Unable To book!")
})
socket.on("data",(data)=>{
    console.log(data);
    hosp_name.innerHTML ="Hospital Name: "+ data[0].name;
    loc.innerHTML = "Location :"+ data[0].location;
    cov.innerHTML = "Covaxin : " + data[0]["vaccine"]["covaxin"];
    covi.innerHTML = "Covishield : " + data[0]["vaccine"]["covishield"];
    john.innerHTML = "Johnson and Johnson : " + data[0]["vaccine"]["johnson and johnson"];
    pfizer.innerHTML = "Pfizer :" + data[0]["vaccine"]["pfizer"];
    
})
