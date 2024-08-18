const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: none
 */

//https://localhost:8081/users/id
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});
//https://localhost:8081/users/4
/**
 * Route: /users/:id
 * Method:GET
 *Description: Get single user by their id
 *Access: public
 *Parameters: Id
 */
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each)=>each.id == id);
  if(user){
    return res.status(404).json({
      success: false,
      message: "users Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
});
});


/**
 * route: /users
 * Method: POST
 * Description: creating a new user
 * Access: public
 * Parameters: None
 */
app.post("/users",(req,res)=>{
  const {id, name, surname, email, subscriptionType, subscription } = req.body

  const user = users.find((each) => each.id === id);

  if (!user){
    return res.status(404).json({
      success: false,
      message: "user with The ID Exists",
    });
  }

  users.push({
    id,
    Surname,
    email,
    SubscriptionType,
    SubscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "us",
    data: users,
  });
}
)


/**
 * Route: /users/:Id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: public
 * Parameters: ID 
 */
app.put("/users/:id", (req,res)=>{
  const {id} = req.params;
  const {data} = req.body;

})


app.get("*", (req, res) => {
  res.status(400).json({
    message: "This route doesn't exits",
  });
  const updateUserData = users.map((each)=>{
    if(each.id===id){
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
});
app.listen(PORT, () => {
  console.log("Server is running at port ${port}");
});
