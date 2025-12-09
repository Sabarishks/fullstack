const express = require("express");
const app = express();

app.use(express.json()); // Middleware to read JSON body

const employees = [
  { id: 1, name: "Naveen", role: "Developer", salary: 35000, address: "Chennai" },
  { id: 2, name: "Arun", role: "Tester", salary: 28000, address: "Coimbatore" },
  { id: 3, name: "Kavi", role: "Manager", salary: 55000, address: "Salem" },
  { id: 4, name: "Priya", role: "Designer", salary: 30000, address: "Madurai" },
  { id: 5, name: "Vishnu", role: "HR", salary: 25000, address: "Trichy" }
];

// GET API
app.get("/getUser", (req, res) => {
  res.json(employees);
});
app.get("/getUser/:id", (req, res) => {
    const id=parseInt(req.params.id);
    const user = employees.find(emp => emp.id === id);
    if(user){
        res.json(user);
        return;
    }
    else{
        res.status(404).json({message:"User not found"});
        return;
    }
});

app.delete("/deleteUser/:id", (req, res) => {
    const id=parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);
    if(index !== -1){
        const deletedUser = employees.splice(index, 1);
        res.json({message:"User deleted successfully", data: deletedUser[0]});
        return;}
});

// POST API (Add new employee)
app.post("/addUser", (req, res) => {
  const newEmployee = req.body;
  
  // Auto-generate new id
  newEmployee.id = employees.length + 1;

  employees.push(newEmployee);

  res.json({
    message: "Employee added successfully",
    data: newEmployee
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
