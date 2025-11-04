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
alert("Welcome to casino JS bigshot. here we specialize in kinda Blackjack. please take a seat at a table and start waisting....i mean earning some money. (highly recommend starting some smooth jazz in the background)")
alert("we play a different version of blackjack here, that means there is no splitting\nSince you are such a nice guy we will give you 1000JS coins to start gambling with.")
alert("your goal is to leave here with 5000 OR MORE JS COINS!\nIf you manage to do that, You are a true winner.\nBut if your amount of coins ever reach 0.....You will be swiftly kicked out of this fine establishment! GOOD LUCK!")
while (playing !== false) {
    deck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
    let answer = prompt(`How much would you like to bet, you currently have: ${coins} coins.`)
    if (answer === null) {
        alert(`You managed to get a total of ${coins} coins.`)
        alert("Thank you for playing!")
        break
    }
    let bet = parseInt(answer)
    if (isNaN(bet)) {
        alert("Hey, you can only bet JS coins around here!")
        continue
    } else if (bet > coins) {
        alert("You don´t have that much money!")
        continue
    } else if (bet === 0) {
        alert("You gotta bet something!")
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
            let playDecide = (prompt(`Your hand: ${playerHand.join(" : ")}\nYou have been dealt a [${playerHand[0]}] and a [${playerHand[1]}] making it a total of [${playerHandSum}].\nThe dealer is showing a [${dealerHand[0]}].\nIf you wish to hit type 1 or if you wish to stand type 2.`))
            if (playDecide === null) {
                alert(`The dealer gives you a strange since seeing you put down ${bet} coins on the table but not wanting to see the showdown is a strange way to play blackjack....`)
                break
            }
            let play = parseInt(playDecide)
            if (play === 1) {
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
                    let playAgain = parseInt(prompt(`Your hand: ${playerHand.join(" : ")}\nYou drew a ${playerHand[playerHand.length - 1]} giving you a total of ${playerHandSum}. Do you wish to hit again? if you wish to hit type 1 or if you wish to stand type 2.`))
                    if (playAgain === 2) {
                        coins = coins + reveal(playerHandSum, dealerHandSum, dealerHand, playerHand, bet)
                        break
                    }
                }
                break
            } else if (play === 2) {
                coins = coins + reveal(playerHandSum, dealerHandSum, dealerHand, playerHand, bet)
                break
            } else if (isNaN(play)) {
                alert("please type either 1 or 2!")
            } else [
                alert("Please type either 1 or 2!")
            ]
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

