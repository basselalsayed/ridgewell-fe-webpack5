import example from './images/example.png';
import './styles/main.scss';

class Game {
  name = 'Violin Charades';
}
const myGame = new Game();
// Create paragraph node
const p = document.createElement('p');
p.textContent = `I like ${myGame.name}.`;

const heading = document.createElement('h1');
heading.textContent = 'Welcome!';

var root = document.querySelector('#root');

root.append(heading, p);
