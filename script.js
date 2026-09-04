// =========================================================
// FIND OUR BUTTONS
// =========================================================

const beginButton =
    document.getElementById("beginButton");

const continueButton =
    document.getElementById("continueButton");

const backButton =
    document.getElementById("backButton");

const gameBackButton =
    document.getElementById("gameBackButton");

const comicBackButton =
    document.getElementById("comicBackButton");

const comicPreviousButton =
    document.getElementById(
        "comicPreviousButton"
    );

const comicNextButton =
    document.getElementById(
        "comicNextButton"
    );

const comicPageImage =
    document.getElementById(
        "comicPageImage"
    );

const comicPagePlaceholder =
    document.getElementById(
        "comicPagePlaceholder"
    );

const comicPageNumber =
    document.getElementById(
        "comicPageNumber"
    );

const finalBackButton =
    document.getElementById(
        "finalBackButton"
    );

const finalScreen =
    document.getElementById(
        "finalScreen"
    );

// =========================================================
// FIND OUR SCREENS
// =========================================================

const landingScreen =
    document.getElementById("landingScreen");

const messageScreen =
    document.getElementById("messageScreen");

const gameScreen =
    document.getElementById("gameScreen");

const comicScreen =
    document.getElementById("comicScreen");


// =========================================================
// GAME CANVAS
// =========================================================

const gameCanvas =
    document.getElementById("gameCanvas");

const ctx =
    gameCanvas.getContext("2d");


// =========================================================
// SPRITE PALETTE
// =========================================================

const PALETTE = {

    transparent: null,

    outline: "#25203b",

    hair: "#cea6c5",

    hairHighlight: "#925089",

    skin: "#d9a58f",

    skinHighlight: "#edc0aa",

    clothes: "#285f83",

    clothesHighlight: "#21643d",

    eye: "#25203b",

    white: "#fff7fc"

};


// =========================================================
// PIXEL SPRITE RENDERER
// =========================================================

function drawPixelSprite(
    sprite,
    x,
    y,
    scale
) {

    const colourMap = {

        ".": PALETTE.transparent,

        "P": PALETTE.outline,

        "H": PALETTE.hair,

        "h": PALETTE.hairHighlight,

        "S": PALETTE.skin,

        "s": PALETTE.skinHighlight,

        "C": PALETTE.clothes,

        "c": PALETTE.clothesHighlight,

        "E": PALETTE.eye,

        "W": PALETTE.white

    };


    for (
        let row = 0;
        row < sprite.length;
        row++
    ) {

        for (
            let column = 0;
            column < sprite[row].length;
            column++
        ) {

            const pixel =
                sprite[row][column];


            if (
                pixel === "." ||
                !colourMap[pixel]
            ) {

                continue;

            }


            ctx.fillStyle =
                colourMap[pixel];


            ctx.fillRect(

                x +
                column * scale,

                y +
                row * scale,

                scale,

                scale

            );

        }

    }

}


// =========================================================
// PLAYER BODY SPRITE
// 16 × 24 PIXELS
// =========================================================

const PLAYER_BODY_SPRITE = [

    "................",
    "................",

    "......PP........",
    ".....PSSP.......",
    ".....PSSP.......",
    "....PSEESP......",
    "....PSSSSP......",
    ".....PSSP.......",

    "......PP........",

    ".....PCCP.......",
    "....PCCCCP......",
    "....SPCCPS......",
    ".....PCCP.......",
    ".....PCCP.......",
    "....PCCCCP......",

    ".....PPPP.......",
    "....PCCCCP......",

    ".....PP.PP......",

    ".....PS.SP......",
    ".....PS.SP......",

    "......P.P.......",
    "......P.P.......",
    "......P.P.......",
    ".....PP.PP......"

];


// =========================================================
// JUMPING BODY SPRITE
// Arms raised + legs apart
// =========================================================

const PLAYER_JUMP_SPRITE = [

    "................",
    "................",

    "......PP........",
    ".....PSSP.......",
    ".....PSSP.......",
    "....PSESP.......",
    "....PSSSSP......",
    ".....PSSP.......",

    "..S...PP...S....",

    "..S..PCCP..S....",
    "..S.PCCCCP.S....",
    "....SPCCPS......",
    ".....PCCP.......",
    ".....PCCP.......",
    "....PCCCCP......",

    ".....PPPP.......",
    "....PCCCCP......",

    ".....PP.PP......",

    "....PS...SP.....",
    "...PS.....SP....",

    "..P.........P...",
    ".P............P.",
    "P..............P"

];


// =========================================================
// HAIR BACK SPRITE
// =========================================================

const PLAYER_HAIR_BACK_SPRITE = [

    "................",
    "................",

    ".....HHHH.......",
    "....HHHHHH......",
    "...HHHHHHHH.....",
    "..HHHHHHHHHH....",
    "..HHHHHHHHHH....",
    ".HHHHHHHHHHHH...",

    ".HHH.......HHH..",
    ".HHH........HH..",
    "..HH.......HH...",
    ".HH........HH...",
    "..HH.......HH...",
    "..H........HH...",

    "..HH........HH..",
    "...HH.......HH..",
    "...HH......HH...",
    "..HH........HH..",
    "...HH......HH...",

    "................",
    "................",
    "................",
    "................",
    "................",
    "................"

];


// =========================================================
// HAIR FRONT SPRITE
// =========================================================

const PLAYER_HAIR_FRONT_SPRITE = [

    "................",
    "................",

    "......HHHH......",
    ".....HHHHHH.....",
    "....HHH..HHH....",
    "....HH....HH....",
    "...HH......HH...",
    "...HH......HH...",

    "..H..........H..",
    "..H..........H..",

    "................",
    "................",
    "................",
    "................",
    "................",
    "................",

    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"

];


// =========================================================
// MAKE CANVAS ARTWORK CRISP
// =========================================================

ctx.imageSmoothingEnabled = false;


// =========================================================
// LOAD IMAGE ASSETS
// =========================================================

const jellyfishImage =
    new Image();

const catImage =
    new Image();

const giftImage =
    new Image();


jellyfishImage.src =
    "assets/jellyfish.png";

catImage.src =
    "assets/cat.png";

giftImage.src =
    "assets/gift.png";


// =========================================================
// PLAYER
// =========================================================

const player = {

    x: 150,

    y: 0,

    width: 40,

    height: 60,

    spriteScale: 3,

    velocityX: 0,

    speed: 50,

    velocityY: 0,

    jumpStrength: 200,

    gravity: 100,

    onGround: false,

    idleTime: 0

};


// =========================================================
// WORLD
// =========================================================

const world = {

    width: 4000

};


// =========================================================
// CAMERA
// =========================================================

const camera = {

    x: 0

};


// =========================================================
// TREE CLUSTERS
// =========================================================

const treeClusters = [

    [-70, 0, 55],

    [-65, -10, 55, 90],

    [-50, 15, 65],

    [-70, -15, 45, 85],

    [-60, 10, 55],

    [-75, -20, 40, 75],

    [-60, 5, 50, 90],

    [-70, -10, 50, 80],

    [-55, 10, 65],

    [-75, -15, 45, 75],

    [-60, 5, 55, 90],

    [-70, -5, 50]

];


