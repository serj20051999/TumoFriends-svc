db.students.remove({});
db.students.insertMany([{
  "email": "serj.ohanyan@gmail.com",
  "firstName": "Serj",
  "lastName": "Ohanyan",
  "password": "password",
  "learningTargets": [
    "Animation",
    "Web Development",
    "Filmmaking"
  ],
  "location": "Yerevan"
}, {
  "email": "serj.ohanyan2@gmail.com",
  "firstName": "SerjON",
  "lastName": "OhanyanON",
  "password": "password",
  "learningTargets": [
    "Game Development",
  ],
  "location": "Gyumri"
}
])

db.students.createIndex({ lastName: "text", firstName: "text", location: "text" })
db.students.createIndex({ learningTargets: 1})
