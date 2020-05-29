# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create( username: "jsabath", password: "appleBottom")
event1 = Event.create( name: "Flatiron School", location: "Home", start_time: "2020-5-29 09:00", end_time: "2020-05-29 18:00", id: "1")