// =========================================================
// CREATE TREES FROM CLUSTERS
// =========================================================

function createTreeObjects() {

    const trees = [];


    const clusterPositions = [

        280,
        560,
        820,
        1080,

        1510,
        1780,
        2040,
        2260,

        2760,
        3000,
        3260,
        3740

    ];


    for (
        let i = 0;
        i < clusterPositions.length;
        i++
    ) {

        const clusterX =
            clusterPositions[i];

        const offsets =
            treeClusters[i];


        for (
            let j = 0;
            j < offsets.length;
            j++
        ) {

            const depth =
                j % 3 === 0
                    ? 0.75
                    : 1;


            trees.push({

                type: "tree",

                x:
                    clusterX +
                    offsets[j],

                depth:
                    depth,

                animationOffset:
                    (
                        i * 0.8 +
                        j * 0.6
                    )

            });

        }

    }


    return trees;

}


// =========================================================
// WORLD OBJECTS
// =========================================================

const worldObjects = [

    {
        type: "memory",

        x: 1300,

        message:
            "in our first life together, we were definitely maybe sometimes jellyfishies",

        collected: false,

        yOffset: 205,

        animationOffset: 0,

        sprite:
            "jellyfish"

    },


    {
        type: "memory",

        x: 2500,

        message:
            "then we became the cariños ..... ..... (sigh the n is a different font but i am not sacrificing language for style)",

        collected: false,

        yOffset: 205,

        animationOffset: 1.2,

        sprite:
            "cat"

    },


    {
        type: "gift",

        x: 3500,

        triggered: false,

        animationOffset: 2.1

    }

];


worldObjects.push(
    ...createTreeObjects()
);


// =========================================================
// DENSE STAR FIELD
// =========================================================
//
// Fewer decorative stars/details on small screens keeps
// the frame rate smooth without changing how the scene
// looks — there's simply less room to notice the difference.
// =========================================================

const isSmallScreen =
    window.innerWidth < 700;


const starCount =
    isSmallScreen
        ? 70
        : 140;


const stars = [];


for (
    let i = 0;
    i < starCount;
    i++
) {

    stars.push({

        x:
            Math.random() *
            world.width,

        y:
            25 +
            Math.random() *
            230,

        size:
            Math.random() < 0.8
                ? 2
                : 3,

        speed:
            0.6 +
            Math.random() * 1.0,

        phase:
            Math.random() *
            Math.PI * 2

    });

}


// =========================================================
// HORIZON DETAILS
// =========================================================

const horizonDetails = [

    {
        x: 180,
        width: 360,
        height: 55
    },

    {
        x: 720,
        width: 300,
        height: 40
    },

    {
        x: 1210,
        width: 430,
        height: 60
    },

    {
        x: 1760,
        width: 350,
        height: 48
    },

    {
        x: 2220,
        width: 450,
        height: 65
    },

    {
        x: 2800,
        width: 320,
        height: 45
    },

    {
        x: 3320,
        width: 430,
        height: 58
    },

    {
        x: 3820,
        width: 280,
        height: 42
    }

];


// =========================================================
// GROUND DETAILS
// =========================================================

const groundDetailCount =
    isSmallScreen
        ? 45
        : 90;


const groundDetails = [];


for (
    let i = 0;
    i < groundDetailCount;
    i++
) {

    groundDetails.push({

        x:
            30 +
            Math.random() *
            (world.width - 60),

        type:
            Math.random() < 0.65
                ? "grass"
                : "rock",

        size:
            2 +
            Math.random() * 4

    });

}


// =========================================================
// CELESTIAL OBJECTS
// =========================================================
//
// The moon and planets now share the same
// distant parallax layer.
//
// Moon = fixed world position
// Planets = different world positions
// All = parallax 0.65
// =========================================================

const celestialParallax =
    0.65;


const moon = {

    x: 430,

    y: 82,

    radius: 30

};


const planets = [

    {
        name: "Venus",

        x: 720,

        y: 168,

        radius: 15,

        color: "#d7a86e",

        darkColor: "#ad7d4f",

        lightColor: "#f0d2a0"

    },


    {
        name: "Mars",

        x: 1300,

        y: 82,

        radius: 13,

        color: "#b65f55",

        darkColor: "#7d3c39",

        lightColor: "#e18a72"

    },


    {
        name: "Jupiter",

        x: 2140,

        y: 145,

        radius: 24,

        color: "#c79b78",

        darkColor: "#9b7057",

        lightColor: "#e2c2a0"

    },


    {
        name: "Saturn",

        x: 3060,

        y: 105,

        radius: 22,

        color: "#d0b175",

        darkColor: "#a48754",

        lightColor: "#ead7a7"

    }

];


// =========================================================
// SHOOTING STARS
// =========================================================

const shootingStars = [];

let nextShootingStarTime = 4;


// =========================================================
// MEMORY MESSAGES
// =========================================================

const memoryMessages = [];


// =========================================================
// INPUT STATE
// =========================================================

const keys = {

    left: false,

    right: false,

    jump: false

};


// =========================================================
// VISUAL FRAME RATE
// =========================================================

const visualFrameRate = 30;

const visualFrameDuration =
    1000 /
    visualFrameRate;

let lastVisualFrameTime = 0;

let currentVisualTime = 0;


// =========================================================
// COMIC PAGE SYSTEM
// =========================================================

const comicPages = [

    "assets/comic/comic_page1.webp",

    "assets/comic/comic_page2.webp",

    "assets/comic/comic_page3.webp",

    "assets/comic/comic_page4.webp",

    "assets/comic/comic_page5.webp"

];


let currentComicPage = 0;

// =========================================================
// DISPLAY COMIC PAGE
// =========================================================

function displayComicPage(
    pageIndex
) {

    /*
    Keep the page index inside
    the valid range.
    */

    if (
        pageIndex < 0 ||
        pageIndex >= comicPages.length
    ) {

        return;

    }


    currentComicPage =
        pageIndex;


    const pageNumber =
        currentComicPage + 1;


    const pageSource =
        comicPages[
            currentComicPage
        ];


    /*
    Check whether the image actually exists.

    Pages 3 and 4 aren't available yet,
    so this lets us develop the viewer
    without breaking the site.
    */

    const testImage =
        new Image();


    testImage.onload =
        () => {

            comicPageImage.src =
                pageSource;


            comicPageImage.alt =
                `Comic page ${pageNumber}`;


            comicPageImage.hidden =
                false;


            comicPagePlaceholder.hidden =
                true;

        };


    testImage.onerror =
        () => {

            comicPageImage.hidden =
                true;


            comicPagePlaceholder.hidden =
                false;

        };


    testImage.src =
        pageSource;


    // -----------------------------------------------------
    // PAGE NUMBER
    // -----------------------------------------------------

    comicPageNumber.textContent =
        `Page ${pageNumber} of ${comicPages.length}`;


    // -----------------------------------------------------
    // PREVIOUS BUTTON
    // -----------------------------------------------------

    comicPreviousButton.disabled =
        currentComicPage === 0;


    // -----------------------------------------------------
    // NEXT BUTTON
    // -----------------------------------------------------

    if (
        currentComicPage ===
        comicPages.length - 1
    ) {

        comicNextButton.textContent =
            "continue →";

    }

    else {

        comicNextButton.textContent =
            "next →";

    }

}

