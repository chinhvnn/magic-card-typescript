import Card from '../../components/Card';

const instance = new Card(
  1,
  100,
  100,
  'up',
  'effect',
  { id: 1, name: 'des', type: 'heal', description: '13' },
  'atk',
);

test('test Card.ts - changePosition()', () => {
  jest.spyOn(instance, 'changePosition');
  instance.changePosition('def');
  expect(instance.position).toEqual('def');
  expect(true).toEqual(true);
});
