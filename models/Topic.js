var topics = ["Parking and coffee to be included in college tuition fee.",
    "How to handle well-meaning people you don’t like.",
    "Men should never wear skinny jeans.",
    "Grades don’t matter.",
    "The work week should be shorter.",
    "Horror movies are good for experiencing the adrenaline rush.",
    "Funny pick up lines work.",
    "Blaming the horoscope when things go wrong helps.",
    "How playing games raised your IQ.",
    "A thumb is a finger.",
    "Make your friends pay every time, all the time.",
    "Guys gossip more than girls.",
    "Why being fair doesn’t work all the time.",
    "Limit alternatives to make your choices easier.",
    "How to persuade someone to take the blame for your mistake.",
    "Who is more complicated gender: men or women?",
    "Should humans eat to live or live to eat?",
    "Do video games cause bad behavior in children?",
    "Should older women be allowed to marry younger men?",
    "Is it better to be honest and poor or dishonest and rich?",
    "Do nice girls finish last?",
    "Do nursery rhymes have secret interior meanings?",
    "What are the advantages of being a man over a woman?",
    "Which of these two are more real – pirates or ninjas?",
    "Do vampires get AIDS from sucking blood that is affected?",
    "Which is better: daydreaming or night dreaming?",
    "Do you think the United States will never have a woman President?",
    "Did God create the universe or did it just occur naturally?",
    "Do we have less face-to-face interaction because of Facebook?",
    "Is there life after death?",
    "Are we aliens of some sort?",
    "What are the best dating techniques out there?",
    "What are the advantages of bottled water vs. regular water?",
    "Which is a better show: Vampire Diaries or FRIENDS?",
    "What is the best pizza topping?",
    "Are Batman and Superman misleading idols?",
    "Which is better: Rock n Roll music or Hip Hop?",
    "Which is better: Harry Potter or Twilight?",
    "Which is the best season of the year?",
    "Is it better to date someone attractive and popular or intelligent and smart?",
    "Which is better to have as a pet: a cat or a dog?"];

exports.generateTopic = function () {
    return topics[Math.floor(Math.random() * topics.length)];
}