// =========================================================
// BUTTON EVENTS
// =========================================================

beginButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            beginButton
        );

        moveToMessageScreen();

    }
);


continueButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            continueButton
        );

        moveToGameScreen();

    }
);


backButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            backButton
        );

        moveToLandingScreen();

    }
);


gameBackButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            gameBackButton
        );

        moveToMessageFromGame();

    }
);


comicBackButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            comicBackButton
        );

        moveToGameFromComic();

    }
);

finalBackButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            finalBackButton
        );

        moveToComicFromFinal();

    }
);

comicPreviousButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            comicPreviousButton
        );


        if (
            currentComicPage > 0
        ) {

            displayComicPage(
                currentComicPage - 1
            );

        }

    }
);

comicNextButton.addEventListener(
    "click",
    () => {

        createHeartFirework(
            comicNextButton
        );


        if (
            currentComicPage <
            comicPages.length - 1
        ) {

            displayComicPage(
                currentComicPage + 1
            );

            return;

        }


        /*
        We are on page 4.
        Move to the final birthday page.
        */

        moveToFinalScreen();

    }
);

// =========================================================
// FINAL SCREEN TRANSITIONS
// =========================================================

function moveToFinalScreen() {

    comicScreen.classList.add(
        "exit"
    );

    finalScreen.classList.add(
        "active"
    );

}


function moveToComicFromFinal() {

    finalScreen.classList.remove(
        "active"
    );

    comicScreen.classList.remove(
        "exit"
    );

}


// =========================================================
// KEYBOARD INPUT
// =========================================================

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            keys.left = true;

            event.preventDefault();

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            keys.right = true;

            event.preventDefault();

        }


        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w" ||
            event.code === "Space"
        ) {

            keys.jump = true;

            event.preventDefault();

        }

    }
);


window.addEventListener(
    "keyup",
    (event) => {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            keys.left = false;

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            keys.right = false;

        }


        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w" ||
            event.code === "Space"
        ) {

            keys.jump = false;

        }

    }
);


// =========================================================
// MOBILE CONTROLS
// =========================================================
//
// These controls simply change the same `keys` values
// used by the existing keyboard controls.
// =========================================================

function setupMobileControls() {

    const mobileLeft =
        document.getElementById("mobileLeft");

    const mobileRight =
        document.getElementById("mobileRight");

    const mobileJump =
        document.getElementById("mobileJump");


    /*
    If the buttons don't exist for some reason,
    the game continues normally.
    */
    if (
        !mobileLeft ||
        !mobileRight ||
        !mobileJump
    ) {

        return;

    }


    // =====================================================
    // LEFT
    // =====================================================

    function pressLeft(event) {

        event.preventDefault();

        keys.left = true;

        mobileLeft.classList.add(
            "pressed"
        );


        if (
            event.pointerId !== undefined
        ) {

            mobileLeft.setPointerCapture(
                event.pointerId
            );

        }

    }


    function releaseLeft(event) {

        event.preventDefault();

        keys.left = false;

        mobileLeft.classList.remove(
            "pressed"
        );

    }


    // =====================================================
    // RIGHT
    // =====================================================

    function pressRight(event) {

        event.preventDefault();

        keys.right = true;

        mobileRight.classList.add(
            "pressed"
        );


        if (
            event.pointerId !== undefined
        ) {

            mobileRight.setPointerCapture(
                event.pointerId
            );

        }

    }


    function releaseRight(event) {

        event.preventDefault();

        keys.right = false;

        mobileRight.classList.remove(
            "pressed"
        );

    }


    // =====================================================
    // JUMP
    // =====================================================

    function pressJump(event) {

        event.preventDefault();

        keys.jump = true;

        mobileJump.classList.add(
            "pressed"
        );


        /*
        Release the jump input shortly after the press.

        This prevents holding the button from creating
        repeated automatic jumps.
        */
        window.setTimeout(
            () => {

                keys.jump = false;

                mobileJump.classList.remove(
                    "pressed"
                );

            },
            120
        );

    }


    // =====================================================
    // POINTER EVENTS
    // =====================================================

    mobileLeft.addEventListener(
        "pointerdown",
        pressLeft
    );


    mobileLeft.addEventListener(
        "pointerup",
        releaseLeft
    );


    mobileLeft.addEventListener(
        "pointercancel",
        releaseLeft
    );


    mobileLeft.addEventListener(
        "lostpointercapture",
        releaseLeft
    );


    mobileRight.addEventListener(
        "pointerdown",
        pressRight
    );


    mobileRight.addEventListener(
        "pointerup",
        releaseRight
    );


    mobileRight.addEventListener(
        "pointercancel",
        releaseRight
    );


    mobileRight.addEventListener(
        "lostpointercapture",
        releaseRight
    );


    mobileJump.addEventListener(
        "pointerdown",
        pressJump
    );

}


// =========================================================
// START MOBILE CONTROLS
// =========================================================

setupMobileControls();


// =========================================================
// HEART FIREWORK
// =========================================================

