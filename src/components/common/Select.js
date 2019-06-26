import React from 'react';

import { Typeahead } from 'react-bootstrap-typeahead';

import { Utils } from '../../utils/utils';

import 'react-bootstrap-typeahead/css/Typeahead.css';

class Select extends React.Component {
    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            options: []
        };

        // bind events
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.options === nextProps.options) {
            return;
        }

        this.updateState(nextProps);
    }

    render() {
        const options = this.state.options;

        let values = [];
        if (this.props.value) {
            if (this.props.multiple) {
                values = this.props.value;
            }
            else {
                values = [this.props.value];
            }
        }

        const selected = options.filter(o => values.find(v => v === o.id));

        return (
            <Typeahead
                id={this.props.id}
                className="select"
                clearButton
                allowNew={this.props.allowNew}
                align="justify"
                multiple={this.props.multiple}
                options={options}
                paginate={true}
                placeholder={this.props.placeholder}
                selected={selected}
                disabled={this.props.disabled}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                newSelectionPrefix={this.props.newSelectionPrefix && this.props.newSelectionPrefix}
                ref={e => this.typeahead = e} />
        );
    }

    componentDidMount() {
        this.resetState();
    }


    // MARK: - Event handlers

    handleFocus(e) {
        this.setTypeHeadTextEmpty()
    }

    handleBlur(e) {
        this.setTypeHeadTextEmpty()
    }

    handleChange(e) {
        if (e.length === 0 && !this.props.allowNew) {
            this.typeahead.getInstance().focus();
        }

        if (this.props.validator) {
            if (!this.props.validator(e)) {
                e.pop();
                return this.updateState(this.props);
            }
        }

        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: this.props.multiple ? e.map(e => e.customOption ? e.label : e.id) : (e.length > 0 ? e[0].customOption ? e[0].label : e[0].id : null)
                }
            });
        }
    }


    // MARK: - Methods

    resetState() {
        this.updateState(this.props);
    }

    updateState(props) {
        if (this.typeahead) {
            this.typeahead.getInstance().setState({ text: "" });
        }

        this.setState({
            options: Utils.coalesce(props.options, []).map(o => ({ id: o.value, label: o.text }))
        });
    }

    setTypeHeadTextEmpty() {
        if (this.typeahead && !this.props.allowNew) {
            this.typeahead.getInstance().setState({ text: "" });
        }

        setTimeout(() => {
            if (this.typeahead && !this.props.allowNew) {
                this.typeahead.getInstance().setState({ text: "" });
            }
        }, 100);
    }
}

export default Select;