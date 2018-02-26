import Gallery from '../js/gallery.js';  // our module

describe('Gallery middleware', () => {
    describe('#constructor()', () => {
        test('use no args', () => {
            expect(() => {
                new Gallery();
            }).toThrowError(Error);
        });

        test('only accepts a json as selector', () => {
            expect(() => {
                new Gallery(58);
            }).toThrowError(Error);
        });

        test('only accepts a json as settings', () => {
            expect(() => {
              new Gallery({action: '.test'}, 58);
            }).toThrowError(Error);
        });

        test('only accepts a json with valid keys', () => {
            expect(() => {
                new Gallery({action: '.test'}, {test:'fails'});
            }).toThrowError(Error);
        });

        test('Gallery with not settings', () => {
            expect(() => {
                let div = document.createElement('div');
                div.classList.add('test1');
                document.body.appendChild(div);
                new Gallery({gallery: '.test1'});
            }).not.toThrowError(Error);
        });

        test('Gallery standard', () => {
            expect(() => {
                let div = document.createElement('div');
                div.classList.add('test2');
                document.body.appendChild(div);
                new Gallery({gallery: '.test2'}, {showNextClass: 'class'});
            }).not.toThrowError(Error);
        });

        test('Gallery with action', () => {
            expect(() => {
                let div = document.createElement('div'),
                    action = document.createElement('div');
                div.classList.add('test3');
                action.classList.add('action');
                div.appendChild(action);
                document.body.appendChild(div);
                new Gallery({gallery: '.test3', action: '.action'}, {showNextClass: 'class'}, 2000);
                action.click();
            }).not.toThrowError(Error);
        });
    });
});
