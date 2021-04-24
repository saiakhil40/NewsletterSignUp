const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/SignUp.html");
});
app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const emailad=req.body.email;



const data={
  members: [
    {
      email_address:emailad,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};

const jsonData=JSON.stringify(data);
const url="https://us1.api.mailchimp.com/3.0/lists/347b185525";
const options={
  method:"POST",
  auth:"Akhil:8758954307fca8a6333c4e2f4ba8c599-us1"
}
const request=https.request(url,options,function(resp){
  if(resp.statusCode===200)
  {
    res.sendFile(__dirname+"/succss.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
   resp.on("data",function(data){
     console.log(JSON.parse(data));
   });
});
request.write(jsonData);
request.end();



});


app.post("/failure",function(req,res){
  res.redirect("/");
})







app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
