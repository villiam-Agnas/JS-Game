let playing = true
let coins = 1000
let deck = []
let playerHand = []
let dealerHand = []
function draw() {
    const INDEX = Math.floor(Math.random() * deck.length)
    const CARD = deck[INDEX];
    deck.splice(INDEX, 1)
    return CARD;
}
function sumHand(handSum) {
    let sum = 0
    let aces = 0
    for (let i = 0; i < handSum.length; i++) {
        if (handSum[i] === 11) {
            aces++
            sum += handSum[i]
        } else {
            sum += handSum[i]
        }
    }
    while (sum > 21 && aces > 0) {
        sum -= 10
        aces--
    }
    return sum
}
function refreshments() {
    while(true) {
        let drinks = ["negroni", "martini", "manhattan"]
        let drink = prompt("before we start would you like a drink? \nWe can make a fine Negroni, Martini or Manhattan.\nIf you don´t want a drink, you can just hit cancel")
        if (drink === null) {
            alert("as you wish, lets get to the game")
            break
        }
        if (drink.toLowerCase() === drinks[0]) {
            alert("you get the finest negroni you have ever tasted.")
            break
        } else if (drink.toLowerCase() === drinks[1]) {
            alert("you get the finest martini you have ever tasted.")
            break
       } else if (drink.toLowerCase() === drinks[2]) {
            alert("you get the finest manhattan you have ever tasted.")
            break
        } else {
            alert("Please order one of the drinks we know how to do!")
        }
    }
}
function reveal(playerHandSum, dealerHandSum, dealerHand, playerHand, bet) {
    alert(`Your hand: ${playerHand.join(" : ")}\nDealer hand: ${dealerHand.join(" : ")}\nThe dealer flips over his second card and it is a ${dealerHand[1]}, with his ${dealerHand[0]} he has a total of ${dealerHandSum}`)
    if (dealerHandSum >= playerHandSum && dealerHandSum <= 21) {
        alert(`Your hand: ${playerHand.join(" : ")}\nDealer hand: ${dealerHand.join(" : ")}\nThe dealers hand of ${dealerHandSum} beats your hand of ${playerHandSum}. you loose all the coins you had bet`)
        bet = 0
    } else if (dealerHandSum > 21) {
        bet = bet * 2
        alert(`Your hand: ${playerHand.join(" : ")}\nDealer hand: ${dealerHand.join(" : ")}\nThe dealer busted with ${dealerHandSum}! You get ${bet} coins back!`)
    } else if (dealerHandSum < playerHandSum) {
        let dealerLoosing = true
        while (dealerLoosing !== false) {
            dealerHand.push(draw())
            dealerHandSum = sumHand(dealerHand)
            if (dealerHandSum > playerHandSum && dealerHandSum <= 21) {
                alert(`Your hand: ${playerHand.join(" : ")}\nDealer hand: ${dealerHand.join(" : ")}\nThe dealer drew a ${dealerHand[dealerHand.length - 1]} making the hand a total of ${dealerHandSum} beating your hand of ${playerHandSum}. You loose all the coins you had bet!`)
                bet = 0
                break
            } else if (dealerHandSum > 21) {
                alert(`Your hand: ${playerHand.join(" : ")}\nDealer hand: ${dealerHand.join(" : ")}\nThe dealer drew a ${dealerHand[dealerHand.length - 1]} making their hand a total of ${dealerHandSum}. They bust!`)
                bet = bet * 2
                alert(`You get ${bet} coins back!`)
                break
            } else if (dealerHandSum >= 17 && dealerHandSum === playerHandSum) {
                alert(`Your hand: ${playerHand.join(" : ")}\nDealer hand: ${dealerHand.join(" : ")}\nYou tied with the dealer with a ${playerHandSum}.\nThat means you get your initial bet back.`)
                alert(`You get ${bet} coins back!`)
                break
            }
        }
    }
    return bet;
}
alert("\u{1F0A1} Welcome to casino JS bigshot. Here we specialize in kinda Blackjack. Please take a seat at a table and start wasting....i mean earning some money. (Highly recommend starting some smooth jazz in the background)\u{1F0A1}")
alert("We play a different version of blackjack here, that means there is no splitting\nSince you are such a nice guy we will give you 1000JS coins to start gambling with.")
alert("Your goal is to leave here with 5000 OR MORE JS COINS!\nIf you manage to do that, You are a true winner.\nBut if your amount of coins ever reach 0.....You will be swiftly kicked out of this fine establishment! GOOD LUCK!")
refreshments()
while (playing !== false) {
    deck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
    const numReg = /^\d+$/;
    let answer = prompt(`How much would you like to bet, you currently have: ${coins} coins.`)
    if (answer === null) {
        alert(`You managed to get a total of ${coins} coins.`)
        alert("Thank you for playing!")
        break
    }
    if (!numReg.test(answer)) {
        alert("please place a legitimate bet")
        continue
    }
    let bet = parseInt(answer)
    if (isNaN(bet)) {
        alert("Hey, you can only bet JS coins around here!")
        continue
    } else if (bet > coins) {
        alert("You don´t have that much money!")
        continue
    } else if (bet <= 0) {
        alert("Hey! Thats not a real bet!")
        continue
    }
    coins = coins - bet
    playerHand = []
    dealerHand = []
    let playerHandSum = 0
    let dealerHandSum = 0
    playerHand.push(draw())
    playerHand.push(draw())
    dealerHand.push(draw())
    dealerHand.push(draw())
    dealerHandSum = sumHand(dealerHand)
    playerHandSum = sumHand(playerHand)
    if (playerHandSum > 21) {
        alert(`Oh no! you got a total of ${playerHandSum}. thats means you busted! no money for you!`)
    } else {
        while (true) {
            let playDecide = (prompt(`Your hand: ${playerHand.join(" : ")}\nYou have been dealt a [${playerHand[0]}] and a [${playerHand[1]}] making it a total of [${playerHandSum}].\nThe dealer is showing a [${dealerHand[0]}].\nNow you can either \u2192 Hit \u2190 or \u2192 Stand \u2190.`))
            if (playDecide === null) {
                alert(`The dealer gives you a strange since seeing you put down ${bet} coins on the table but not wanting to see the showdown is a strange way to play blackjack....`)
                break
            }
            if (playDecide.toLowerCase() === "hit") {
                while (true) {
                    playerHand.push(draw())
                    playerHandSum = sumHand(playerHand)
                    if (playerHandSum > 21) {
                        alert(`Your hand: ${playerHand.join(" : ")}\nOh no, you busted with a ${playerHandSum} better luck next time!`)
                        break
                    } else if (playerHandSum === 21) {
                        alert(`Your hand: ${playerHand.join(" : ")}\nYou got ${playerHandSum} Thats awesome!`)
                        coins = coins + reveal(playerHandSum, dealerHandSum, dealerHand, playerHand, bet)
                        break
                    }
                    let playAgainDecide = (prompt(`Your hand: ${playerHand.join(" : ")}\nYou drew a ${playerHand[playerHand.length - 1]} giving you a total of ${playerHandSum}. Do you wish to hit again? Type either \u2192 Hit \u2190 or \u2192 Stand \u2190.`))
                    if (playAgainDecide === null) {
                        alert("The dealer looks at you and says -This is a pretty strange time to try and end the round but as you wish")
                        break
                    }
                    if (playAgainDecide.toLowerCase() === "stand") {
                        coins = coins + reveal(playerHandSum, dealerHandSum, dealerHand, playerHand, bet)
                        break
                    }
                }
                break
            } else if (playDecide.toLowerCase() === "stand") {
                coins = coins + reveal(playerHandSum, dealerHandSum, dealerHand, playerHand, bet)
                break
            } else {
                alert("please type either \u2192 hit \u2190 or \u2192 stand \u2190")
            }
        }
    }
    if (coins <= 0) {
        alert(`Oh no, you lost all of your coins. im sorry but you will have to leave the casino now.....YOU LOSE!`)
        break
    } else if (coins >= 5000) {
        alert(`God damn! you got ${coins} coins! You are a true BIG SHOT! YOU WIN!`)
        break
    }
}

