# csgo-gsi-arduino-rgb
CS:GO Game State Integration + Node.js + Arduino + Individually Adressable RGB-LED Strip.

Script based on [Shaunidiot's CSGOGSI](https://github.com/shaunidiot/node-csgo-gsi) and [maciejb2k arduino-rgb](https://github.com/maciejb2k/csgo-gsi-arduino-rgb).

---
# Scripts setup
Install [node.js](https://nodejs.org/en/download/)

Put **gamestate_integration_node.cfg** in csgo `\cfg` folder.

Example: `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg`

Create a main folder for downloaded scripts, put **server.js** there, and in the same folder:

`npm install node-csgo-gsi --save`

`npm install johnny-five`

`npm install serialport`

After that, go to `\node_modules\node-csgo-gsi\` and replace `index.js` with downloaded **index.js**.

To run script, open CMD, type:

`cd C:\example\path\to\folder-with-scripts`

`node server.js`

# Arduino setup

`npm install node-pixel`

`npm install -g nodebots-interchange`

Plug in your arduino

`interchange install git+https://github.com/ajfisher/node-pixel -a nano --firmata`

In **server.js** file, configure data pins, stripLength.
You can also change colors of CS:GO events in **server.js** file, but remeber to use full HEX colors("#ffffff", not "#fff").

---
# Problems
1. If you'll close csgo, by typing ingame console "quit" or "exit", color of latest event will stay on led strip until restart, so you have to "disconnect" first, then program will set color from main menu, which you can define in "server.js" file.

---
# Credits
[shaunidiot/node-csgo-gsi](https://github.com/shaunidiot/node-csgo-gsi/blob/master/README.md)

[rwaldron/johnny-five](https://github.com/rwaldron/johnny-five)

https://chrisruppel.com/blog/arduino-johnny-five-neopixel/
