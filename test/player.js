'use strict';

require('should');

let Player = require('..'),
    TestTable = require('./table'),
    bridge = require('bridge.js'),
    seat = bridge.seat;


describe('Bridge Player', () => {

    it('should be seated', () => {
        let player = new Player();
        player.should.have.property('seat', seat.south);

        player = new Player({seat: seat.north});
        player.should.have.property('seat', seat.north);
    });

    it('should be a team member', () => {
        let player = new Player();
        player.should.have.property('teamName', 'emanon');

        player = new Player({ teamName: 'Blue Team' });
        player.should.have.property('teamName', 'Blue Team');
    });

    it('should have a board', () => {
        let player = new Player();
        player.should.have.property('board');
    });

    it('should have a game', () => {
        let player = new Player();
        player.should.have.property('game');
    });

    it('should exchange messages with the table', done => {
        let table = new TestTable();
        new Player()
            .on('end', () => done())
            .on('error', done)
            .connect(table);
     });

    it('should emit "message" event', done => {
        let messageSeen = false,
            table = new TestTable();
        new Player()
            .on('end', () => {
                messageSeen.should.equal(true);
                done();
            })
            .on('error', done)
            .on('message', () => messageSeen = true)
            .connect(table);
     });

    it('should emit "sent" event', done => {
        let eventSeen = false,
            table = new TestTable();
        new Player()
            .on('end', () => {
                eventSeen.should.equal(true);
                done();
            })
            .on('error', done)
            .on('sent', () => eventSeen = true)
            .connect(table);
     });

   it('should emit "message-processed" event', done => {
        let messageSeen = false,
            table = new TestTable();
        let player = new Player()
            .on('end', () => {
                messageSeen.should.equal(true);
                done();
            })
            .on('error', done)
            .on('message-processed', () => {
                player.state.should.equal('done');
                messageSeen = true;
            })
            .connect(table);
     });


});
