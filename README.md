# Game-FromBook-Js
A game from an old book on BBC BASIC, converted to JS

In conversation, my mother-in-law showed me a book on learning BBC BASIC. It hailed from
the days where one copied code out by hand from books and magazines to create games (aka my youth).
Back in the days where games included text-based adventure games (of which this is one).
While the language is no longer really in use, it occurred to me that it might be fun to 
try to create one of the games in a more modern language.

The game was entitled "Haunted House". The original code is very much not my work 
(I will credit it properly when I am able).

The original was an adventure game designed to run on a command line with various 
instructions typed in. This conversion runs in the browser, and has a 'screen'
division and an input prompt.

Where the original used a number of GOTO commands, I have replaced these with 
functions. BASIC commands are now methods of a 'basic' object.

This repo has the most literal translation of the original code I could come
up with, and has inspired me to create a more object-oriented version which I'm
playing around with at: 
[Game-WithMaps] (https://github.com/DaveStarmer/Game-WithMaps-JS)