function createHeartFirework(
    button
) {

    const buttonPosition =
        button.getBoundingClientRect();


    const startX =
        buttonPosition.left +
        buttonPosition.width /
        2;


    const startY =
        buttonPosition.top +
        buttonPosition.height /
        2;


    const numberOfHearts =
        20;


    for (
        let i = 0;
        i < numberOfHearts;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =
            "♥";


        heart.classList.add(
            "heart"
        );


        document.body.appendChild(
            heart
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            80 +
            Math.random() *
            140;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.style.setProperty(
            "--start-x",
            `${startX}px`
        );


        heart.style.setProperty(
            "--start-y",
            `${startY}px`
        );


        heart.style.setProperty(
            "--x",
            `${x}px`
        );


        heart.style.setProperty(
            "--y",
            `${y}px`
        );


        heart.addEventListener(
            "animationend",
            () => {

                heart.remove();

            }
        );

    }

}


// =========================================================
// SCREEN TRANSITIONS
// =========================================================

function moveToMessageScreen() {

    beginButton.disabled =
        true;


    setTimeout(
        () => {

            landingScreen.classList.add(
                "exit"
            );


            messageScreen.classList.add(
                "active"
            );

        },
        300
    );

}


function moveToLandingScreen() {

    landingScreen.classList.remove(
        "exit"
    );


    messageScreen.classList.remove(
        "active"
    );


    beginButton.disabled =
        false;

}


function moveToGameScreen() {

    continueButton.disabled =
        true;


    setTimeout(
        () => {

            messageScreen.classList.add(
                "exit"
            );


            gameScreen.classList.add(
                "active"
            );


            resizeGameCanvas();


            resetGame();

        },
        300
    );

}


function moveToMessageFromGame() {

    messageScreen.classList.remove(
        "exit"
    );


    gameScreen.classList.remove(
        "active"
    );


    continueButton.disabled =
        false;

}


function moveToComicScreen() {

    gameScreen.classList.add(
        "exit"
    );


    comicScreen.classList.add(
        "active"
    );


    /*
    Always start the comic from page 1.
    */

    displayComicPage(0);

}


function moveToGameFromComic() {

    comicScreen.classList.remove(
        "active"
    );


    gameScreen.classList.remove(
        "exit"
    );

}


// =========================================================
// CANVAS SIZE
// =========================================================

function resizeGameCanvas() {

    const availableWidth =
        window.innerWidth;

    const availableHeight =
        window.innerHeight;


    /*
    This world is drawn for a wide, landscape-style view
    (the sky decorations and ground are a fixed distance
    apart). Filling a tall portrait phone's full height
    would stretch a big empty gap between them, so we cap
    how tall the play area is allowed to get and letterbox
    (center) it — the same proportions you already see on
    desktop, just fitted to the screen instead of stretched.

    On desktop this has no effect, since a browser window's
    width * 1.3 is almost always taller than the window
    itself, so playHeight just becomes availableHeight as
    before.
    */

    const playHeight =
        Math.max(
            280,
            Math.min(
                availableHeight,
                availableWidth * 1.3
            )
        );


    gameCanvas.width =
        availableWidth;

    gameCanvas.height =
        playHeight;

    gameCanvas.style.height =
        `${playHeight}px`;


    placePlayerOnGround();

}

displayComicPage(0);

// =========================================================
// GROUND
// =========================================================

function getGroundHeight() {

    return 120;

}


function getGroundY() {

    return (
        gameCanvas.height -
        getGroundHeight()
    );

}


function placePlayerOnGround() {

    player.y =
        getGroundY() -
        player.height;


    player.velocityY =
        0;


    player.onGround =
        true;

}


// =========================================================
// RESET GAME
// =========================================================

function resetGame() {

    player.x =
        150;


    player.velocityX =
        0;


    player.velocityY =
        0;


    player.idleTime =
        0;


    camera.x =
        0;


    for (
        const object of
        worldObjects
    ) {

        if (
            object.type ===
            "memory"
        ) {

            object.collected =
                false;

        }


        if (
            object.type ===
            "gift"
        ) {

            object.triggered =
                false;

        }

    }


    memoryMessages.length =
        0;


    shootingStars.length =
        0;


    nextShootingStarTime =
        4;


    placePlayerOnGround();

}


// =========================================================
// UPDATE PLAYER
// =========================================================

function updatePlayer(
    deltaTime
) {

    if (
        keys.left &&
        !keys.right
    ) {

        player.velocityX =
            -player.speed;

    }


    else if (
        keys.right &&
        !keys.left
    ) {

        player.velocityX =
            player.speed;

    }


    else {

        player.velocityX *=
            0.8;


        if (
            Math.abs(
                player.velocityX
            ) < 1
        ) {

            player.velocityX =
                0;

        }

    }


    player.x +=
        player.velocityX *
        deltaTime;


    // -----------------------------------------------------
    // JUMP
    // -----------------------------------------------------

    if (
        keys.jump &&
        player.onGround
    ) {

        player.velocityY =
            -player.jumpStrength;


        player.onGround =
            false;

    }


    // -----------------------------------------------------
    // GRAVITY
    // -----------------------------------------------------

    player.velocityY +=
        player.gravity *
        deltaTime;


    player.y +=
        player.velocityY *
        deltaTime;


    // -----------------------------------------------------
    // GROUND COLLISION
    // -----------------------------------------------------

    if (
        player.y +
        player.height >=
        getGroundY()
    ) {

        player.y =
            getGroundY() -
            player.height;


        player.velocityY =
            0;


        player.onGround =
            true;

    }


    // -----------------------------------------------------
    // WORLD BOUNDARIES
    // -----------------------------------------------------

    if (
        player.x <
        0
    ) {

        player.x =
            0;

    }


    if (
        player.x +
        player.width >
        world.width
    ) {

        player.x =
            world.width -
            player.width;

    }


    player.idleTime +=
        deltaTime;

}


// =========================================================
// GET PLAYER SPRITE
// =========================================================

function getPlayerBodySprite() {

    if (
        !player.onGround
    ) {

        return PLAYER_JUMP_SPRITE;

    }


    return PLAYER_BODY_SPRITE;

}


// =========================================================
// MEMORY POSITION
// =========================================================

function getMemoryBounds(
    object
) {

    const width =
        60;


    const height =
        50;


    const x =
        object.x -
        width /
        2;


    const y =
        getGroundY() -
        object.yOffset;


    return {

        x,
        y,
        width,
        height

    };

}


// =========================================================
// COLLISION DETECTION
// =========================================================

function rectanglesOverlap(
    a,
    b
) {

    return (

        a.x <
        b.x +
        b.width &&

        a.x +
        a.width >
        b.x &&

        a.y <
        b.y +
        b.height &&

        a.y +
        a.height >
        b.y

    );

}


// =========================================================
// MEMORY COLLECTION
// =========================================================

function checkMemoryCollisions() {

    for (
        const object of
        worldObjects
    ) {

        if (
            object.type !==
            "memory"
        ) {

            continue;

        }


        if (
            object.collected
        ) {

            continue;

        }


        const memoryBounds =
            getMemoryBounds(
                object
            );


        if (
            rectanglesOverlap(
                player,
                memoryBounds
            )
        ) {

            collectMemory(
                object
            );

        }

    }

}


function collectMemory(
    object
) {

    object.collected =
        true;


    memoryMessages.push({

        x:
            object.x,

        y:
            getGroundY() -
            330,

        text:
            object.message

    });

}


// =========================================================
// GIFT COLLISION
// =========================================================

function checkGiftCollision() {

    const gift =
        worldObjects.find(
            object =>
                object.type ===
                "gift"
        );


    if (
        !gift ||
        gift.triggered
    ) {

        return;

    }


    const giftBounds = {

        x:
            gift.x -
            30,

        y:
            getGroundY() -
            60,

        width:
            60,

        height:
            60

    };


    if (
        rectanglesOverlap(
            player,
            giftBounds
        )
    ) {

        gift.triggered =
            true;


        setTimeout(
            () => {

                moveToComicScreen();

            },
            500
        );

    }

}


// =========================================================
// MEMORY MESSAGE TEXT WRAPPING
// =========================================================

function wrapText(
    text,
    maxWidth
) {

    const words =
        text.split(" ");


    const lines =
        [];


    let currentLine =
        "";


    for (
        const word of
        words
    ) {

        const testLine =
            currentLine === ""
                ? word
                : `${currentLine} ${word}`;


        const width =
            ctx.measureText(
                testLine
            ).width;


        if (
            width >
            maxWidth &&
            currentLine !== ""
        ) {

            lines.push(
                currentLine
            );


            currentLine =
                word;

        }


        else {

            currentLine =
                testLine;

        }

    }


    if (
        currentLine !== ""
    ) {

        lines.push(
            currentLine
        );

    }


    return lines;

}


function drawMemoryMessages() {

    for (
        const message of
        memoryMessages
    ) {

        const screenX =
            message.x -
            camera.x;


        if (
            screenX <
            -400 ||
            screenX >
            gameCanvas.width +
            400
        ) {

            continue;

        }


        ctx.save();


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.font =
            "38px Gaegu, sans-serif";


        const messageWidth =
            Math.min(
                600,
                gameCanvas.width *
                0.55
            );


        const x =
            screenX;


        const y =
            message.y;


        const lines =
            wrapText(
                message.text,
                messageWidth
            );


        const lineHeight =
            44;


        const totalHeight =
            lines.length *
            lineHeight;


        const boxX =
            x -
            messageWidth /
            2;


        const boxY =
            y -
            totalHeight /
            2 -
            20;


        ctx.fillStyle =
            "rgba(16, 22, 47, 0.65)";


        ctx.roundRect(
            boxX,
            boxY,
            messageWidth,
            totalHeight +
            40,
            18
        );


        ctx.fill();


        ctx.fillStyle =
            "#ffffff";


        lines.forEach(
            (
                line,
                index
            ) => {

                ctx.fillText(
                    line,
                    x,
                    y -
                    totalHeight /
                    2 +
                    index *
                    lineHeight
                );

            }
        );


        ctx.restore();

    }

}


// =========================================================
// SHOOTING STARS
// =========================================================

function createShootingStar() {

    shootingStars.push({

        x:
            camera.x +
            gameCanvas.width +
            100,

        y:
            40 +
            Math.random() *
            180,

        speed:
            600 +
            Math.random() *
            300,

        length:
            60 +
            Math.random() *
            40,

        life:
            0,

        maxLife:
            1.2

    });

}


function updateShootingStars(
    deltaTime
) {

    nextShootingStarTime -=
        deltaTime;


    if (
        nextShootingStarTime <=
        0
    ) {

        createShootingStar();


        nextShootingStarTime =
            6 +
            Math.random() *
            10;

    }


    for (
        let i =
            shootingStars.length -
            1;

        i >=
        0;

        i--
    ) {

        const star =
            shootingStars[i];


        star.x -=
            star.speed *
            deltaTime;


        star.y +=
            star.speed *
            0.35 *
            deltaTime;


        star.life +=
            deltaTime;


        if (
            star.life >=
            star.maxLife
        ) {

            shootingStars.splice(
                i,
                1
            );

        }

    }

}


function drawShootingStars() {

    ctx.save();


    ctx.strokeStyle =
        "#f6c4d8";


    ctx.lineWidth =
        3;


    ctx.lineCap =
        "round";


    for (
        const star of
        shootingStars
    ) {

        const screenX =
            star.x -
            camera.x;


        ctx.beginPath();


        ctx.moveTo(
            screenX,
            star.y
        );


        ctx.lineTo(
            screenX +
            star.length,

            star.y -
            star.length *
            0.35
        );


        ctx.stroke();

    }


    ctx.restore();

}


// =========================================================
// SKY GRADIENT
// =========================================================

function drawSky() {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            gameCanvas.height
        );


    gradient.addColorStop(
        0,
        "#090d24"
    );


    gradient.addColorStop(
        0.45,
        "#10162f"
    );


    gradient.addColorStop(
        0.78,
        "#182344"
    );


    gradient.addColorStop(
        1,
        "#202e4d"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        gameCanvas.width,
        gameCanvas.height
    );

}


