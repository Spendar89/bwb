angular.module('repairs.services')
  .factory('Repairs', [

    function() {
      var repairs = {};

      repairs.dataStore = {
        "mini tune-Up": {
          "name": "Mini Tune-Up",
          "description": "The little brother of the standard tuneup, a mini tuneup consists of a standard brake adjustment and gear adjustment.  Additionally, we wipedown the frame and inflate the tires to their optimal level.",
          "price": 45.95,
          "category": "1-tune-up services"
        },
        "tune-up": {
          "name": "Tune-Up",
          "description": "This is our most popular repair!  First, we adjust the brakes, gears, headset, crank, and bottom bracket.  Then, we laterally true the wheels, lubricate the cables and chain, and wipe down frame.  Finally, we inflate the tires to their optimal level before you pick  up your bike.",
          "price": 79.95,
          "category": "1-tune-up services"
        },
        "tune-up special": {
          "name": "Tune-Up Special",
          "description": "A tune-up special is our best service deal.  In addition to a standard tune-up, we also install two brand new tires!  For an additional fee, you can add slicks, specialty road tires, or higher end mountain-bike tires.",
          "price": 119.95,
          "options": {
            "With Slicks or Higher-End Mountain Tires": 139.95,
            "With Specialty Road Tires": 159.95
          },
          "category": "1-tune-up services"
        },
        "Modified Overhaul": {
          "name": "Modified Overhaul",
          "description": "For when your bike requires more than a tuneup.  We make all the adjustments included in a standard tuneup, true both wheels, degrease the drivetrain, remove the crank plates and chain and put in ultrasonic tank.  Additionally, we relubricate the chain and cables, clean the entire bicycle, including the freewheel, and rewrap handlebars.",
          "price": 149.95,
          "category": "2-special services"
        },
        "Complete Overhaul": {
          "name": "Complete Overhaul",
          "description": "A job only fit for Big Wheel, we tear down all of your bike's bearing surfaces, strip derailers, brakes, cranks, shiftlevers, chain etc. and place in ultrasonic tank.  Then, we reassemble the bicycle from scratch, wash it down, add some polish , and rewrap the handlebars",
          "price": 229.95,
          "category": "2-special services"
        },
        "Box Bike": {
          "name": "Box Bike",
          "description": "We dissamble your bike and box it for shipping.  We can also ship your bike for the cost of the shipping.",
          "price": 50.00,
          "category": "3-assembly and installations"
        },
        "Assemble Bike": {
          "name": "Assemble Bike",
          "description": "If you have a bike that requires assembly, we've got you covered at Big Wheel!  We assemble your dissambled bike and give it our standard tuneup.",
          "price": 99.95,
          "options": {
            "Normal Road Bike": 150.00,
            "High-End Road Bike": 250.00
          },
          "category": "3-assembly and installations"
        },
        "install Fork": {
          "name": "Install Fork",
          "description": "We install and calibrate your front fork (Does not include the fork).",
          "price": 50.00,
          "category": "3-assembly and installations"
        },
        "common services": {
          "description": "These are common services that we can often perform while you wait in the store.  Perfect for when you need a quick adjustment before going on a ride or want our service technicians to diagnose a problem with your bike.",
          "options": {
            "Flat Repair": 20.00,
            "Adjust Brakes": 20.00,
            "Adjust Gears": 20.00,
            "True Wheel": 20.00,
            "Tighten Pedals/crank": 20.00,
            "Tighten Headset": 20.00,
            "Clean Drive Train": 25.00,
            "Replace Bottom Bracket": 50.00,
            "Install Tire": 15.00,
            "Minimum Service Charge": 15.00,
          },
          "category": "4-common services"
        }
      };

      return repairs;
    }
  ]);