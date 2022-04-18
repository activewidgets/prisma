/**
 * Copyright (c) ActiveWidgets SARL. All Rights Reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {params, convertSort, convertFilter} from "@activewidgets/options";
import {like} from './like.js';

const operators = {

    /* equality */
    '=': 'equals',
    '<>': 'not',
    '!=': 'not',

    /* comparison */
    '<': 'lt',
    '>': 'gt',
    '<=': 'lte',
    '>=': 'gte',

    /* text */
    'LIKE': 'LIKE',
    'ILIKE': 'ILIKE',

    /* logical */
    'NOT': 'NOT',
    'AND': 'AND',
    'OR': 'OR'
};

const formatting = {
    equality: (name, operator, value) => ({[name]: {[operator]: value}}),
    comparison: (name, operator, value) => ({[name]: {[operator]: value}}),
    text: (name, operator, pattern) => ({[name]: like(operator, pattern)}),
    logical: (operator, expression) => ({[operator]: expression})
};

function relations(name, value){
    return {[name]: {is: value}};
}

function sortExpr(name, direction){
    return {[name]: direction};
}

function mergeAll(items){
    return items.length === 1 ? items[0] : items;
}

function nested(name, value){
    return {[name]: value};
}


function convertParams({where, orderBy, limit, offset}){
    return {
        where: convertFilter(where, operators, formatting, relations),
        orderBy: convertSort(orderBy, sortExpr, mergeAll, nested),
        take: limit,
        skip: offset
    };
}


export function prisma(){
    return [
        params(convertParams)
    ];
}
