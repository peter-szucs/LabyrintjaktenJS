// Flytta karaktären, vi tar in deltavärdet för förflyttning(x - || y - led) och spelarens riktning
function moveCharacter(deltaX, deltaY, direction) {
    if (deltaX == -1) { // -X led är ju åt vänster
        // Här är min lite meckiga lösning för väggkollisionen som jag kämpade i flera dagar med.
        // Det är långt från bästa lösningen är jag säker på men den funkade från nedskriven ide till implementering
        // vilket gjorde mig otroligt glad! Något buggig så man kan fastna ibland dock. :)
        // vi skickar indexet för X och Y värdet från "cellen" spelaren är i till funktionerna playerPathX & Y och får tillbaka
        // SANT eller FALSKT, och sedan flyttar spelaren om SANT
        if (playerPathX(allowedPath[playerCell][0], allowedPath[playerCell][1], deltaX, 0)) { // Om vi är innanför - flytta spelaren
            playerX += deltaX
        }
    } else if (deltaX == 1) { // höger
        if (playerPathX(allowedPath[playerCell][0], allowedPath[playerCell][1], deltaX, 0)) {
            playerX += deltaX
        }
    }
    if (deltaY == -1) { // upp
        if (playerPathY(allowedPath[playerCell][0], allowedPath[playerCell][1], 0, deltaY)) {
            playerY += deltaY
        }
    } else if (deltaY == 1) { // ner
        if (playerPathY(allowedPath[playerCell][0], allowedPath[playerCell][1], 0, deltaY)) {
            playerY += deltaY
        }
    }
    // playerX += deltaX;   // <-- wallhack, x led, för debuggning  :)
    // playerY += deltaY;  // <-- samma som ovan, y led
    currentDirection = direction;
}
// rita spelaren/monstren från tilesheet på canvas
function drawPlayer(frameX, frameY, canvasX, canvasY) {
    ctxPc.drawImage(playerChar, frameX * 32, frameY * 41, 32, 41, canvasX, canvasY, 32, 41)
}

function drawMonster1(frameX, frameY, canvasX, canvasY) {
    ctxPc.drawImage(monsterChar1, frameX * 32, frameY * 41, 32, 41, canvasX, canvasY, 32, 41)
}

function drawMonster3(frameX, frameY, canvasX, canvasY) {
    ctxPc.drawImage(monsterChar1, frameX * 32, frameY * 41, 32, 41, canvasX, canvasY, 32, 41)
}
// Pathing för hur monstren ska gå, och animationsfunktion. 
// Vi tar in bool för startvärde och slutvärde (addera även midvärde om vi har fler svängar)
function monster1Walk(monsterStart, monsterEnd) {
    // OM startvärde är sant sätt riktning, addera framecountern med 1 (animationen för gång är likadan som för spelaren)
    if (monsterStart) {
        monster1CurrentDirection = monsterFaceRight;
        monster1FrameCount++
        if (monster1FrameCount >= frameLimit) {
            monster1FrameCount = 0;
            monster1CurrentLoopIndex++;
            if (monster1CurrentLoopIndex >= animationLoop.length) {
                monster1CurrentLoopIndex = 0;
            }
        }
        monsterPosX += monsterMoveSpeed; // flytta monster
        // OM slutvärde är sant (monstret har nått sitt slut)
    } else if (monsterEnd) {
        monsterPosX -= monsterMoveSpeed; // flytta monster
        monster1CurrentDirection = monsterFaceLeft; // sätt riktning
        monster1FrameCount++ // börja animations-frameräknaren
        if (monster1FrameCount >= frameLimit) {
            monster1FrameCount = 0;
            monster1CurrentLoopIndex++;
            if (monster1CurrentLoopIndex >= animationLoop.length) {
                monster1CurrentLoopIndex = 0;
            }
        }
    }
}

function monster2Walk(monsterStart, monsterMid, monsterEnd) {

    if (monsterStart) {
        monster3CurrentDirection = monsterFaceRight;
        monster3FrameCount++
        if (monster3FrameCount >= frameLimit) {
            monster3FrameCount = 0;
            monster3CurrentLoopIndex++;
            if (monster3CurrentLoopIndex >= animationLoop.length) {
                monster3CurrentLoopIndex = 0;
            }
        }
        if (!monster2PathDirection) {
            monster2PathDirection = true;
        } else if (monster2PathDirection) {
            monster2PathDirection = false;
        }
        monster3PosX += monster3MoveSpeed;

    }
    if (monsterMid) {
        if (!monster2PathDirection) {
            monster2CurrentDirection = monsterFaceDown;
            monster2FrameCount++
        } else if (monster2PathDirection) {
            monster2CurrentDirection = monsterFaceLeft;
            monster2FrameCount++
        }
        if (monster2FrameCount >= frameLimit) {
            monster2FrameCount = 0;
            monster2CurrentLoopIndex++;
            if (monster2CurrentLoopIndex >= animationLoop.length) {
                monster2CurrentLoopIndex = 0;
            }
        }
        if (!monster2PathDirection) {
            monster2PosY += monster2MoveSpeed;
        } else if (monster2PathDirection) {
            monster2PosX -= monster2MoveSpeed;
        }
    }
    if (monsterEnd) {
        monster2PosY -= monster2MoveSpeed;
        monster2CurrentDirection = monsterFaceUp;
        monster2FrameCount++
        if (monster2FrameCount >= frameLimit) {
            monster2FrameCount = 0;
            monster2CurrentLoopIndex++;
            if (monster2CurrentLoopIndex >= animationLoop.length) {
                monster2CurrentLoopIndex = 0;
            }
        }
        if (!monster2PathDirection) {
            monster2PathDirection = true;
        } else if (monster2PathDirection) {
            monster2PathDirection = false;
        }
    }
}
// Samma som monster 1 ovan fast för monster 3
function monster3Walk(monsterStart, monsterEnd) {

    if (monsterStart) {
        monster3CurrentDirection = monsterFaceRight;
        monster3FrameCount++
        if (monster3FrameCount >= frameLimit) {
            monster3FrameCount = 0;
            monster3CurrentLoopIndex++;
            if (monster3CurrentLoopIndex >= animationLoop.length) {
                monster3CurrentLoopIndex = 0;
            }
        }
        monster3PosX += monster3MoveSpeed;

    } else if (monsterEnd) {
        monster3PosX -= monster3MoveSpeed;
        monster3CurrentDirection = monsterFaceLeft;
        monster3FrameCount++
        if (monster3FrameCount >= frameLimit) {
            monster3FrameCount = 0;
            monster3CurrentLoopIndex++;
            if (monster3CurrentLoopIndex >= animationLoop.length) {
                monster3CurrentLoopIndex = 0;
            }
        }
    }
}

// Rita Rök1
function drawSmoke(canvasX, canvasY) {
    ctxM.drawImage(smoke1, canvasX, canvasY)
}
// Rita Rök2
function drawSmoke2(canvasX, canvasY) {
    ctxM.drawImage(smoke2, canvasX, canvasY)
}
// Flytta rök1
function moveSmoke(deltaX) {
    smoke1X += deltaX;
    drawSmoke(smoke1X, 0);
    smokeFrame1++;
    smokeFrameTrigger++;
    if (smokeFrame1 == 3000) {
        smoke1X = 0;
        smokeFrame1 = 0;
    }
}
// Flytta rök2
function moveSmoke2(deltaX) {
    smoke2X += deltaX;
    drawSmoke2(smoke2X, 0);
    smokeFrame2++;
    if (smokeFrame2 == 3000) {
        smoke2X = 100;
        smokeFrame2 = 0;
    }
}