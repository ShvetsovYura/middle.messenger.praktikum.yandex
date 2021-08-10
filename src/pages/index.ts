import render from '../utils/render';
import Label from '../components/ui/label/label';
import Input from '../components/ui/input';

const btn = new Input({
  id: 'dsdf',
  initValue: 'meme',
  events: {
    input: (e: Event) => console.log(e.target?.value),
  },
});

render('#app', btn);
