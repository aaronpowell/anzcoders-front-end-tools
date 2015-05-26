'use strict';

const storageKey = 'todo:storage';
let callbacks = {};

class Storage {
    constructor () {
    }

    get(key) {
        let value = JSON.parse(localStorage.getItem(storageKey) || '{}');

        return value[key];
    }

    set(key, value) {
        let storage = JSON.parse(localStorage.getItem(storageKey) || '{}');
        storage[key] = value;

        localStorage.setItem(storageKey, JSON.stringify(storage));
        if (callbacks.add) {
            callbacks.add.forEach(fn => fn({ key, value }));
        }
    }

    remove(key) {
        let storage = JSON.parse(localStorage.getItem(storageKey) || '{}');
        delete storage[key];

        localStorage.setItem(storageKey, JSON.stringify(storage));
        if (callbacks.remove) {
            callbacks.remove.forEach(fn => fn({ key }));
        }
    }

    getAll() {
        let value = JSON.parse(localStorage.getItem(storageKey) || '{}');
        var keys = Object.keys(value);
        return keys.map(key => {
            return {
                key,
                value: value[key]
            };
        });
    }

    addEventListener(key, fn) {
        if (!Array.isArray(key)) {
            key = [key];
        }

        key.forEach(k => {
            if (!callbacks[k]) {
                callbacks[k] = [];
            }
            callbacks[k].push(fn);
        });
    }
}

export default new Storage();
