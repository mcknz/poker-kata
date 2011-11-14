var poker = function() {
    var beats =
        function(obj, other) {
            if(obj.number === other.number){ return false; }
            if(obj.number === poker.ace){ return true; }
            return obj.number > other.number;
        };

    var suitComparer = function(obj, other) { return obj.suit === other.suit; };

    var numberComparer = function(obj, other){ return obj.number === other.number; };

    var numberAndSuitComparer = function(obj, other){
        return suitComparer(obj, other) && numberComparer(obj, other);
    };

    return {
        ace: 1, jack: 11, queen: 12, king: 13,
        hearts: 20, spades: 21, clubs: 22, diamonds: 23,
        highCard: 0, pair: 1, twoPair: 2, threeOfAKind: 3, straight: 4,
            flush: 5, fullHouse: 6, fourOfAKind: 7, straightFlush: 8,
        beats: beats,
        suitComparer: suitComparer,
        numberComparer: numberComparer,
        numberAndSuitComparer: numberAndSuitComparer
    }
}();

poker.Card = function(obj) {
    return {
        number: obj.number,
        suit: obj.suit,
        beats: function(other) {
            return poker.beats(this,other);
        }
    }
};

poker.Hand = function() {
    var i = 0,
        c = [],
        logic = [];

    if(arguments.length < 5) {
        throw "hand needs five cards";
    }
    while(i < 5) {
       c[i] = arguments[i];
       i++;
    }

    c.sort(
        function(a,b) {
            if(a.number === b.number){ return 0; }
            if(a.number === poker.ace){ return -1; }
            if(a.number < b.number){ return 1; }
            if(a.number > b.number){ return -1; }
        }
    );

    logic[poker.highCard] = function(group){
        return group.length == 0;
    };

    logic[poker.pair] = function(group){
        return group.length == 1
            && group[0].length == 2;
    };

    var getValue = function() {
        var i = poker.pair;
        while(i > poker.highCard){
            if(logic[i](getGroupByNumber)){
                return i;
            }
            i--;
        }
        return i;
    };

    var getGroups = function(comparer) {
        var group = [], working =[], i = 0;
        while(i < 4) {
            if(comparer(c[i+1],c[i])){
                if(working.length == 0){
                    working.push(c[i+1]);
                }
                working.push(c[i]);
            } else {
                if(working.length > 0){
                    group.push(working);
                    working = [];
                }
            }
            i++;
        }
        if(working.length > 0){
            group.push(working);
        }
        return group;
    };

    if(getGroups(poker.numberAndSuitComparer).length > 0){
        throw "duplicate card not allowed";
    }

    var getGroupByNumber = function() { return getGroups(poker.numberComparer) };
    var getGroupBySuit = function() { return getGroups(poker.suitComparer) };

    return {    
        count: c.length,
        cards: c,
        beats: function(other){
            var thisValue = this.getValue(),
                otherValue = other.getValue();
            if(thisValue === otherValue){
                return true;
            } else {
                return this.cards[0].beats(other.cards[0]);
            }
        },
        getValue: getValue,
        getGroupByNumber: getGroupByNumber,
        getGroupBySuit: getGroupBySuit
    }
};
