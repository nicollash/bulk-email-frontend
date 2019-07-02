import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

process.env.PUBLIC_URL = '';

expect.extend({
  toBeString(received) {
    const isString = typeof received === 'string' || received instanceof String;
    return isString
      ? {
        message: () => `expected ${received} to be string`,
        pass: true
      }
      : {
        message: () => `expected ${received} to be string`,
        pass: false
      };
  }
});
