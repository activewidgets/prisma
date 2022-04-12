/**
 * Copyright (c) ActiveWidgets SARL. All Rights Reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { params, convertFilter } from "@activewidgets/options";

let ops = {
    '=': 'equals',
    '>': 'gt',
    '<': 'lt',
    '>=': 'gte',
    '<=': 'lte'
};

let format = {
    compare: (path, op, value) => ({
        [path[0]]: path.length > 1 ? format.compare(path.slice(1), op, value) : {[ops[op]]: value}
    })
}


function convertSort(orderBy){
    if (orderBy){
        let [name, dir] = orderBy.split(' ');
        return {[name]: dir};
    }
}


function convertParams({limit, offset, where, orderBy}){
    return {
        take: limit,
        skip: offset,
        where: convertFilter(where, format),
        orderBy: convertSort(orderBy)
    };
}


export function prisma(){
    return [
        params(convertParams)
    ];
}
