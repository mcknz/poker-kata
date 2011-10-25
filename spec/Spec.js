describe("App", function() {
    it("runs", function() {
      expect(2+2).toBe(4);
    });
});

describe("Poker", function() {
    it("has hearts suit", function() {
      expect(poker.hearts).toEqual(20);
    });
    it("ace-high hand beats king-high hand", function() {
        expect(
            poker.Hand(
                getDiamond(poker.ace),
                getHeart(2),
                getClub(5),
                getClub(4),
                getSpade(7))
            .beats(
                poker.Hand(
                getDiamond(poker.king),
                getHeart(2),
                getClub(5),
                getClub(4),
                getSpade(7)
            )
        )).toBeTruthy();
    });

    it("pair beats king-high hand", function() {
        expect(
            poker.Hand(
                getDiamond(2),
                getHeart(2),
                getClub(5),
                getClub(4),
                getSpade(7))
            .beats(
                poker.Hand(
                getDiamond(poker.king),
                getHeart(2),
                getClub(5),
                getClub(4),
                getSpade(7)
            )
        )).toBeTruthy();
    });

    it("pair of threes beats pair of twos", function() {
        expect(
            poker.Hand(
                getDiamond(2),
                getHeart(6),
                getClub(3),
                getHeart(3),
                getSpade(7))
            .beats(
                poker.Hand(
                getDiamond(2),
                getHeart(2),
                getClub(5),
                getClub(4),
                getSpade(7)
            )
        )).toBeTruthy();
    });

    it("two pair of beats pair", function() {
        expect(
            poker.Hand(
                getDiamond(2),
                getHeart(2),
                getClub(8),
                getClub(7),
                getSpade(7))
            .beats(
                poker.Hand(
                getDiamond(8),
                getHeart(8),
                getClub(5),
                getClub(4),
                getSpade(7)
            )
        )).toBeTruthy();
    });
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
      var h = poker.Hand(getHeart(2),getHeart(3),getHeart(4),getHeart(5),getHeart(7));
      expect(h.count).toEqual(5);
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
});

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
