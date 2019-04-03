# csgo-gsi-arduino-rgb
Tutorial how to combine CS:GO Game State Integration + Node.js + Arduino + LED RGB Strip.

Script based on [Shaunidiot's CSGOGSI](https://github.com/shaunidiot/node-csgo-gsi)

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

---
# Arduino setup
In this project I used:

	- Arduino Board
	- 3x MOSFET Transistors irf610
	- 3x 10KΩ Resistors
	- +12V LED RGB Strip(2 meters)
	- +12VDC Power Supply
  
You can find plenty solutions how to connect led rgb strip to an arduino, connect parts like you prefer, i'll only show [photo](https://lh3.googleusercontent.com/wibiVkf2Rwxl3z8L8gnN3qBezsBPpEpFRTxQeA4-kbGhAWk2W3x1BciRGg_P-CpRRJli-XsdpAP_DEcc3GrWXm5VA2RU02j1qHmgIw29E27mEGMCDplM3j5e-0HhZc36hywpSSlTjISSWiwaKzQAmjrnvEzJw1Y4LO4NWu1MAnwrP4nr8khkaxgAVc7_zaN_TnrqXQk4s2jj4O7E3oOdtDgTyEL7zA1P6NNsXuS5c7pfGIU5X8FenzaG8NBr89PK5b_xatQ0jacKl8j-IIhvSt8nqKaiP3JgKpYDoRv0Ak3hjh8pVq434sSK-QlShABjZcLeOfCIP9dnHQ0Hc427pgi4IjFOnBJR5VREWt9s6cEVpzkq3yuMQLOKmeHltOYwo1scHdzXUPIgktD9lsqHkI_vGYlmy0_wee2zg92Ma5-fLb5JRDhS7FzJics_yCdkuWjsH7UrTYHqkZSsLGFYItAJeRejeK01w6u8T8Kgq6dpw-qiT6KcpZobkTHxGF2xmnM4f0pkoxLt1rH6T69-mAr4G66DwneJKHEkidJVaL6Sy7SIOO9Ay7V7SIAsdLf5TuWuFdsV=w1167-h950) how i've did this.

After connecting everything together, open Arduino Software(Arduino IDE), go to File > Examples > Firmata > StandardFirmata, upload this to arduino and close program.

In **server.js** file, configure R, G and B pins, which you connected to arduino from led strip.

---
# CS:GO Events Colors
You can change colors of CS:GO events in **server.js** file, but remeber to use full HEX colors("#ffffff", not "#fff").

- **On script start** - white color - #ffffff
- **On main menu** - white color - #ffffff
- **On warmup** - purple color - #ff00ff
- **On freeezetime** - white color - #ffffff
- **On round live** - green color - #00ff00
- **On CT Win** - blue color -  #0000ff
- **On TT Win** - yellow color - #ffff00
- **On bomb plant** - red color - #ff0000

---
# Problems
1. If you'll close csgo, by typing ingame console "quit" or "exit", color of latest event will stay on led strip until restart, so you have to "disconnect" first, then program will set color from main menu, which you can define in "server.js" file.

---
# Credits
[shaunidiot/node-csgo-gsi](https://github.com/shaunidiot/node-csgo-gsi/blob/master/README.md)

[rwaldron/johnny-five](https://github.com/rwaldron/johnny-five)

[EmergingTechnologyAdvisors/node-serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport)
