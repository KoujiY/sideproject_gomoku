let player = true;
let lineNumber = 15;
const boardArr = [];

drawBoard();

// 開始遊戲按鈕
$("#gameStart").on("click", function () {
    if ($("#gameStart").text() === "開始遊戲") {
        $("#gameStart").text("重新開始");
    } else {
        $(".chessBoard").empty();
        player = true;
        boardArr.length = 0;
        drawBoard();
    }
    clickBoard();
    $(".nowPlayer").text("輪到黑方");
});

// 繪製棋盤的function
function drawBoard() {
    for (let i = 0; i < lineNumber; i++) {
        boardArr.push([]);
        for (let j = 0; j < lineNumber; j++) {
            boardArr[i].push("noChess");
            if (j === 0) {
                if (i === 0) {
                    // 棋盤左上角
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine" style="margin-left: 21px; width: 23px"></div><div class="verLine" style="margin-top: 21px; height: 23px"></div></div>'
                    );
                } else if (i === lineNumber - 1) {
                    // 棋盤右上角
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine" style="margin-right: 21px; width: 23px"></div><div class="verLine" style="margin-top: 21px; height: 23px"></div></div>'
                    );
                } else {
                    // 棋盤上緣(角落以外)
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine"></div><div class="verLine" style="margin-top: 21px; height: 23px"></div></div>'
                    );
                }
            } else if (j === lineNumber - 1) {
                if (i === 0) {
                    // 棋盤左下角
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine" style="margin-left: 21px; width: 23px"></div><div class="verLine" style="margin-bottom: 21px; height: 23px"></div></div>'
                    );
                } else if (i === lineNumber - 1) {
                    // 棋盤右下角
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine" style="margin-right: 21px; width: 23px"></div><div class="verLine" style="margin-bottom: 21px; height: 23px"></div></div>'
                    );
                } else {
                    // 棋盤下緣(角落以外)
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine"></div><div class="verLine" style="margin-bottom: 21px; height: 23px"></div></div>'
                    );
                }
            } else {
                if (i === 0) {
                    // 棋盤左側(角落以外)
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine" style="margin-left: 21px; width: 23px"></div><div class="verLine"></div></div>'
                    );
                } else if (i === lineNumber - 1) {
                    // 棋盤右側(角落以外)
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine" style="margin-right: 21px; width: 23px"></div><div class="verLine"></div></div>'
                    );
                } else {
                    // 棋盤非邊緣格
                    $(".chessBoard").append(
                        '<div id="' +
                            `${i}-${j}` +
                            '" class="cube" style="' +
                            `top: ${j * 44}px; left: ${i * 44}px` +
                            '"><div class="horLine"></div><div class="verLine"></div></div>'
                    );
                }
            }
        }
    }
}

// 為網格掛載監聽器的function
function clickBoard() {
    for (let i = 0; i < lineNumber; i++) {
        for (let j = 0; j < lineNumber; j++) {
            $(`#${i}-${j}`).one("click", function (e) {
                // 繪製棋子
                const x = Number(this.id.split("-")[0]);
                const y = Number(this.id.split("-")[1]);
                if (player) {
                    $(this).append('<div class="chess" style="background: black"></div>');
                    $(".nowPlayer").text("輪到白方");
                } else {
                    $(this).append('<div class="chess"></div>');
                    $(".nowPlayer").text("輪到黑方");
                }
                boardArr[x][y] = player;
                player = !player;
                console.log(player);
                console.log(boardArr);

                // 判斷勝負
                judgeWay1(x, y);
                judgeWay2(x, y);
                judgeWay3(x, y);
                judgeWay4(x, y);
            });
        }
    }
}

// 水平方向
function judgeWay1(x, y) {
    let winCount = 1;
    // 向左檢查
    for (let k = x; k > 0; k--) {
        console.log("k=" + k);
        if (boardArr[k - 1][y] === boardArr[x][y]) {
            winCount += 1;
            if (winCount === 5) {
                gameSet()
                break;
            }
        } else {
            break;
        }
    }
    // 向右檢查
    if (winCount < 5) {
        for (let l = x; l < lineNumber; l++) {
            console.log("l=" + l);
            if (boardArr[l + 1][y] === boardArr[x][y]) {
                winCount += 1;
                if (winCount === 5) {
                    gameSet()
                    break;
                }
            } else {
                break;
            }
        }
    }
}

// 垂直方向
function judgeWay2(x, y) {
    let winCount = 1;
    // 向上檢查
    for (let k = y; k > 0; k--) {
        console.log("k=" + k);
        if (boardArr[x][k - 1] === boardArr[x][y]) {
            winCount += 1;
            if (winCount === 5) {
                gameSet()
                break;
            }
        } else {
            break;
        }
    }
    // 向下檢查
    if (winCount < 5) {
        for (let l = y; l < lineNumber; l++) {
            console.log("l=" + l);
            if (boardArr[x][l + 1] === boardArr[x][y]) {
                winCount += 1;
                if (winCount === 5) {
                    gameSet()
                    break;
                }
            } else {
                break;
            }
        }
    }
}

// 左上至右下
function judgeWay3(x, y) {
    let winCount = 1;
    // 向左上檢查
    for (let m = 1; m < lineNumber; m++) {
        console.log("m=" + m);
        if (x - m < 0 || y - m < 0) break;
        if (boardArr[x - m][y - m] === boardArr[x][y]) {
            winCount += 1;
            if (winCount === 5) {
                gameSet()
                break;
            }
        } else {
            break;
        }
    }
    // 向右下檢查
    if (winCount < 5) {
        for (let n = 1; n < lineNumber; n++) {
            console.log("n=" + n);
            if (x + n > lineNumber || y + n > lineNumber) break;
            if (boardArr[x + n][y + n] === boardArr[x][y]) {
                winCount += 1;
                if (winCount === 5) {
                    gameSet()
                    break;
                }
            } else {
                break;
            }
        }
    }
}

// 右上至左下
function judgeWay4(x, y) {
    let winCount = 1;
    // 向左上檢查
    for (let m = 1; m < lineNumber; m++) {
        console.log("m=" + m);
        if (x + m > lineNumber || y - m < 0) break;
        if (boardArr[x + m][y - m] === boardArr[x][y]) {
            winCount += 1;
            if (winCount === 5) {
                gameSet()
                break;
            }
        } else {
            break;
        }
    }
    // 向右下檢查
    if (winCount < 5) {
        for (let n = 1; n < lineNumber; n++) {
            console.log("n=" + n);
            if (x - n < 0 || y + n > lineNumber) break;
            if (boardArr[x - n][y + n] === boardArr[x][y]) {
                winCount += 1;
                if (winCount === 5) {
                    gameSet()
                    break;
                }
            } else {
                break;
            }
        }
    }
}

// 勝負判明後的操作
function gameSet() {
    // 移除所有的click事件
    for (let i = 0; i < lineNumber; i++) {
        for (let j = 0; j < lineNumber; j++) {
            $(`#${i}-${j}`).off("click");
        }
    }
    console.log("遊戲結束");
    player ? $(".nowPlayer").text("白方獲勝") : $(".nowPlayer").text("黑方獲勝");
}