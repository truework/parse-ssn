import test from 'ava';
import * as ssn from './index';

test(`clean: removes characters`, async t => {
  t.is(ssn.clean('123-12-1234'), '123121234');
  t.is(ssn.clean('123*12*1234'), '123121234');
  t.is(ssn.clean('123abcde123'), '123123');
})

test(`clean: trims to 9 or less`, async t => {
  t.is(ssn.clean('123abcde123123123'), '123123123');
})

test(`clean: exceptions option works`, async t => {
  t.is(ssn.clean('123abcde123', 'ab'), '123ab123');
  t.is(ssn.clean('-----1234', '-'), '-----1234');
})

test(`format: defaults work`, async t => {
  t.is(ssn.format('123121234'), '123-12-1234');
})

test(`format: can pass optional separator`, async t => {
  t.is(ssn.format('123121234', ' '), '123 12 1234');
})

test(`format: doesn't fail with bad values`, async t => {
  t.is(ssn.format('12312', ' '), '123 12');
  t.is(ssn.format('1231212', ' '), '123 12 12');
  t.is(ssn.format(' 123 1212', ' '), '123 12 12');
})

test(`format: can format masked values`, async t => {
  t.is(ssn.format('*****1234'), '***-**-1234');
  t.is(ssn.format('-----1234', '-', '-'), '-------1234');
})

test(`mask: works with defaults`, async t => {
  t.is(ssn.mask('123121234'), '*****1234');
})

test(`mask: can pass optional placeholder`, async t => {
  t.is(ssn.mask('123121234', '-'), '-----1234');
})

test(`validate`, async t => {
  // valid
  t.is(ssn.validate('123121234'), true);

  // area
  t.is(ssn.validate('000121234'), false);
  t.is(ssn.validate('666121234'), false);
  t.is(ssn.validate('900121234'), false);
  t.is(ssn.validate('901121234'), false);
  t.is(ssn.validate('700121234'), true);
  t.is(ssn.validate('800121234'), true);

  // group
  t.is(ssn.validate('123001234'), false);

  // serial
  t.is(ssn.validate('123120000'), false);
  t.is(ssn.validate('123120001'), true);

  // length
  t.is(ssn.validate('12312123'), false);
  t.is(ssn.validate('1231212345'), false);

  // with formatting
  t.is(ssn.validate('123-12-1234'), true);
  t.is(ssn.validate('123 12 1234', ' '), true);
  t.is(ssn.validate('123-12-12345'), false);
  t.is(ssn.validate('12-312-1234'), false);
})