// =========================================================
// 🌙 MOON
// =========================================================
//
// The moon now lives in the same distant
// parallax layer as the planets.
// =========================================================

function drawMoon() {

    const screenX =
        moon.x -
        camera.x *
        celestialParallax;


    const screenY =
        moon.y;


    const radius =
        moon.radius;


    /*
    Skip if far outside screen.
    */
    if (
        screenX <
        -100 ||
        screenX >
        gameCanvas.width +
        100
    ) {

        return;

    }


    ctx.save();


    // -----------------------------------------------------
    // Glow
    // -----------------------------------------------------

    const glow =
        ctx.createRadialGradient(
            screenX,
            screenY,
            5,
            screenX,
            screenY,
            70
        );


    glow.addColorStop(
        0,
        "rgba(255,247,220,0.18)"
    );


    glow.addColorStop(
        1,
        "rgba(255,247,220,0)"
    );


    ctx.fillStyle =
        glow;


    ctx.beginPath();


    ctx.arc(
        screenX,
        screenY,
        70,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // -----------------------------------------------------
    // Moon
    // -----------------------------------------------------

    ctx.fillStyle =
        "#f7edcf";


    ctx.beginPath();


    ctx.arc(
        screenX,
        screenY,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /*
    Crescent cut-out moves with moon,
    so the moon remains visually coherent.
    */
    ctx.fillStyle =
        "#10162f";


    ctx.beginPath();


    ctx.arc(
        screenX +
        11,

        screenY -
        8,

        radius,

        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.restore();

}


// =========================================================
// 🪐 PLANETS
// =========================================================

function drawPlanets() {

    for (
        const planet of
        planets
    ) {

        const screenX =
            planet.x -
            camera.x *
            celestialParallax;


        const screenY =
            planet.y;


        /*
        Skip planets that are far away.
        */
        if (
            screenX <
            -120 ||
            screenX >
            gameCanvas.width +
            120
        ) {

            continue;

        }


        ctx.save();


        // -------------------------------------------------
        // Atmospheric glow
        // -------------------------------------------------

        const glow =
            ctx.createRadialGradient(
                screenX,
                screenY,
                2,

                screenX,
                screenY,
                planet.radius *
                2.4
            );


        glow.addColorStop(
            0,
            "rgba(255,245,220,0.13)"
        );


        glow.addColorStop(
            1,
            "rgba(255,245,220,0)"
        );


        ctx.fillStyle =
            glow;


        ctx.beginPath();


        ctx.arc(
            screenX,
            screenY,
            planet.radius *
            2.4,

            0,
            Math.PI * 2
        );


        ctx.fill();


        // =================================================
        // SATURN
        // =================================================

        if (
            planet.name ===
            "Saturn"
        ) {

            /*
            BACK HALF OF RINGS

            Draw before the planet so the planet
            appears to sit inside the ring system.
            */
            ctx.strokeStyle =
                "#bfa874";


            ctx.lineWidth =
                5;


            ctx.beginPath();


            ctx.ellipse(
                screenX,
                screenY,
                planet.radius *
                1.95,

                planet.radius *
                0.55,

                -0.15,

                0,
                Math.PI * 2
            );


            ctx.stroke();


            ctx.strokeStyle =
                "#e4cc96";


            ctx.lineWidth =
                2;


            ctx.beginPath();


            ctx.ellipse(
                screenX,
                screenY,
                planet.radius *
                1.6,

                planet.radius *
                0.42,

                -0.15,

                0,
                Math.PI * 2
            );


            ctx.stroke();

        }


        // -------------------------------------------------
        // Planet base
        // -------------------------------------------------

        ctx.fillStyle =
            planet.color;


        ctx.beginPath();


        ctx.arc(
            screenX,
            screenY,
            planet.radius,
            0,
            Math.PI * 2
        );


        ctx.fill();


        // =================================================
        // VENUS DETAIL
        // =================================================

        if (
            planet.name ===
            "Venus"
        ) {

            ctx.save();


            ctx.beginPath();


            ctx.arc(
                screenX,
                screenY,
                planet.radius,
                0,
                Math.PI * 2
            );


            ctx.clip();


            ctx.fillStyle =
                planet.darkColor;


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY -

                3,

                planet.radius * 2,

                5
            );


            ctx.fillStyle =
                planet.lightColor;


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY +
                4,

                planet.radius * 2,

                3
            );


            ctx.fillStyle =
                "#b98759";


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY -
                8,

                planet.radius * 2,

                3
            );


            ctx.restore();

        }


        // =================================================
        // MARS DETAIL
        // =================================================

        if (
            planet.name ===
            "Mars"
        ) {

            ctx.save();


            ctx.beginPath();


            ctx.arc(
                screenX,
                screenY,
                planet.radius,
                0,
                Math.PI * 2
            );


            ctx.clip();


            /*
            Dark surface regions.
            */
            ctx.fillStyle =
                planet.darkColor;


            ctx.fillRect(
                screenX -
                9,

                screenY -
                3,

                7,

                5
            );


            ctx.fillRect(
                screenX +
                2,

                screenY +
                4,

                8,

                4
            );


            ctx.fillRect(
                screenX -
                3,

                screenY -
                10,

                5,

                4
            );


            /*
            Polar cap.
            */
            ctx.fillStyle =
                "#e7d2bd";


            ctx.fillRect(
                screenX -
                4,

                screenY -
                planet.radius +

                1,

                8,

                3
            );


            ctx.restore();

        }


        // =================================================
        // JUPITER DETAIL
        // =================================================

        if (
            planet.name ===
            "Jupiter"
        ) {

            ctx.save();


            ctx.beginPath();


            ctx.arc(
                screenX,
                screenY,
                planet.radius,
                0,
                Math.PI * 2
            );


            ctx.clip();


            /*
            Horizontal atmospheric bands.
            */
            ctx.fillStyle =
                planet.lightColor;


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY -
                11,

                planet.radius *
                2,

                4
            );


            ctx.fillStyle =
                planet.darkColor;


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY -
                5,

                planet.radius *
                2,

                3
            );


            ctx.fillStyle =
                "#b98567";


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY +
                3,

                planet.radius *
                2,

                4
            );


            ctx.fillStyle =
                "#e0b99a";


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY +
                10,

                planet.radius *
                2,

                4
            );


            /*
            Great Red Spot.
            */
            ctx.fillStyle =
                "#b96655";


            ctx.beginPath();


            ctx.ellipse(
                screenX +
                8,

                screenY +
                5,

                6,

                4,

                0,

                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();

        }


        // =================================================
        // SATURN DETAIL
        // =================================================

        if (
            planet.name ===
            "Saturn"
        ) {

            ctx.save();


            /*
            Subtle bands.
            */
            ctx.beginPath();


            ctx.arc(
                screenX,
                screenY,
                planet.radius,
                0,
                Math.PI * 2
            );


            ctx.clip();


            ctx.fillStyle =
                "#b8945f";


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY -
                5,

                planet.radius *
                2,

                4
            );


            ctx.fillStyle =
                "#e4c992";


            ctx.fillRect(
                screenX -
                planet.radius,

                screenY +
                4,

                planet.radius *
                2,

                3
            );


            ctx.restore();


            /*
            FRONT HALF OF RINGS

            This is drawn after the planet,
            making the rings visibly wrap around it.
            */
            ctx.strokeStyle =
                "#d8c18e";


            ctx.lineWidth =
                5;


            ctx.beginPath();


            ctx.ellipse(
                screenX,
                screenY,
                planet.radius *
                1.95,

                planet.radius *
                0.55,

                -0.15,

                0,
                Math.PI * 2
            );


            ctx.stroke();


            /*
            Mask the centre so only the
            ring edges remain visually.
            */
            ctx.fillStyle =
                planet.color;


            ctx.beginPath();


            ctx.arc(
                screenX,
                screenY,
                planet.radius -
                1,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }


        // -------------------------------------------------
        // General planet highlight
        // -------------------------------------------------

        ctx.fillStyle =
            planet.lightColor;


        ctx.globalAlpha =
            0.65;


        ctx.beginPath();


        ctx.arc(
            screenX -
            planet.radius *
            0.32,

            screenY -
            planet.radius *
            0.32,

            Math.max(
                2,
                planet.radius *
                0.18
            ),

            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.globalAlpha =
            1;


        ctx.restore();

    }

}


