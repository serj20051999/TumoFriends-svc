db.students.insertMany([{
  "email": "mesrobk@gmail.com",
  "firstName": "Mesrob",
  "lastName": "Kyurkchyan",
  "password": "password",
  "learningTargets": [
    "Animation",
    "Game Development",
    "Filmmaking"
  ],
  "location": "Yerevan"
}, {
  "email": "mesrobk2@gmail.com",
  "firstName": "Martin",
  "lastName": "Kyurkchyan",
  "password": "password",
  "learningTargets": [
    "Game Development",
  ],
  "location": "Gyumri"
}
])

db.students.createIndex({ lastName: "text", firstName: "text", location: "text" })
db.students.createIndex({ learningTargets: 1})
