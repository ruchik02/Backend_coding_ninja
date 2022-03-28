const { urlencoded } = require("express");
const express = require("express");
const req = require("express/lib/request");
const path = require("path");
const port = 8000;

const db = require("./Config/mongoose");
const Contact = require("./Models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(express.static("assets"));

// //MiddleWare-1
// app.use(function (req, res, next) {
//   console.log("middleware 1 called");
//   next();
// });

// //MiddleWare-2
// app.use(function (req, res, next) {
//   console.log("middleware 2 called");
//   next();
// });

var contactList = [
  {
    name: "Pushkar",
    phone: "9999993330",
    email: "pushkar@email.com",
  },
  {
    name: "Iron Man",
    phone: "333333390",
    email: "ironman@email.com",
  },
  {
    name: "Hulk",
    phone: "0987123402",
    email: "hulk@email.com",
  },
];

app.get("/delete-contact/", function (req, res) {
  //get the id from query in the url
  let id = req.query.id;

  //find the contact in the database using id and delete
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("err in deleting an object from db");
      return;
    }

    return res.redirect("/display-contacts");
  });
});

app.get("/", function (req, res) {
  //   res.send("<h1>Hey there..I am the data here.</h1>");

  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Err in fetching contact from DB");
      return;
    }
    return res.render("home", {
      title: "Create Contact",
      contact_List: contacts,
    });
  });
});

app.get("/display-contacts", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Err in fetching contact from DB");
      return;
    }
    return res.render("displayContacts", {
      title: "Display Contact",
      contact_List: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "PlayGround",
  });
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!!");
        return;
      }

      console.log("*********", newContact);
      return res.redirect("back");
    }
  );
});

app.listen(port, function (err) {
  if (err) {
    console.log("An occur has occured!!");
  }

  console.log("Your Server is running on port", port);
});