// =========================================================
// DISTANT HORIZON
// =========================================================

function drawHorizon() {

    const horizonY =
        getGroundY() -
        55;


    ctx.save();


    ctx.fillStyle =
        "rgba(21, 34, 57, 0.9)";


    for (
        const hill of
        horizonDetails
    ) {

        const x =
            hill.x -
            camera.x *
            0.45;


        ctx.beginPath();


        ctx.moveTo(
            x,
            horizonY
        );


        ctx.quadraticCurveTo(
            x +
            hill.width *
            0.5,

            horizonY -
            hill.height,

            x +
            hill.width,

            horizonY
        );


        ctx.closePath();


        ctx.fill();

    }


    ctx.restore();

}


// =========================================================
// GROUND BASE
// =========================================================

function drawGround() {

    const groundHeight =
        getGroundHeight();


    const groundY =
        gameCanvas.height -
        groundHeight;


    // Main ground
    ctx.fillStyle =
        "#263b3b";


    ctx.fillRect(
        -camera.x,
        groundY,
        world.width,
        groundHeight
    );


    // Darker lower layer
    ctx.fillStyle =
        "#1e3030";


    ctx.fillRect(
        -camera.x,
        groundY + 45,
        world.width,
        groundHeight -
        45
    );


    // Grass edge
    ctx.fillStyle =
        "#3f6655";


    ctx.fillRect(
        -camera.x,
        groundY - 5,
        world.width,
        5
    );


    // Small darker texture
    ctx.fillStyle =
        "#203333";


    for (
        let x = 0;
        x < world.width;
        x += 80
    ) {

        const offset =
            Math.sin(
                x *
                0.05
            ) *
            4;


        ctx.fillRect(
            x -
            camera.x,

            groundY +
            20 +
            offset,

            14,

            3
        );

    }

}


// =========================================================
// GROUND DETAILS
// =========================================================

function drawGroundDetails() {

    const groundY =
        getGroundY();


    for (
        const detail of
        groundDetails
    ) {

        const screenX =
            detail.x -
            camera.x;


        if (
            screenX <
            -20 ||
            screenX >
            gameCanvas.width +
            20
        ) {

            continue;

        }


        if (
            detail.type ===
            "grass"
        ) {

            ctx.fillStyle =
                "#4f7a62";


            const size =
                detail.size;


            ctx.fillRect(
                screenX,
                groundY -
                size,

                2,
                size *
                2
            );


            ctx.fillRect(
                screenX - 3,
                groundY -
                size,

                3,
                2
            );


            ctx.fillRect(
                screenX + 2,
                groundY -
                size -
                2,

                3,
                2
            );

        }


        else {

            ctx.fillStyle =
                "#43514d";


            const size =
                detail.size;


            ctx.fillRect(
                screenX,
                groundY -
                size,

                size * 2,
                size
            );

        }

    }

}


// =========================================================
// DENSE STARS
// =========================================================

function drawStars(
    currentTime
) {

    for (
        const star of
        stars
    ) {

        const screenX =
            star.x -
            camera.x;


        if (
            screenX <
            -20 ||
            screenX >
            gameCanvas.width +
            20
        ) {

            continue;

        }


        const pulse =
            (
                Math.sin(
                    currentTime *
                    star.speed +
                    star.phase
                ) + 1
            ) / 2;


        const opacity =
            0.35 +
            pulse *
            0.65;


        ctx.fillStyle =
            `rgba(
                246,
                196,
                216,
                ${opacity}
            )`;


        ctx.fillRect(
            screenX,
            star.y,
            star.size,
            star.size
        );

    }

}


