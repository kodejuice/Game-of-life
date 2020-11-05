/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import {random as R} from 'lodash';

export function random_color(): string {
    return `rgb(${R(0,255)}, ${R(0,255)}, ${R(0,255)})`;
}
