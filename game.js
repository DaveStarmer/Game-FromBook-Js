// Haunted House Adventure
// from BASIC version
// this version for Browser JS


// LINE 70
var v = 25, w = 36, g = 18;
// variables which need global scope, but weren't originally declared at this point
var r$, d$, o$, f, ll, m$, v$, rm, c, l, f, q$, vb, ob;
// LINE 80 (GOSUB 1600)
initialise(); // equivalent to GOSUB 1600

/** should screen clear and game display be run? */
var shouldCls = true;

// display the first screen
gameDisplay();

// set the game to cycle again each time text is entered
document.getElementById('input-text').addEventListener('keypress',function(e){
    if (e.key==="Enter") {
        e.preventDefault();
        game();
    }
});

function gameDisplay() {
    // LINE 90
    basic.cls();
    // LINE 100
    basic.print("-------------");
    basic.print("YOUR LOCATION");
    basic.print(d$[rm]);
    // LINE 130-170
    basic.print("Exits: ",false);
    for (i=0;i<r$[rm].length;++i)
    {
        basic.print(r$[rm].substring(i,i+1)+",",false);
    }
    basic.print();
    // LINES 180-200
    for (let i = 1; i<=g; ++i) {
        if (l[i] == rm && f[i] == 0) 
            basic.print("YOU CAN SEE " + o$[i] + " HERE");
    }
    basic.print(m$);
    m$="WHAT";
    basic.inputPrompt("WHAT WILL YOU DO NOW");
    basic.inputFocus();
}

function game(){
    // deal with possibility that something has been displayed which needs clearing
    if (!shouldCls) {
        shouldCls = true;
        gameDisplay();
        return;
    }
    // input and analytics
    q$ = basic.inputValue().toUpperCase();
    v$="";
    w$="";
    vb=0;
    ob=0;
    for (let i=0;i < q$.length;++i) {
        if (q$.substring(i,i+1) == " " && v$=="") v$=q$.substring(0,i);
        if (q$.substring(i+1,i+2) != " " && v$ != "") {
            w$ = q$.substring(i+1);
            break;
        }
    }
    if (w$=="") v$=q$;
    for (let i=1;i<=v;++i) {
        if (v$==verb$[i]) vb=i;
    }
    for (let i =1;i<=w;++i)
    {
        if (w$ == o$[i]) {
            ob=i;
            console.log(o$[i]);
        }
    }

    // error messages and override conditions
    if (q$>"" && ob == 9) m$="THAT'S SILLY";
    if (vb == 0) vb = v+1;
    if (w$ == "") m$ = "I NEED TWO WORDS";
    if (vb > v && ob>0) m$ = "YOU CAN'T '" + q$ +"'";
    if (vb > v && ob == 0) m$ = "YOU DON'T MAKE SENSE";
    if (vb < v && ob > 0 && [ob] == 0) m$ = "YOU DON'T HAVE '" + w$ + "'";
    if (f[26] = 1 && rm == 13 && basic.rnd(3) != 3 && vb != 21) {
        m$="BATS ATTACKING";
        gameDisplay();
        return;
    }
    if (rm == 44 && basic.rnd(2) == 1 && f[24] != 1) f[27] = 1
    if (f[0] == 1) ll--;
    if (ll < 1) f[0] = 0;

    // branch to subroutines (replacing GOSUB with a function call
    // which houses a switch statement)
    verbInterpret();

    // slightly modified message passing
    if (ll == 10) m$ += " YOUR CANDLE IS WANING";
    if (ll == 1) m$ += "YOUR CANDLE IS OUT";
    
    // run game display now input has been dealt with - if cls is true
    if (shouldCls) gameDisplay();
}

