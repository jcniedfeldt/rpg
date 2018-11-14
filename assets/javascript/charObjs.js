
function createFighter(name, baseAttack, counterAttack, health, image) {
    var fighter = {
        name: name,
        baseAttack: baseAttack,
        attackPower: baseAttack,
        counterAttack: counterAttack,
        health: health,
        image: image,
        attack: function (enemyFighter) {
            enemyFighter.health -= fighter.attackPower;
            if (enemyFighter.health <1){
                enemyFighter.health=0;
            }
            fighter.attackPower += fighter.baseAttack;

            if (enemyFighter.health > 0) {
                fighter.health -= enemyFighter.counterAttack;
                if (fighter.health<0){
                    fighter.health=0;
                }
            }
        },
        getDisplayHTMLstr: function () {
            return '<div class="col-md-4 fighter" id="' + name + '"><div class="card" style="width: 18rem;"><img class="card-img-top" src="' + fighter.image + '" alt="Card image cap"><div class="card-body"><h5 class="card-title name">' + fighter.name + '</h5><p class="card-text health">' + fighter.health + '</p></div></div></div>'
        },
        setOnClick: function () {
            $("#" + fighter.name).on("click", function () {
                fighterSelected(fighter);
            })
        }
    }
    return fighter;
}



function availableFighters() {
    return [createFighter("Pikachu", 50, 10, 100, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"),
    createFighter("Charizard", 40, 30, 120, "https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png"),
    createFighter("Blastoise", 30, 100, 150, "https://cdn.bulbagarden.net/upload/thumb/0/02/Blasty.png/230px-Blasty.png")
    ];
}


$(document).ready(function () {

    var myFighter = $("#yourFighter");
    var enemyFighter = $("#enemyFighter");
    var attackButton = $("#attackButton")
    var myFighterObj;
    var enemyFighterObj;
    var fighters;

    function reset() {
        myFighter.empty();
        enemyFighter.empty();
        attackButton.empty();

        $("#myFighterText").text("Choose Your Fighter");

        fighters = availableFighters();
        myFighterObj = {};

        fighters.forEach(fighter => {
            var displaystr = fighter.getDisplayHTMLstr();
            // console.log(displaystr)
            myFighter.append(displaystr);
        });

        $(".fighter").on("click", function (el) {
            name = $(this).attr("id")
            // console.log(name);
            myFighterObj = popFighter(name, fighters);
            console.log(myFighterObj)
            myFighter.empty();
            myFighter.append(myFighterObj.getDisplayHTMLstr());
            myFighterSelected();
            $("#myFighterText").text("My Fighter");
            $("#message").text("You chose "+myFighterObj.name+" as your Fighter. Choose your challenger.");
            console.log(fighters);
        });
    }

    function myFighterSelected() {

        fighters.forEach(fighter => {
            var displaystr = fighter.getDisplayHTMLstr();
            // console.log(displaystr)
            $("#enemyFighterText").text("Choose Enemy Fighter");
            enemyFighter.append(displaystr);
        });

        enemyFighter.find(".fighter").on("click", function (el) {
            name = $(this).attr("id")
            // console.log(name);
            enemyFighterObj = popFighter(name, fighters);
            console.log(enemyFighterObj)
            enemyFighter.empty();
            enemyFighter.append(enemyFighterObj.getDisplayHTMLstr());
            enemySelected();
            $("#enemyFighterText").text("Enemy Fighter");
            $("#message").text("You chose "+enemyFighterObj.name+" as your challenger. Attack!");
            // myFighterSelected();
        });
    }

    function enemySelected() {
        attackButton.append('<button type="button" class="btn btn-primary" id="attack">Attack</button>');
        $("#attack").on("click", function () {
            attack();
        })
    }

    function attack() {
        myFighterObj.attack(enemyFighterObj);
        console.log(myFighterObj);
        console.log(enemyFighterObj);
        // update fighters
        updateFighters();
        if (enemyFighterObj.health==0){
            attackButton.empty();
            enemyFighter.empty();
            if (fighters.length<1){
                $("#message").text("You defeated "+enemyFighterObj.name+"! YOU WIN!!!!! Play again.");
                reset();
            } else {
                $("#message").text("You defeated "+enemyFighterObj.name+"! Pick a new challenger.");
                myFighterSelected();

            }
        } else if (myFighterObj.health==0){
            attackButton.empty();
            $("#message").text("You were defeated by "+enemyFighterObj.name+". Try again.");
            reset();
        } else {

        }
    };

    function updateFighters(){
        myFighter.empty();
        myFighter.append(myFighterObj.getDisplayHTMLstr());
        enemyFighter.empty();
        enemyFighter.append(enemyFighterObj.getDisplayHTMLstr());
    };

    function popFighter(name, fighters) {
        // for (let index = 0; index < fighters.length; index++) {
        //     const fighter =fighters[index];
        //     if fighter
        // }
        // fighters.splice(fighters.indexOf(name))
        var fighter2ret;
        fighters.forEach(function (fighter, index) {
            if (fighter.name == name) {
                fighter2ret = fighters.splice(index, 1)[0];
                // console.log(fighter2ret);

            }
        });
        return fighter2ret;
    }

    reset();

});