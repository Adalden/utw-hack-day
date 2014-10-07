Our Hackathon Submission



##Lifx Server

Use Node 0.11.13. cd into lifx-server. npm install. npm start.

###Routes

####GET /bulbs
List all connected bulbs by label

####GET /bulbs/raw
List all connected bulbs

####POST /on
Turn all the lights on

####POST /off
Turn all the lights off

####POST /color
Set all the lights to a color (takes json {r,g,b} between 0 and 255)

####POST /bright
Set the brightness of the light (takes json {l} where l is a number)

###Events

####lifx:bulb
Let's you know if a new bulb was added

####lifx:power
Let's you know if a bulb was turned on or off

####lifx:color
Let's you know if a bulb changed color



##Leap Server

Use Node 0.11.13. cd into leap-server. npm install. npm start.

###Events

####leap:swype-lr
Let's you know when a Left/Right swype happened. Data is -1 or 1 (for left or right)

####leap:swipe-tb
Let's you know when a Top/Bottom swype happened. Data is -1 or 1 (for top or bottom)
