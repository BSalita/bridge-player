# Bridge Player

[![Travis build status](https://travis-ci.org/richardschneider/bridge-player.svg)](https://travis-ci.org/richardschneider/bridge-player)
[![Coverage Status](https://coveralls.io/repos/github/richardschneider/bridge-player/badge.svg?branch=master)](https://coveralls.io/github/richardschneider/bridge-player?branch=master)
 [![npm version](https://badge.fury.io/js/bridge-player.svg)](https://badge.fury.io/js/bridge-player) 
 
A **bridge-player** allows a human or robot to play electronic bridge using the [Blue Chip Bridge Table Manager Protocol](http://www.bluechipbridge.co.uk/protocol.htm). It processses/generates the protocol messages and only asks the player to make a bid or
play a card.

The [change log](https://github.com/richardschneider/bridge-player/releases) is automatically produced with
the help of [semantic-release](https://github.com/semantic-release/semantic-release).

## Getting started

**bridge-player** is available for [Node.js](https://nodejs.org) and most modern browsers.  If you want to know if your currrent browser is compatible, run the [online test suite](https://unpkg.com/bridge-player/test/index.html).

Install the latest version with [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

    > npm install bridge.js bridge-player --save

## Usage

Include the packages

    let Player = require('bridge-player'),
        seat = require('bridge.js').seat,
        net = require('net');

Create a player

    let me = new Player({
        seat: seat.south,
        teamName: 'Red Team'
    });
    
    // The human or robot MUST respond to these events
    me
        .on('make-bid', player => player.bid(...))
        .on('make-play', player => player.play(...))
        .on('make-dummy-play', player => player.playFromDummy(...));

Connect the player to the table.  The table is a Duplex stream, typically a TCP socket.

    table = net.connect(port, host);
    me.connect(table);
    
### Browser

Include the package from your project

    <script src="./node_modules/bridge-player/dist/bridge-player.min.js" type="text/javascript"></script>

or from the [unpkg CDN](https://unpkg.com)

    <script src="https://unpkg.com/bridge-player/dist/bridge-player.min.js"></script>

This will provide `BridgePlayer` as a global object, or `define` it if you are using [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition).

## Class Player

Allows a human or robot to play electronic bridge using the [Blue Chip Bridge Table Manager Protocol](http://www.bluechipbridge.co.uk/protocol.htm). The [table master stream](https://www.npmjs.com/package/table-master-stream) 
is used to processs/generate the protocol messages and only asks the player to make a bid or
play a card; `Player.bid()`, `Player.play()` and `Player.playFromDummy()`.


#### new Player([options])

`options` is an object with the following defaults:

````
{
    seat: seat.south,
    teamName: 'emanon'
}
````

#### Event 'end' 

Emitted when the table session is finished.

#### Event 'error'

Emitted when an error occurs. 

#### Event 'make-bid'

* Player 

Emitted when the player needs to make a bid.  `player.bid()` must eventually be called.

#### Event 'make-play'

* Player 

Emitted when the player needs to play a card.  `player.play()` must eventually be called.

#### Event 'make-dummy-play'

* Player 

Emitted when the player needs to play a card from dummy.  `player.playFromDummy()` must eventually be called.

#### Event 'message'

* Table Manager message without the trailing CRLF

Emitted when a Table Manager message is received.

#### Event 'message-processed'

* Table Manager message without the trailing CRLF

Emitted after a Table Manager message is processed.

#### Event 'sent'

* Table Manager message without the trailing CRLF 

Emitted after a message is sent to the table.

# License
The [MIT license](LICENSE).

Copyright © 2016 Richard Schneider [(makaretu@gmail.com)](mailto:makaretu@gmail.com?subject=bridge+player)