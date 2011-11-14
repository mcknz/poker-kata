describe("App", function() {
    it("runs", function() {
      expect(2+2).toBe(4);
    });
});

describe("Poker", function() {
    it("has hearts suit", function() {
      expect(poker.hearts).toEqual(20);
    });

    it("ace-high beats king-high", function() {
        expect(
            poker.Hand(
                getDiamond(poker.ace),getHeart(2),getClub(5),getClub(4),getSpade(7)
            ).beats(
                poker.Hand(
                    getDiamond(poker.king),getHeart(2),getClub(5),getClub(4),getSpade(7)
                )
            )
        ).toBeTruthy();
    });
    
    it("king-high does not beat ace-high", function() {
        expect(
            poker.Hand(getDiamond(poker.king),getHeart(2),getClub(5),getClub(4),getSpade(7))
            .beats(
                poker.Hand(getDiamond(poker.ace),getHeart(2),getClub(5),getClub(4),getSpade(7))
            )
        ).toBeFalsy();
    });
/*
    it("ace-king-queen-jack-eight-high does not beat ace-king-queen-jack-nine-high hand", function() {
        expect(
            poker.Hand(getDiamond(poker.ace),getHeart(poker.king),getClub(poker.queen),getClub(poker.jack),getSpade(8))
            .beats(
                poker.Hand(getDiamond(poker.ace),getHeart(poker.king),getClub(poker.queen),getClub(poker.jack),getSpade(9))
            )
        ).toBeFalsy();
    });

    it("ace-king-queen-jack-nine-high does not beat ace-king-queen-jack-nine-high hand", function() {
        expect(
            poker.Hand(getDiamond(poker.ace),getHeart(poker.king),getClub(poker.queen),getClub(poker.jack),getSpade(9))
            .beats(
                poker.Hand(getDiamond(poker.ace),getHeart(poker.king),getClub(poker.queen),getClub(poker.jack),getSpade(8))
            )
        ).toBeFalsy();
    });

    it("pair beats king-high hand", function() {
        expect(
            poker.Hand(getDiamond(2),getHeart(2),getClub(5),getClub(4),getSpade(7))
            .beats(
                poker.Hand(getDiamond(poker.king),getHeart(2),getClub(5),getClub(4),getSpade(7))
            )
        ).toBeTruthy();
    });

    it("pair of threes beats pair of twos", function() {
        expect(
            poker.Hand(getDiamond(2),getHeart(6),getClub(3),getHeart(3),getSpade(7))
            .beats(
                poker.Hand(getDiamond(2),getHeart(2),getClub(5),getClub(4),getSpade(7))
            )
        ).toBeTruthy();
    });

    it("pair of twos does not beat pair of threes", function() {
        expect(
            poker.Hand(getDiamond(2),getHeart(6),getClub(2),getHeart(2),getSpade(7))
            .beats(
                poker.Hand(getDiamond(3),getHeart(3),getClub(5),getClub(4),getSpade(7))
            )
        ).toBeFalsy();
    });

    it("two pair of beats pair", function() {
        expect(
            poker.Hand(getDiamond(2),getHeart(2),getClub(8),getClub(7),getSpade(7))
            .beats(
                poker.Hand(getDiamond(8),getHeart(8),getClub(5),getClub(4),getSpade(7)
            )
        )).toBeTruthy();
    });
    */
});

describe("Card", function() {
    it("exists", function() {
      expect(getHeart(poker.ace)).toBeDefined();
    });

    it("has suit", function() {
      expect(getHeart(2).suit).toEqual(poker.hearts);
    });

    it("beats lower value card", function() {
      expect(getHeart(3).beats(getHeart(2))).toBeTruthy();
    });

    it("ace beats lower value card", function() {
      expect(getHeart(poker.ace).beats(getHeart(2))).toBeTruthy();
    });
});

describe("Hand", function() {
    it("has five cards", function() {
      expect(getLowHand().count).toEqual(5);
    });

    it("has no more than 5 cards", function() {
      var h = poker.Hand(getHeart(2),getHeart(3),getHeart(4),getHeart(5),getHeart(7),getHeart(9));
      expect(h.count).toEqual(5);
    });

    it("has a card with a number", function() {
      var h = poker.Hand(getHeart(2),getHeart(3),getHeart(4),getHeart(5),getHeart(7));
      expect(h.cards[0].number).toEqual(7);
    });

    it("does not have a duplicate card", function() {
      expect(
          function(){
              poker.Hand(getHeart(2),getHeart(3),getHeart(5),getHeart(5),getHeart(7))
          })
          .toThrow("duplicate card not allowed");
    });

    it("returns value of pair when has pair", function() {
      expect(getPair().getValue()).toEqual(poker.pair);
    });

    it("has one group is a pair", function() {
      expect(getPair().getGroupByNumber().length).toEqual(1);
    });

    it("has one subgroup of two when is a pair", function() {
      expect(getPair().getGroupByNumber()[0].length).toEqual(2);
    });

    it("has no other groups when is a pair", function() {
      expect(getPair().getGroupByNumber().length).toBeLessThan(2);
    });


});

function getLowHand() {
    return poker.Hand(getHeart(2),getHeart(3),getHeart(4),getHeart(5),getHeart(7));
}

function getPair() {
    return poker.Hand(getHeart(2),getClub(2),getHeart(4),getHeart(5),getHeart(7));
}

function getHeart(val) {
    return poker.Card({'number':val,'suit':poker.hearts});
}

function getSpade(val) {
    return poker.Card({'number':val,'suit':poker.spades});
}

function getClub(val) {
    return poker.Card({'number':val,'suit':poker.clubs});
}

function getDiamond(val) {
    return poker.Card({'number':val,'suit':poker.diamonds});
}
