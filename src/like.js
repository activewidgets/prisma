/**
 * Copyright (c) ActiveWidgets SARL. All Rights Reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function like(operator, pattern){

    let parts = pattern.split('%'),
        length = parts.length,
        start = parts[0],
        end = parts[length-1],
        middle = length == 3 ? parts[1] : '',
        filter = {};

    if (operator === 'ILIKE'){
        filter.mode = 'insensitive';
    }

    if (length == 1){
        filter.equals = pattern;
        return filter;
    }

    if (start) {
        filter.startsWith = start;
    }

    if (end) {
        filter.endsWith = end;
    }

    if (middle) {
        filter.contains = middle;
    }

    if (length > 3){
        throw Error('Unsupported LIKE pattern: ' + pattern);
    }

    return filter;
}
