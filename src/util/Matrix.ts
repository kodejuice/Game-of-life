/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import {clone} from 'lodash';

/**
 * Matrix data structure.
 *
 * @class      Matrix
 * @extends    Matrix<true|false>
 * @author     (Biereagu Sochima <sochima.agu1@gmail.com>)
 */
class Matrix<T> {
    private grid: T[][];
    private default_value: T;

    constructor(width: number, height: number, value: T) {
        this.default_value = value;
        this.grid = Array.from(
            {length: height},
            row => Array.from({length: width}, v=>value)
        )
    }

    /**
     * get value at cell
     *
     * @param      {number}  i       row index
     * @param      {number}  j       column index
     * @return     {T}
     */
    get(i: number, j: number): T {
        if (!this.in_range(i, j)) return this.default_value;
        return this.grid[i][j];
    }

    /**
     * set cell value
     *
     * @param      {number}  i       row index
     * @param      {number}  j       column index
     * @param      {T}       value   The value
     */
    set(i:number, j: number, value: T) {
        if (!this.in_range(i, j)) return;
        this.grid[i][j] = value;
    }

    /**
     * Clears the matrix.
     */
    clear() {
        let $height = this.height(),
            $width = this.width(),
            $value = this.default_value;

        this.grid = Array.from(
            {length: $height},
            row => Array.from({length: $width}, v=>$value)
        );
    }

    /**
     * grid width
     *
     * @return     {number}
     */
    width(): number {
        return this.grid[0].length;
    }

    /**
     * grid height
     *
     * @return     {number}
     */
    height(): number {
        return this.grid.length;
    }

    /**
     * Increases the height by 1.
     */
    increase_height() {
        if (this.height() > 500) return;
        this.$set_height(this.height() + 1);
    }

    /**
     * determine if indexes are in grid range
     * @param  {number}  i row index
     * @param  {number}  j column index
     * @return {boolean}   in range?
     */
    private in_range(i: number, j: number): boolean {
        return (i>=0 && i<this.height()) && (j>=0 && j<this.width());
    }

    /**
     * update grid matrix with a modified clone
     * @param {T[][]} grid
     */
    protected $update_grid(grid?: T[][]) {
        if (grid) {
            this.grid = grid;
        } else {
            this.grid = clone(this.grid);
        }
    }

    /**
     * increase/decrease grid height
     * @param {number} new_height
     */
    protected $set_height(new_height: number) {
        const $height = this.height(),
              $width  = this.width();
        let to_add = new_height - $height;

        const grid: T[][] = clone(this.grid.map(r => clone(r)));

        if (to_add > 0) {
            while (to_add--) {
                grid.push(Array($width).fill(this.default_value)); // add new row
            }
        } else {
            while (to_add++) {
                grid.pop();  // remove last row
            }
        }

        this.$update_grid(grid);
    }

    /**
     * increase/decrease grid width
     * @param {number} new_width
     */
    protected $set_width(new_width: number) {
        const $width = this.width();

        const to_add = new_width - $width;
        const abs_toadd = Math.abs(to_add);

        if (to_add == 0) return;

        // add/remove equal number of cells to/from both left & right of each row
        // e.g,
        //  if a row = [0, X, 0]
        //
        //   set_width(5) should transform such row to:
        //     [0, 0, X, 0, 0]
        //
        //   set_width(1):
        //     [X]

        const left = abs_toadd >> 1,
              right = abs_toadd - left;

        const grid: T[][] = clone(this.grid.map(r => clone(r)));

        const {default_value} = this;
        grid.forEach(row => {
            // left side
            for (let i=0; i<left; ++i) {
                if (to_add > 0) row.unshift(default_value);
                else row.shift();
            }

            // right side
            for (let i=0; i<right; ++i) {
                if (to_add > 0) row.push(default_value);
                else row.pop();
            }
        });

        this.$update_grid(grid);
    }
}

export default Matrix;