function verbInterpret(){
    // LINE 460
    // ON VB GOSUB re-imagined as a switch statement with appropriate cases
    switch (vb) {
        case 1:
            // HELP
            basic.print("WORDS I KNOW:");
            for (let i=1;i<v;++i) {
                basic.print(verb$[i]+", ",false);
            }
            m$="";
            basic.print();
            waitForReturn();
            break;
        case 2:
            // CARRYING?
            basic.print("YOU ARE CARRYING:")
            for (let i=1;i<=g;++i){
                if (c[i]==1) basic.print(o$[i] + ", ",false);
            }
            m$="";
            basic.print();
            waitForReturn();
            break;
        case 3:
            // GO
        case 4:
            // N
        case 5:
            // S
        case 6:
            // W
        case 7:
            // E
        case 8:
            // U
        case 9:
            // D
            d = 0;
            if (ob==0) d=vb-3;
            if (ob==19) d=1;
            if (ob==20) d=2;
            if (ob==21) d=3;
            if (ob==22) d=4;
            if (ob==23) d=5;
            if (ob==24) d=6;
            if (rm==20 && d==5) d=1;
            if (rm==20 && d==6) d=3;
            if (rm ==22 && d==6) d=2;
            if (rm==22 && d==5) d=3;
            if (rm==36 && d==6) d=1;
            if (rm==36 && d==5) d=2;
            if (f[14]==1) {
                m$="CRASH! YOU FELL OUT OF THE TREE!";
                f[14]=0;
                break;
            }
            if (f[27]==1 && rm==52) {
                m$="GHOSTS WILL NOT LET YOU MOVE";
                break;
            }
            if (rm==45 && c[1]==1 && f[34]==0) {
                m$="A MAGICAL BARRIER TO THE WEST";
                break;
            }
            if ((rm==26 && f[0]==0) && (d==1 || d==4)) {
                m$="YOU NEED A LIGHT";
                break;
            }
            if (rm==54 && C[15] !=1) {
                m$="YOU'RE STUCK!";
                break;
            }
            if (c[15]==1 && !(rm==53 || rm==54 || rm==55 || rm==47)) {
                m$="YOU CAN'T CARRY A BOAT!";
                break;
            }
            if ((rm>26 && rm<30) && f[0]==0) {
                m$="TOO DARK TO MOVE";
                break;
            }
            f[35]=0;
            let rl = r$[rm].length;
            for (let i=0;i<rl;++i) {
                let u$ = r$[rm].substring(i,i+1);
                if (u$ == "N" && d==1 && f[35]==0){
                    rm-=8;
                    f[35]=1;
                } 
                if (u$ == "S" && d==2 && f[35]==0) {
                    rm+=8;
                    f[35]=1;
                }
                if (u$=="W" && d==3 && f[35]==0) {
                    rm-=1;
                    f[35]=1;
                }
                if (u$=="E" && d==4 && f[35]==0) {
                    rm+=1;
                    f[35]=1;
                }
            }
            m$="OK";
            if (f[35]==0) m$="CAN'T GO THAT WAY!";
            if (d<1) m$="GO WHERE>";
            if (rm==41 && f[23]==1) {
                r$[49]="SW";
                m$="THE DOOR SLAMS SHUT!";
                f[23]=0;
            }
            break;
            case 10:
                // GET
            case 11:
                // TAKE
                if (ob>g) {
                    m$="I CAN'T GET "+w$;
                    return;
                }
                if (l[ob] != rm) m$="IT ISN'T HERE";
                if (f[ob] != 0) m$ = "WHAT "+w$ +"?";
                if (c[ob]==1) m$="YOU ALREADY HAVE IT!";
                if (ob>0 && l[ob]==rm && f[ob] == 0) {
                    c[ob]=1;
                    l[ob]=65;
                    m$="YOU HAVE THE "+ w$
                }
                break;
            case 12:
                // OPEN
                verbOpen();
                break;
            case 13:
                // EXAMINE
                if (ob==30) {
                    f[18]=0;
                    m$="SOMETHING HERE!";
                }
                if (ob==31) m$="THAT'S DISGUSTING!";
                if (ob==28 || ob==29) m$ == "THERE IS A DRAWER";
                if (ob == 33 || ob ==5) verbOpen(); 
            case 14:
                // READ
                if (rm==42 && ob ==33) m$="THEY ARE DEMONIC WORKS";
                if ((ob==3 || ob==36) && c[3]==1 && f[34]==0) m$="USE THIS WORD WITH CASE'XZANFAR'";
                if (c[5]==1 && ob==5) m$="THE SCRIPT IS IN AN ALIEN TONGUE";
                break;
            case 15:
                // SAY
                m$="OK '" + w$ + "'";
                if (c[3] ==1 && ob == 34) {
                    m$="*MAGIC OCCURS*"
                    if (rm != 45) rm = basic.rnd(63);
                } 
                if (c[3] == 1 && rm == 45) f[34] = 1;
                break;
            case 16:
                // DIG
                if (c[12] == 1) m$="YOU MADE A HOLE";
                if (c[12] == 1 && rm == 30) {
                    m$="DUG THE BARS OUT";
                    d$(rm)="HOLE IN THE WALL";
                }
                break;
            case 17:
                // SWING
                if (c[14] != 1 && rm ==7) m$="THIS IS NO TIME TO PLAY GAMES";
                if (ob==14 && c[14]==1) m$="YOU SWUNG IT";
                if (ob ==13 && c[13]==1) m$="WOOSH!";
                if (ob ==13 && c[13]==1 && rm ==44) {
                    r$[rm]="WN";
                    d$[rm]="STUDY WITH SECRET ROOM";
                    m$="YOU BROKE THE THIN WALL";
                }
                break;
            case 18:
                // CLIMB
                if (ob==14 && c[14]==1) m$="IT ISN'T ATTACHED TO ANYTHING!";
                if (ob==14 && c[14]!=1 && rm ==7 && f[14]==1) {
                    m$="GOING DOWN!";
                    f[14]=0;
                }
                break;
            case 19:
                // LIGHT
                if (ob == 17 && c[17] == 1 && c[8] == 0) m$="IT WILL BURN YOUR HANDS";
                if (ob == 17 && c[17]==1 && c[9]==0) m$ = "NOTHING TO LIGHT IT WITH";
                if (ob == 17 && c[17] == 1 && c[9] ==1 & c[8] ==1) {
                    m$="IT CASTS A FLICKERING LIGHT";
                    f[0]=1
                }
                console.log("LIGHT CANDLE", f[0])
                break;
            case 20:
                // UNLIGHT
                if (f[0] == 1) {
                    f[0]=0;
                    m$="EXTINGUISED";
                }
                break;
            case 21:
                // SPRAY
                if (ob == 26 && c[16] == 1) m$="HISSSSSSSS";
                if (ob == 26 && c[16] == 1) {
                    f[26] = 0;
                    m$ = "PFFT! GOT THEM";
                }
                break;
            case 22:
                // USE
                if (ob == 10 && c[10] == 1 && c[11] == 1) {
                    m$="SWITCHED ON";
                    f[24] = 1;
                }
                if (f[27] == 1 && f[24] == 1) {
                    m$="WHIZZ - VACUUMED THE GHOSTS UP!";
                    f[27]=0;
                }
                break;
            case 23:
                // UNLOCK
                if (rm == 43 && (ob ==27 || ob == 28)) verbOpen();
                if (rm == 28 && ob == 25 && f[25] == 0 && c[18] == 1) {
                    f[25] = 1;
                    r$(rm)="SEW";
                    d$(rm) = "HUGE OPEN DOOR";
                    m$="THE KEY TURNS";
                }
                break;
            case 24:
                // LEAVE
                if (c[ob] == 1) {
                    c[ob] == 0;
                    l[ob] = rm;
                    m$="DONE";
                }
                break;
            case 25:
                // SCORE
                let s=0;
                for (let i=1;i<=g;++i)
                {
                    if (c[i]=1) s+=1;
                }
                if (s==17 && c[15] != 1 && rm !=57) {
                    basic.print("YOU HAVE EVERYTHING");
                    basic.print("RETURN TO THE GATE FOR FINAL SCORE");
                }
                if (s==17 && rm == 57) {
                    basic.print("DOUBLE SCORE FOR REACHING HERE!");
                    s *= 2;
                }
                basic.print("YOUR SCORE=" + S);
                if (s>10) {
                    basic.print("WELL DONE! YOU FINISHED THE GAME");
                }
                else {
                    
                }
                break;
        }
}