// =========================================================
// TREE DRAWING WITH DEPTH
// Existing rectangular trees
// =========================================================

function drawTree(
    object,
    screenX,
    currentTime
) {

    const scale =
        object.depth;


    const sway =
        Math.sin(
            currentTime * 2 +
            object.animationOffset
        ) *
        3;


    // -----------------------------
    // TRUNK
    // -----------------------------

    ctx.fillStyle =
        object.depth < 1
            ? "#4b342b"
            : "#5c4033";


    ctx.fillRect(
        screenX -
        10 *
        scale,

        getGroundY() -
        80 *
        scale,

        20 *
        scale,

        80 *
        scale
    );


    // Dark bark lines
    ctx.fillStyle =
        "#3f2c25";


    ctx.fillRect(
        screenX -
        5 *
        scale,

        getGroundY() -
        70 *
        scale,

        2 *
        scale,

        45 *
        scale
    );


    ctx.fillRect(
        screenX +
        4 *
        scale,

        getGroundY() -
        55 *
        scale,

        2 *
        scale,

        32 *
        scale
    );


    // Lighter bark line
    ctx.fillStyle =
        "#795441";


    ctx.fillRect(
        screenX -
        1 *
        scale,

        getGroundY() -
        65 *
        scale,

        2 *
        scale,

        30 *
        scale
    );


    // -----------------------------
    // LEAVES
    // -----------------------------

    ctx.save();


    ctx.translate(
        screenX +
        sway,

        getGroundY() -
        95 *
        scale
    );


    // Main canopy
    ctx.fillStyle =
        object.depth < 1
            ? "#315847"
            : "#3c705d";


    ctx.fillRect(
        -38 *
        scale,

        -30 *
        scale,

        76 *
        scale,

        55 *
        scale
    );


    // Darker patches
    ctx.fillStyle =
        "#294b3c";


    ctx.fillRect(
        -32 *
        scale,

        -17 *
        scale,

        17 *
        scale,

        13 *
        scale
    );


    ctx.fillRect(
        10 *
        scale,

        -6 *
        scale,

        18 *
        scale,

        12 *
        scale
    );


    ctx.fillRect(
        -8 *
        scale,

        8 *
        scale,

        16 *
        scale,

        10 *
        scale
    );


    // Lighter patches
    ctx.fillStyle =
        "#56816b";


    ctx.fillRect(
        -21 *
        scale,

        -26 *
        scale,

        15 *
        scale,

        9 *
        scale
    );


    ctx.fillRect(
        7 *
        scale,

        -24 *
        scale,

        17 *
        scale,

        8 *
        scale
    );


    ctx.fillRect(
        -29 *
        scale,

        3 *
        scale,

        12 *
        scale,

        8 *
        scale
    );


    ctx.fillRect(
        7 *
        scale,

        10 *
        scale,

        13 *
        scale,

        7 *
        scale
    );


    // Upper canopy
    ctx.fillStyle =
        object.depth < 1
            ? "#315847"
            : "#3c705d";


    ctx.fillRect(
        -28 *
        scale,

        -48 *
        scale,

        56 *
        scale,

        20 *
        scale
    );


    ctx.restore();

}


// =========================================================
// JELLYFISH IMAGE
// =========================================================

function drawJellyfish(
    screenX,
    bounds,
    floatOffset
) {

    const size =
        72;


    const x =
        screenX -
        size /
        2;


    const y =
        bounds.y +
        bounds.height -
        size +
        floatOffset;


    if (
        jellyfishImage.complete &&
        jellyfishImage.naturalWidth > 0
    ) {

        ctx.drawImage(
            jellyfishImage,
            x,
            y,
            size,
            size
        );

    }

}


// =========================================================
// CAT IMAGE
// =========================================================

function drawCat(
    screenX,
    bounds,
    floatOffset
) {

    const size =
        72;


    const x =
        screenX -
        size /
        2;


    const y =
        bounds.y +
        bounds.height -
        size +
        floatOffset;


    if (
        catImage.complete &&
        catImage.naturalWidth > 0
    ) {

        ctx.drawImage(
            catImage,
            x,
            y,
            size,
            size
        );

    }

}


// =========================================================
// GIFT IMAGE
// =========================================================

function drawGift(
    object,
    screenX,
    currentTime
) {

    const size =
        72;


    const baseY =
        getGroundY() -
        size;


    const x =
        screenX -
        size /
        2;


    if (
        giftImage.complete &&
        giftImage.naturalWidth > 0
    ) {

        ctx.drawImage(
            giftImage,
            x,
            baseY,
            size,
            size
        );

    }


    // -----------------------------------------------------
    // Pulsing rays
    // -----------------------------------------------------

    const pulse =
        (
            Math.sin(
                currentTime * 3 +
                object.animationOffset
            ) + 1
        ) / 2;


    const rayLength =
        12 +
        pulse * 10;


    const opacity =
        0.25 +
        pulse * 0.75;


    ctx.save();


    ctx.strokeStyle =
        `rgba(
            255,
            247,
            252,
            ${opacity}
        )`;


    ctx.lineWidth =
        3;


    ctx.lineCap =
        "square";


    // Top-left
    ctx.beginPath();


    ctx.moveTo(
        screenX - 20,
        baseY - 5
    );


    ctx.lineTo(
        screenX -
        20 -
        rayLength,

        baseY -
        5 -
        rayLength
    );


    ctx.stroke();


    // Top-right
    ctx.beginPath();


    ctx.moveTo(
        screenX + 20,
        baseY - 5
    );


    ctx.lineTo(
        screenX +
        20 +
        rayLength,

        baseY -
        5 -
        rayLength
    );


    ctx.stroke();


    // Left
    ctx.beginPath();


    ctx.moveTo(
        screenX - 35,
        baseY + 20
    );


    ctx.lineTo(
        screenX -
        35 -
        rayLength,

        baseY +
        20 -
        rayLength
    );


    ctx.stroke();


    // Right
    ctx.beginPath();


    ctx.moveTo(
        screenX + 35,
        baseY + 20
    );


    ctx.lineTo(
        screenX +
        35 +
        rayLength,

        baseY +
        20 -
        rayLength
    );


    ctx.stroke();


    ctx.restore();

}


// =========================================================
// GIFT ARROW
// =========================================================

