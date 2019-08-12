import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import { Utils } from '../../utils/utils';

import 'react-bootstrap-typeahead/css/Typeahead.css';

class Select extends React.Component {
  // initialize state
  state = {
    options: [],
    values: [],
  };

  // MARK: - Event handlers

  handleFocus = (e) => {
    if (!this.props.allowNew) {
      this.setTypeHeadTextEmpty();
    }
  }

  handleBlur = (e) => {
    if (!this.props.allowNew) {
      this.setTypeHeadTextEmpty();
    }
  }

  handleChange = (e) => {
    const { multiple, validator } = this.props;

    if (e.length === 0 && !this.props.allowNew) {
      this.setTypeHeadTextEmpty();
    }

    if (validator) {
      if (!validator(e)) {
        e.pop();
      }
    }

    if (this.props.onChange) {
      let value;
      if (multiple) {
        // return label instead of id for new items
        value = e.map(i => i.customOption ? i.label : i.id);
      } else {
        // return label instead of id if new item is selected
        value = e.length > 0 ? e[ 0 ].customOption ? e[ 0 ].label : e[ 0 ].id : null;
      }

      this.props.onChange({ target: { value, name: this.props.name } });
    }
  }

  // MARK: - Methods

  resetState() {
    this.updateState(this.props);
  }

  updateState(props) {
    this.setTypeHeadTextEmpty();

    const options = Utils.coalesce(props.options, []).map(o => ({ id: o.value, label: o.text }));

    let values = [];
    if (props.value) {
      if (props.multiple && Array.isArray(props.value)) {
        values = props.value;
      } else {
        values = [ props.value ];
      }
    }

    this.setState({
      options,
      values,
    });
  }

  setTypeHeadTextEmpty() {
    if (this.typeahead) {
      this.typeahead.getInstance().setState({ text: '' });
    }
  }

  // MARK: - Lifecycle Methods

  componentDidMount() {
    this.resetState();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.options === nextProps.options &&
      this.props.value === nextProps.value
    ) {
      return;
    }

    this.updateState(nextProps);
  }

  render() {
    const { id, allowNew, disabled, multiple, newSelectionPrefix, placeholder } = this.props;
    const { options, values } = this.state;

    const selected = options.filter(o => values.find(v => v === o.id));

    return (
        <Typeahead
        id={ id }
        align="justify"
        allowNew={ allowNew }
        className="select"
        clearButton
        disabled={ disabled }
        multiple={ multiple }
        newSelectionPrefix={ newSelectionPrefix }
        options={ options }
        paginate={ true }
        placeholder={ placeholder }
        selected={ selected }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }
        onChange={ this.handleChange }
        ref={ e => this.typeahead = e } />
    );
  }
}

export default Select;