// LINE 1580 - wait for return to be pressed to continue game
function waitForReturn() {
    basic.inputPrompt("PRESS RETURN TO CONTINE");
    shouldCls = false;
}

/** replaces several 'GOSUB 1030's as well as the verb 12 section at 1030 */
function verbOpen()
{
    if (rm=43 && (ob==28 || ob==29)) {
        f[17]=0
        m$="DRAWER OPEN";
    } 
    if (rm == 28 && ob==25)m$="IT'S LOCKED";
    if (rm=28 && ob == 32) {
        m$="THAT'S CREEPY!"
        f[2]=0;
    }
}

function initialise() {
    l=["ignore",46,38,35,50,13,18,28,42,10,25,26,4,2,7,47,60,43,32];
    
    /** possible verbs */
    verb$=["ignore because basic starts at 1",
        "HELP","CARRYING?","GO","N","S","W","E","U","D","GET","TAKE","OPEN","EXAMINE","READ","SAY",
        "DIG","SWING","CLIMB","LIGHT","UNLIGHT","SPRAY","USE","UNLOCK","LEAVE","SCORE"];
    
    // LINES 1710-1810
    /** direction options */
    r$=["ignore because basic starts at 1",
        "SE","WE","WE","SWE","WE","WE","SWE","WS",
        "NS","SE","WE","NW","SE","W","NE","NSW",
        "NS","NS","SE","WE","NSUD","SE","WSUD","NS",
        "N","NS","NSE","WE","WE","NSW","NS","NS",
        "S","NSE","NSW","S","NSUD","N","N","NS",
        "NE","NW","NE","W","NSE","WE","W","NS",
        "SE","NSW","E","WE","NW","S","SE","NW",
        "NE","NWE","WE","WE","WE","NWE","NWE","W"
    ];

    /** room description */
    d$=["ignore because basic starts at 1",
        "DARK CORNER","OVERGROWN GARDEN","BY LARGE WOODPILE","YARD BY RUBBISH",
            "WEEDPATCH","FOREST","THICK FOREST","BLASTED TREE",
            "CORNER OF HOUSE"," ENTRANCE TO KITCHEN","KITCHEN GRIMY COOKER","SCULLERY DOOR",
            "ROOM WITH INCHES OF DUST","REAR TURRET ROOM","CLEARING BY HOUSE","PATH",
            "SIDE OF HOUSE","BACK OF HALLWAY","DARK ALCOVE","SMALL DARK ROOM",
            "BOTTOM OF SPIRAL STAIRCASE","WIDE PASSAGE","SLIPPERY STEPS","CLIFFTOP",
            "NEAR CRUMBLING WALL","GLOOMY PASSAGE","POOL OF LIGHT", "IMPRESSIVE VAULTED HALLWAY",
            "HALL BY THICK WOODEN DOOR","TROPHY ROOM","CELLAR WITH BARRED WINDOW","CLIFF PATH",
            "CUPBOARD WITH HANGING COAT","FRONT HALL","SITTING ROOM","SECRET ROOM",
            "STEEP MARBLE STAIRS","DINING ROOM","DEEP CELLAR WITH COFFIN","CLIFF PATH",
            "CLOSET","FRONT LOBBY","LIBRARY OF EVIL BOOKS","STUDY WITH DESK & HOLE IN WALL",
            "WEIRD COBWEBBY ROOM","VERY COLD CHAMBER","SPOOKY ROOM","CLIFF PATH BY MARSH",
            "RUBBLE-STREWN VERANDAH","FRONT PORCH","FRONT TOWER","SLOPING CORRIDOR",
            "UPPER GALLERY","MARSH BY WALL","MARSH","SOGGY PATH",
            "BY TWISTED RAILING", "PATH THROUGH IRON GATE","BY RAILINGS"," BENEATH FRONT TOWER",
            "DEBRIS FROM CRUMBLING FACADE","LARGE FALLEN BRICKWORK","ROTTING STONE ARCH","CRUMBLING CLIFFTOP"
    ];

    /** objects */
    o$=["ignore because basic starts at 1",
        "PAINTING","RING","MAGIC SPELLS","GOBLET","SCROLL","COINS","STATUE","CANDLESTICK",
        "MATCHES","VACUUM","BATTERIES","SHOVEL","AXE","ROPE","BOARD","AEROSOL","CANDLE","KEY",
        "NORTH","SOUTH","WEST","EAST","UP","DOWN",
        "COFFIN","BOOKS","XZANFAR","WALL","SPELLS"
    ];
    c=[];
    f=[];
    for (let i=0;i<=28;++i) {
        f[i]=0;
    }
    f[18] =1 ;
    f[17] =1 ;
    f[2] = 1;
    f[26] =1 ;
    f[28] =1 ;
    f[23] =1 ;
    ll = 60;
    rm = 57;
    m$="OK";
    // added because JS variables initialise to undefined rather than 0
    ob = 0;
    for (let i = 0; i <= w; ++i) {
        c[i]=0;
    }
}
