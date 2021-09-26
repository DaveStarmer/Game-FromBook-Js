// Haunted House Adventure
// from BASIC version
// this version for NODE.JS

// get BASIC-equivalent commands
var basic = require('./basicNode.js');

// game programming
var v = 25, w = 36, g = 18;
// variables which need global scope, but weren't originally declared at this point
var r$, d$, o$, f, ll, m$, v$, rm, c, l, f, q$
initialise(); // equivalent to GOSUB 1600

// run the game
game();

function game() {
    basic.print("-------------");
    basic.print("YOUR LOCATION");
    basic.print(d$[rm]);
    let printString = "Exits: ";
    for (i=0;i<r$[rm].length;++i)
    {
        printString += r$[rm].substring(i,i);
        if (i < r$[rm].length - 1) printString += ",";
    }
    basic.print(printString);
    basic.print();
}

function initialise() {
    l=[46,38,35,50,13,18,28,42,10,25,26,4,2,7,47,60,43,32];
    
    /** possible verbs */
    v$=["HELP"," CARRYING?","GO"," N"," S"," W"," E"," U"," D"," GET","TAKE","OPEN"," EXAMINE","READ","SAY",
        "DIG","SWING","CLIMB","LIGHT","UNLIGHT","SPRAY","USE","UNLOCK","LEAVE","SCORE"];
    
    /** direction options */
    r$=["SE","WE","WE","SWE","WE","WE","SWE","WS",
        "NS","SW","WE","NW","SE","W","WE","NSW",
        "NS","NS","SE","WE","NSUD","SE","WSUD","NS",
        "N","NS","NSE","WE","WE","NSW","NS","NS",
        "S","NSE","NSWNS","NSUD","N","N","NS",
        "NE","NW","NE","W","NSE","WE","W","NS",
        "SE","NSW","E","WE","NW","S","SW","NS",
        "NE","NEW","WE","WE","WE","NWE","NWE","W"
    ];

    /** room description */
    d$=["DARK CORNER","OVERGROUWN GARDEN","BY LARGE WOODPILE","YARD BY RUBBISH",
            "CORNER OF HOUSE"," ENTRANCE TO KITCHEN","KITCHEN GRIMY COOKER","SCULLERY DOOR",
            "ROOM WITH INCHES OF DUST"," REAR TURRET ROOM","CLEARING BY HOUSE"," PATH",
            "SIDE OF HOUSE"," BACK OF HALLWAY"," DARK ALCOVE","SMALL DARK ROOM",
            "BOTTOM OF SPIRAL STAIRCASE","WIDE PASSAGE","SLIPPERSTEPS","CLIFFTOP",
            "NEAR CRUMBLING WALL","FLOOMY PASSAGE","POOL OLIGHT"," IMPRESSIVE VAULTED HALLWAY",
            "HALL BYTHICK WOODEN DOOR","TROPY ROOM","CELLAR WITBARRED WINDOW","CLIFF PATH",
            "CUPBOARD WITH HANGING COAT","FRONT HALL","SITTINROOM","SECRET ROOM",
            "STEEP MARLE STAIRS","DINING ROOM","DEEP CELLAR WITCOFFIN","CLIFF PATH",
            "CLOSET","FRONT LOBBY","LIBRARY OF EVIL BOOKS","STUDWITH DESK & HOLE IN WALL",
            "WEIRD COBWEBBY ROOM"," VERY COLD CHAMBER","SPOOKROOM","CLIFF PATH BY MARSH",
            "RUBBLE-STREWN VERANDAH","FRONT PORCH","FRONT TOWER","SLOPING CORRIDOR",
            "UPPER GALLERY","MARSH BY WALL","MARSH","SOGGY PATH",
            "BY TWISTED RAILING. PATH THROUGH IRON GATE"," BRAILINGS"," BENEATH FRONT TOWER",
            "DEBRIS FROM CRUMBLING FACADE","LARGE FALLEBRICKWORK","ROTTING STONE ARCH","CRUMBLING CLIFFTOP"
    ];

    /** objects */
    o$=["PAINTING","RING","MAGIC SPELLS","GOBLET","SCROLL","COINS","STATUE","CANDLESTICK",
        "MATCHES","VACUUM","BATTERIES","SHOVEL","AXE","ROPE","BOARD","AERISOL","SNADLE","KEY",
        "NORTH","SOUTH","WEST","EAST","UP","DOWN",
        "COFFIN","BOOKS","XZANFAR","WALL","SPELLS"
    ];
    c=[];
    f=[];
    f[18]=1;
    f[17]=1;
    f[2]=1;
    f[26]=1;
    f[28]=1;
    f[23]=1;
    ll = 60;
    rm=57;
    m$="OK";
}
