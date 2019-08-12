import BEMHelper from 'react-bem-helper';
import pickBy from 'lodash/pickBy';

export const getBEMClasses = (...classes) => {
  classes = Array.prototype.concat(...classes).filter(item => item);

  const BEMClasses = classes.map(
    className =>
      new BEMHelper({
        name: className,
        outputIsString: true
      })
  );
  return (element, modifier) =>
    BEMClasses.map(BEMClass =>
      BEMClass(element, processModifiers(modifier))
    ).join(' ');
};

function processModifiers(modifiers) {
  return isObject(modifiers) ? pickBy(modifiers) : modifiers;
}

function isObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}

export const addModifier = (modifiers, newModifier) => {
  let result;

  if (Array.isArray(modifiers)) {
    result = [ newModifier, ...modifiers ];
  } else if (typeof modifiers === 'string') {
    result = [ newModifier, modifiers ];
  } else if (typeof modifiers === 'object') {
    result = modifiers;
    result[ newModifier ] = true;
  }

  return result;
};
