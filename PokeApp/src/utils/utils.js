export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles array in place. ES6 version
 * @param {array} a items An array containing the items.
 * @returns 
 */
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Returns the current date formatted
 * @param image: indicates if it is an image or no.
 * @returns {string}
 */
export function getFormattedDate(image = false) {
    const date = new Date();
    const month = fixDateFormat(date.getMonth());
    const day = fixDateFormat(date.getDate());
    const hour = fixDateFormat(date.getHours());
    const minute = fixDateFormat(date.getMinutes());
    const seconde = fixDateFormat(date.getSeconds());

    if (image) {
        return String(date.getFullYear()) + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + seconde + '.png'
    }
    return String(date.getFullYear()) + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + seconde;
}

/**
 * Fix the bug when saving the date
 * @param {*} date 
 * @returns 
 */
export function fixDateFormat(date) {
    if (date < 10) {
        return '0' + date;
    }else{
        return date.toString()
    }
}