<template>
    <b-modal
        id="about"
        title="Game of Life"
        header-bg-variant="dark"
        header-text-variant="light"
        size="lg"
        ok-only
        scrollable
        hide-footer
        hide-backdrop
    >
        <div class="row">
            <div class="col"></div>
            <div class="col-6">
                <div class="row profile-info" title="Developer">
                    <a href="https://kodejuice.ml">
                        <div class="col link">
                            <img alt="dev" src="/icon/sb.png" /> Sochima Biereagu
                        </div>
                    </a>
                    <a href="https://github.com/kodejuice/game-of-life">
                        <div class="col link">
                            <img alit="fork" src="/icon/github.png" /> Fork on github
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div class="content">
            <p>Web simulation of the Game of Life</p>

            <p>
                The <b>Game of Life</b>, also known simply as Life, is a <a target="_blank" href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automaton</a> devised by the British mathematician <a href="https://en.wikipedia.org/wiki/John_Horton_Conway" target="_blank">John Horton Conway</a> in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
            </p>

            <h2>Rules</h2>
            <p>
                The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live <span class="cell live-cell"></span> or dead <span class="cell dead-cell"></span>. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

                <ol class="rules">
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </ol>

                Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.
            </p>

            <div class="game-tips">
                <p>
                    <div>Click on each cell(<span class="cell dead-cell"></span>) to bring it to life.</div>
                    <div><kbd>Ctrl + click</kbd> on a cell to kill the cell.</div>
                    <div>Hold down your mouse and move to activate multiple cells easily.</div>
                </p>
            </div>

            <h3>External Resources</h3>
            <iframe style="width: 100%;" height="454" src="https://www.youtube.com/embed/R9Plq-D1gEk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <h4>Links</h4>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life (Wikipedia)</a></li>
                <li><a href="https://www.conwaylife.com/wiki/">LifeWiki</a></li>
                <li><a href="https://cafaq.com/lifefaq/index.php">Cellular Automata FAQ</a></li>
                <li><a href="https://bitstorm.org/gameoflife/">John Conway's Game of Life (Java applet by Edwin Martin)</a></li>
                <li><a href="https://www.dcode.fr/game-of-life">The Game of Life simulator</a></li>
            </ul>
        </div>
    </b-modal>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {BModal} from 'bootstrap-vue';

@Component({
    components: {
        BModal,
    }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
.modal-body {
    padding-top: 0 !important;

    div.content {
        font-size: 0.75em;

        span.cell {
            width: 13px;
            height: 13px;
            display: inline-block;
            &.live-cell {
                background: #17A2B8;
            }
            &.dead-cell {
                background: #282c34;
            }
        }

        ol.rules {
            margin-top: 9px;
        }

        .game-tips {
            border-top: 1.3px solid #ddd;
            border-bottom: 1.3px solid #ddd;
            padding-top: 5px;

            kbd {
                padding: 2px;
            }

            div {
                margin-bottom: 3px;
            }
        }
    }

    div.row.profile-info {
        border-bottom: 1.5px solid #eee;

        div.col.link {
            font-size: 0.75em;
            max-width: 250px;
            text-align: right;

            img {
                width: 20px;
                height: 20px;
                vertical-align: text-top;
                border-radius: 100%;
            }
        }
    }
}
</style>
