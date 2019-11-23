// Flytta karaktären, vi tar in deltavärdet för förflyttning(x - || y - led) och spelarens riktning
function moveCharacter(deltaX, deltaY, direction) {
    if (deltaX == -1) {  // -X - led = vänster
        // kolla kollision mot väggarna, OM INTE funktionen returnerar SANT -> flytta spelaren
        if (!wallCollision(deltaX, 0)) { 
            playerX += deltaX;
        }
    } else if (deltaX == 1) { // höger
        if (!wallCollision(deltaX, 0)) {
            playerX += deltaX;
        }
    }
    if (deltaY == -1) { // upp
        if (!wallCollision(0, deltaY)) {
            playerY += deltaY;
        }
    } else if (deltaY == 1) { // ner
        if (!wallCollision(0, deltaY)) {
            playerY += deltaY;
        }
    }
    // playerX += deltaX;   // <-- wallhack, x led, för debuggning  :)
    // playerY += deltaY;  // <-- samma som ovan, y led
    currentDirection = direction;
}

// rita spelaren/monstren från tilesheet på canvas
function drawCharacters(character, frameX, frameY, canvasX, canvasY) {
    ctxPc.drawImage(character, frameX * 32, frameY * 41, 32, 41, canvasX, canvasY, 32, 41)
}
// Blinkfunktionen för när spelaren gått in i monster
function playerHitBlink() {
    if (recentHitBlink >= 10 && recentHitBlink <= 20 || recentHitBlink >= 30 && recentHitBlink <= 40 || recentHitBlink >= 50 && recentHitBlink <= 60 || recentHitBlink == 70) {
        drawCharacters(playerChar, animationLoop[currentLoopIndex], currentDirection, playerX, playerY);
    }
    recentHitBlink++;
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
// pathing för monster 2 (gul tröja)
function monster2Walk(monsterStart, monsterMid, monsterEnd) {

    if (monsterStart) {
        monster2CurrentDirection = monsterFaceRight;
        monster2FrameCount++
        if (monster2FrameCount >= frameLimit) {
            monster2FrameCount = 0;
            monster2CurrentLoopIndex++;
            if (monster2CurrentLoopIndex >= animationLoop.length) {
                monster2CurrentLoopIndex = 0;
            }
        }
        if (monster2PathDirection) {
            // enda skillnaden mot de andra är den här variabeln som vi ställer om för att visa åt vilket håll vi går i pathen (framåt el bakåt)
            monster2PathDirection = false;
        }
        monster2PosX += monster2MoveSpeed;

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
            // och här byter vi håll
            monster2PathDirection = true;
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
// "Torch" - effekten
function playerTorch(playerX, playerY, difficulty) {
    if (difficulty == 0) {
        img = playerTorchEasy;
    }
    else if (difficulty == 1) {
        img = playerTorchMedium;
    }
    else if (difficulty == 2) {
        img = playerTorchHard;
    }
    var paintX = (playerX + 15) - 340;
    var paintY = (playerY + 21) - 579;
    ctxShadow.drawImage(img, paintX, paintY);
}