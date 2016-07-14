/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var KISS_FACTS = [
    "The insulting slang kiss my ass dates back at least to 1705.",
    "Lips are 100 times more sensitive than the tips of the fingers. Not even genitals have as much sensitivity as lips.",
    "Approximately two-thirds of people tip their head to the right when they kiss. Some scholars speculate this preference starts in the womb.",
    "On July 5-6, 2005 a couple in London locked lips for 31 hours, 30 minutes, and 30 seconds, making it the longest kiss ever recorded.",
    "The most important muscle in kissing is the orbicularis oris, also known as the kissing muscle, which allows the lips to pucker.",
    "French kissing involves all 34 muscles in the face. A pucker kiss involves only two.",
    "The lips of both men and women resemble the lips of the vagina.",
    " The term French kiss came into the English language around 1923 as a slur on the French culture which was thought to be overly concerned with sex. In France, it’s called a tongue kiss or soul kiss because if done right, it feels as if two souls are merging. In fact, several ancient cultures thought that mouth-to-mouth kissing mingled two lovers souls.",
    "Passionate kissing burns 6.4 calories a minute. A Hershey’s kiss contains 26 calories, which takes five minutes of walking or about four minutes of kissing to burn off.",
    "It is possible for a woman to reach an orgasm through kissing.",
    "Mechanically speaking, kissing is almost identical to suckling. Some scholars speculate that the way a person kisses may reflect whether he or she was breastfed or bottle fed.",
    "Kissing is good for teeth. The anticipation of a kiss increases the flow of saliva to the mouth, giving the teeth a plaque-dispersing bath.",
    "Scholars are unsure if kissing is a learned or instinctual behavior. In some cultures in Africa and Asia, kissing does not seem to be practiced.",
    "Xs at the end of a correspondence letter represent the contact of the lips during a kiss.",
    "When you kiss someone for the first time, you get a spike in the neurotransmitter dopamine, making you crave more. Dopamine can also make you lose your appetite and make it hard for you sleep.",
    "Kissing helps us work out if someone is a good match.",
    "When you kiss someone your heart beats faster and more oxygen reaches your brain.",
    "Kissing makes your pupils dilate.",
    "Endorphin released during kissing bring on woes of euphoria.",
    "Kissing triggers the the release of oxytocin and endorphins in your body. Making out is going to get you feeling happy and positive and less stressed.",
    "The world record for longest kiss stands at well over two days.",
    "Goodbye kisses help spouses live longer.",
    "Kissing is healthy for you, it can even make you live longer.",
    "The study of kissing is called philematology.",
    "A typical French Kiss moves 29 muscles in the face.",
    "Our brains have special neurons that help us find each other's lips in the dark."
];


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SunKiss = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SunKiss.prototype = Object.create(AlexaSkill.prototype);
SunKiss.prototype.constructor = SunKiss;

SunKiss.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SunKiss onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SunKiss.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SunKiss onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SunKiss.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SunKiss onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};
SunKiss.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Sun Kiss tell me a kiss fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * KISS_FACTS.length);
    var fact = KISS_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your kiss fact: " + fact;

    response.tellWithCard(speechOutput, "SunKiss", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var sunKiss = new SunKiss();
   sunKiss.execute(event, context);
};