function drawGiftArrow(
    currentTime
) {

    const gift =
        worldObjects.find(
            object =>
                object.type ===
                "gift"
        );


    if (
        !gift ||
        gift.triggered
    ) {

        return;

    }


    const distance =
        gift.x -
        player.x;


    if (
        distance >
        350 ||
        distance <
        -80
    ) {

        return;

    }


    const screenX =
        gift.x -
        camera.x;


    const bob =
        Math.sin(
            currentTime * 3
        ) *
        7;


    const arrowTop =
        getGroundY() -
        230 +
        bob;


    ctx.save();


    // Dark outline
    ctx.strokeStyle =
        "#25203b";


    ctx.lineWidth =
        10;


    ctx.lineCap =
        "square";


    ctx.lineJoin =
        "miter";


    ctx.beginPath();


    ctx.moveTo(
        screenX,
        arrowTop
    );


    ctx.lineTo(
        screenX,
        arrowTop + 65
    );


    ctx.moveTo(
        screenX - 22,
        arrowTop + 43
    );


    ctx.lineTo(
        screenX,
        arrowTop + 70
    );


    ctx.lineTo(
        screenX + 22,
        arrowTop + 43
    );


    ctx.stroke();


    // Pink inner arrow
    ctx.strokeStyle =
        "#f6c4d8";


    ctx.lineWidth =
        5;


    ctx.beginPath();


    ctx.moveTo(
        screenX,
        arrowTop
    );


    ctx.lineTo(
        screenX,
        arrowTop + 65
    );


    ctx.moveTo(
        screenX - 22,
        arrowTop + 43
    );


    ctx.lineTo(
        screenX,
        arrowTop + 70
    );


    ctx.lineTo(
        screenX + 22,
        arrowTop + 43
    );


    ctx.stroke();


    ctx.restore();

}


// =========================================================
// ANIMATED MEMORY POSITION
// =========================================================

function getAnimatedVerticalOffset(
    object,
    currentTime
) {

    return (
        Math.sin(
            currentTime *
            2 +
            object.animationOffset
        ) *
        6
    );

}


// =========================================================
// CAMERA
// =========================================================

function updateCamera() {

    const targetX =
        player.x -
        gameCanvas.width *
        0.4;


    camera.x +=
        (
            targetX -
            camera.x
        ) *
        0.1;


    if (
        camera.x <
        0
    ) {

        camera.x =
            0;

    }


    const maximumCameraX =
        world.width -
        gameCanvas.width;


    if (
        camera.x >
        maximumCameraX
    ) {

        camera.x =
            maximumCameraX;

    }

}


// =========================================================
// DRAW GAME
// =========================================================

function drawGame(
    currentTime
) {

    ctx.clearRect(
        0,
        0,
        gameCanvas.width,
        gameCanvas.height
    );


    // =====================================================
    // SKY
    // =====================================================

    drawSky();


    // =====================================================
    // STARS
    // =====================================================

    drawStars(
        currentTime
    );


    // =====================================================
    // MOON
    // =====================================================

    drawMoon();


    // =====================================================
    // PLANETS
    // =====================================================

    drawPlanets();


    // =====================================================
    // DISTANT HORIZON
    // =====================================================

    drawHorizon();


    // =====================================================
    // SHOOTING STARS
    // =====================================================

    drawShootingStars();


    // =====================================================
    // GROUND
    // =====================================================

    drawGround();


    // =====================================================
    // GROUND DETAILS
    // =====================================================

    drawGroundDetails();


    // =====================================================
    // WORLD OBJECTS
    // =====================================================

    const sortedObjects =
        [...worldObjects].sort(
            (
                a,
                b
            ) => {

                const depthA =
                    a.depth ||
                    1;


                const depthB =
                    b.depth ||
                    1;


                return (
                    depthA -
                    depthB
                );

            }
        );


    for (
        const object of
        sortedObjects
    ) {

        const screenX =
            object.x -
            camera.x;


        if (
            screenX <
            -150 ||
            screenX >
            gameCanvas.width +
            150
        ) {

            continue;

        }


        const floatOffset =
            getAnimatedVerticalOffset(
                object,
                currentTime
            );


        // -------------------------------------------------
        // TREE
        // -------------------------------------------------

        if (
            object.type ===
            "tree"
        ) {

            drawTree(
                object,
                screenX,
                currentTime
            );

        }


        // -------------------------------------------------
        // MEMORY
        // -------------------------------------------------

        if (
            object.type ===
            "memory"
        ) {

            if (
                object.collected
            ) {

                continue;

            }


            const bounds =
                getMemoryBounds(
                    object
                );


            if (
                object.sprite ===
                "jellyfish"
            ) {

                drawJellyfish(
                    screenX,
                    bounds,
                    floatOffset
                );

            }


            else if (
                object.sprite ===
                "cat"
            ) {

                drawCat(
                    screenX,
                    bounds,
                    floatOffset
                );

            }

        }


        // -------------------------------------------------
        // GIFT
        // -------------------------------------------------

        if (
            object.type ===
            "gift"
        ) {

            drawGift(
                object,
                screenX,
                currentTime
            );

        }

    }


    // =====================================================
    // GIFT ARROW
    // =====================================================

    drawGiftArrow(
        currentTime
    );


    // =====================================================
    // MEMORY MESSAGES
    // =====================================================

    drawMemoryMessages();


    // =====================================================
    // PLAYER
    // =====================================================

    const playerScreenX =
        player.x -
        camera.x;


    let playerBob =
        0;


    if (
        player.onGround &&
        player.velocityX === 0
    ) {

        playerBob =
            Math.sin(
                player.idleTime *
                3
            ) *
            2;

    }


    const currentBodySprite =
        getPlayerBodySprite();


    const spriteScale =
        player.spriteScale;


    const spriteWidth =
        currentBodySprite[0].length *
        spriteScale;


    const spriteHeight =
        currentBodySprite.length *
        spriteScale;


    const spriteX =
        playerScreenX +
        player.width /
        2 -
        spriteWidth /
        2;


    const spriteY =
        player.y +
        player.height -
        spriteHeight +
        playerBob;


    // -----------------------------------------------------
    // Hair back
    // -----------------------------------------------------

    drawPixelSprite(
        PLAYER_HAIR_BACK_SPRITE,
        spriteX,
        spriteY,
        spriteScale
    );


    // -----------------------------------------------------
    // Body
    // -----------------------------------------------------

    drawPixelSprite(
        currentBodySprite,
        spriteX,
        spriteY,
        spriteScale
    );


    // -----------------------------------------------------
    // Hair front
    // -----------------------------------------------------

    drawPixelSprite(
        PLAYER_HAIR_FRONT_SPRITE,
        spriteX,
        spriteY,
        spriteScale
    );

}


// =========================================================
// UPDATE GAME
// =========================================================

function updateGame(
    deltaTime
) {

    updatePlayer(
        deltaTime
    );


    checkMemoryCollisions();


    checkGiftCollision();


    updateShootingStars(
        deltaTime
    );


    updateCamera();

}


// =========================================================
// GAME LOOP
// =========================================================

let lastTime =
    0;


function gameLoop(
    currentTime
) {

    const deltaTime =
        (
            currentTime -
            lastTime
        ) /
        1000;


    const safeDeltaTime =
        Math.min(
            deltaTime,
            0.033
        );


    updateGame(
        safeDeltaTime
    );


    if (
        currentTime -
        lastVisualFrameTime >=
        visualFrameDuration
    ) {

        currentVisualTime =
            currentTime /
            1000;


        drawGame(
            currentVisualTime
        );


        lastVisualFrameTime =
            currentTime;

    }


    requestAnimationFrame(
        gameLoop
    );

}


// =========================================================
// START GAME
// =========================================================

window.addEventListener(
    "resize",
    resizeGameCanvas
);


resizeGameCanvas();

requestAnimationFrame(
    gameLoop
);