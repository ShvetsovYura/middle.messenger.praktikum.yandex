import { expect } from 'chai';
import fns from './help-functions';

describe('Тестируем функции-помощники', () => {
  it('isArray', () => {
    expect(fns.isArray([])).is.eq(true);
    expect(fns.isArray({})).is.eq(false);
    expect(fns.isArray([1, 3, 4, { result: 'hoho' }, []])).is.eq(true);
    expect(fns.isArray('string value')).is.not.eq(true);
  });

  it('get', () => {
    const obj = {
      one: {
        two: {
          three: 'result',
        },
      },
      arr: [1],
    };
    expect(fns.get(obj, 'one.two.three')).equal('result');
    expect(fns.get(obj, 'one.two.three.four', 'default')).equal('default');
    expect(fns.get(obj, 'one.two.tree.four')).equal(undefined);
  });

  it('isPlainObject', () => {
    expect(fns.isPlainObject({})).is.eq(true);
    expect(fns.isPlainObject([1])).is.eq(false);
    expect(fns.isPlainObject(null)).is.eq(false);
    expect(fns.isPlainObject(undefined)).is.eq(false);
    expect(fns.isPlainObject(new Date())).is.eq(false);
    expect(fns.isPlainObject({ arr: [] })).is.eq(true);
    expect(fns.isPlainObject('str')).is.eq(false);
  });

  it('isEqualObjects', () => {
    const obj = { one: { two: { three: 'meme' } } };

    expect(fns.isEqual(obj, obj)).is.eq(true);
    expect(fns.isEqual(obj, { ...obj })).is.eq(true);
    expect(fns.isEqual(obj, {})).is.eq(false);
    expect(fns.isEqual({}, obj)).is.eq(false);
    expect(fns.isEqual({}, {})).is.eq(true);
  });
});
