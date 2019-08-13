export class Utils {

  // MARK: - Utilities

  static coalesce() {
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[ i ] != null) {
        return arguments[ i ];
      }
    }

    return null;
  }

  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  static isEmpty(value) {
    return (value == null) || (value.length === 0);
  }

  static isNumeric(value) {
    return !Utils.isEmpty(value) && !isNaN(parseFloat(value)) && isFinite(value);
  }

  static isCSV(file) {
    return (file.name && file.name.toLowerCase().endsWith('.csv')) &&
      ((file.type && (file.type.includes('application/vnd.ms-excel') || file.type.includes('text/csv'))));
  }

  static tryParse(value, defaultValue) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return defaultValue;
    }
  }

  static toLowerCase(object) {
    if (Array.isArray(object)) {
      return object.map(e => Utils.toLowerCase(e));
    }

    if (typeof object !== 'object') {
      return object;
    }

    if (object === null) {
      return null;
    }

    if (object === undefined) {
      return undefined;
    }

    const result = {};

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        result[ key.charAt(0).toLowerCase() + key.slice(1) ] = Utils.toLowerCase(object[ key ]);
      }
    }

    return result;
  }

  static toUpperCase(object) {
    if (Array.isArray(object)) {
      return object.map(e => Utils.toUpperCase(e));
    }

    if (typeof object !== 'object') {
      return object;
    }

    if (object === null) {
      return null;
    }

    if (object === undefined) {
      return undefined;
    }

    const result = {};

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        result[ key.charAt(0).toUpperCase() + key.slice(1) ] = Utils.toUpperCase(object[ key ]);
      }
    }

    return result;
  }

  static toMap(items, key) {
    const result = new Map();

    if (items == null || key == null) {
      return result;
    }

    for (const item of items) {
      result.set(item[ key ], item);
    }

    return result;
  }

  static toMultiMap(items, key) {
    const result = new Map();

    if (items == null || key == null) {
      return result;
    }

    for (const item of items) {
      const values = Utils.coalesce(result.get(item[ key ]), []);
      values.push(item);
      result.set(item[ key ], values);
    }

    return result;
  }

  static toUnique(array) {
    return [ ...new Set(array) ]
  }
}