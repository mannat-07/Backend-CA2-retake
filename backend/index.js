const express= require('express');
const app= express();
app.use(express.json());

const port= 3000;

const users= [
    {email : "alice@gmail.com", password: "alice123"},
    {email : "bob@gmail.com", password: "bob123"},
    {email : "charlie@gmail.com", password: "charlie123"}
]

app.get('/', (req,res)=>{
    res.send(users);
})

app.put('/user/:email', (req,res)=>{
    const email= req.params.email;
    const updateData= req.body;

    const find= users.find(u => u.email === email);

    if(!find){
        return res.status(400).json({ message : "Email not found", success : false})
    }
    
    find.email= updateData.email || find.email;
    find.password= updateData.password || find.password;

    res.status(200).json({ message : "Data updated successfully..!", data: updateData, success : true})
})


app.delete('/user/:email', (req,res)=>{
    const email= req.params.email;

    const ind= users.findIndex(u => u.email === email);

    if(ind === -1){
        return res.status(400).json({ message : "Email not found", success : false})
    }
    
    users.splice(ind,1);

    res.status(200).json({ message : "User deleted successfully..!", success : true})
})


app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})