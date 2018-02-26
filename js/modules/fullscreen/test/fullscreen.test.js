import Fullscreen from '../js/fullscreen.js';  // our module

describe('Fullscreen button for images', () => {

    let fullscreen;

    test('should be and object', () => {
        let img = document.createElement('img');
        document.body.appendChild(img);
        fullscreen = new Fullscreen('img');
        expect(typeof fullscreen).toBe('object');
    });

    describe('#constructor()', () => {
        test('arg mandatory', () => {
            expect(() => {
                new Fullscreen();
            }).toThrowError(Error);
        });

        test('only accepts a string', () => {
            expect(() => {
                new Fullscreen(5);
            }).toThrowError(Error);
        });

        test('arg valid but don have', () => {
            let img = document.createElement('img');
            document.body.appendChild(img);
            expect(() => {
                new Fullscreen('div');
            }).toThrowError(Error);
        });

        test('arg valid', () => {
            let img = document.createElement('img');
            document.body.appendChild(img);
            expect(() => {
                new Fullscreen('img');
            }).not.toThrowError(Error);
        });

    });

    describe('#enter_fullscreen()', () => {

        beforeEach(() => {
            let div = document.createElement('div');
            document.body.appendChild(div);

            div = document.createElement('div');
            div.requestFullscreen = function(){}
            document.body.appendChild(div);

            div = document.createElement('div');
            div.webkitRequestFullscreen = function(){}
            document.body.appendChild(div);

            div = document.createElement('div');
            div.mozRequestFullScreen = function(){}
            document.body.appendChild(div);

            div = document.createElement('div');
            div.msRequestFullscreen = function(){}
            document.body.appendChild(div);

            fullscreen = new Fullscreen('div');
        });

        test('should have a enter_fullscreen Method', () =>{
            expect(typeof fullscreen.enter_fullscreen).toBe('function');
        });

        test('mandatory default object', () => {
            expect(() => {
                fullscreen.enter_fullscreen();
            }).toThrowError(Error);
        });

        test('args must be an number', () => {
            expect(() => {
                fullscreen.enter_fullscreen('asf');
            }).toThrowError(Error);
        });

        test('args valid and dont have fullscreen', () => {
            expect(() => {
                fullscreen.enter_fullscreen(0);
            }).toThrowError('Fullscreen API is not supported.');
        });

        test('args valid w3c', () => {
            expect(() => {
                fullscreen.enter_fullscreen(1);
            }).not.toThrowError(Error);
        });
        test('args valid webkit', () => {
            expect(() => {
                fullscreen.enter_fullscreen(2);
            }).not.toThrowError(Error);
        });

        test('args valid mozilla', () => {
            expect(() => {
                fullscreen.enter_fullscreen(3);
            }).not.toThrowError(Error);
        });

        test('args valid microsoft', () => {
            expect(() => {
                fullscreen.enter_fullscreen(4);
            }).not.toThrowError(Error);
        });
    });

    describe('#exit_fullscreen()', () => {
        test('should have a exit_fullscreen Method', () =>{
            expect(typeof fullscreen.exit_fullscreen).toBe('function');
        });

        test('fullscreen API not suported', () => {
            expect(() => {
                fullscreen.exit_fullscreen();
            }).toThrowError(Error);
        });

    });

    describe('Events', () => {
        let div;

        beforeAll(() => {
            div = document.createElement('div');
            div.requestFullscreen = function(){}
            div.setAttribute('id', 'mustClick');

            document.body.appendChild(div);
            document.exitFullscreen = function(){};
            div = document.getElementById('mustClick');

            fullscreen = new Fullscreen('div');
        });

        test('enter fullscreen', () => {
            div.click();
            expect(fullscreen.isFullscreen).toBe(true);
        });

        test('exit fullscreen', () => {
            div.click();
            expect(fullscreen.isFullscreen).toBe(false);
        });

    });

});
