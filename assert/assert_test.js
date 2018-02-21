const assert = require('assert');

// assert.ok / assert
assert.ok(false, '当 \'false == true 失败\'的时候此处是报错信息');
assert(false, '当 \'false == true 失败\'的时候此处是报错信息');

// assert.deepEqual 只可测试自身可枚举属性 (==)

const deepEqual1 = {
    a: {
      b: 1
    }
  };
  const deepEqual2 = {
    a: {
      b: 2
    }
  };
  const deepEqual3 = {
    a: {
      b: 1
    }
  };
  const deepEqual4 = Object.create(deepEqual1);
  assert.deepEqual(deepEqual1, deepEqual1);
  // 测试通过，对象与自身相等。

  assert.deepEqual(deepEqual1, deepEqual2, 'error message');
  // 抛出 AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }
  // 因为 b 属性的值不同。

  assert.deepEqual(deepEqual1, deepEqual3);
  // 测试通过，两个对象相等。

  assert.deepEqual(deepEqual1, deepEqual4);
  // 抛出 AssertionError: { a: { b: 1 } } deepEqual {}
  // 因为不测试原型。

  // assert.equal() (==)
  // assert.deepStrictEqual (===)会考虑原型 考虑标签名称 考虑包装器()里面的东西是否相同

  // assert.doesNotThrow(function, ...error, ...message)
  assert.doesNotThrow(
    () => {
      throw new TypeError('错误信息');
    },
    SyntaxError,
    '类型不匹配'
  ); // 不会报错，typeerror 与 syntaxerror 类型不符 不抛出错误

  assert.doesNotThrow(
    () => {
      throw new TypeError('错误信息');
    },
    TypeError,
    '类型不匹配'
  ); // 抛出'类型不匹配'
// assert.fail(a,b,...message,...operator); 如果不相等，抛出message,没有则抛出 a operator b
assert.fail(1, 2, undefined,'not equal to');
// 1 not equal to 2
assert.fail(1, 2, undefined);
// undefined
assert.fail(1, 2);
// 'a' != 'b'   '!=' 默认启用


// assert.ifError（value）如果value为真，则抛出value 测试callback 的 err 回参是否为空
assert.ifError(0);
// 测试通过。
assert.ifError(1);
// 抛出 1。

// 重复或意义反向的
// assert.notDeepEqual
// assert.notDeepStrictEqual
// assert.notEqual
// assert.notStrictEqual


// assert.throws(function,...reg/func,...message) 断言function，reg/func进行过滤, message作为function无错误的通知
assert.throws(
    () => {
      throw new Error('错误信息');
    },
    function(err) {
      if ((err instanceof Error) && /错误/.test(err)) {
        return true;
      }
    },
    '不是期望的错误'
  );