import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpandMore } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';


const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

class FilterCheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      options: this.props.options,
      category: this.props.category,
      values: this.props.values,
      searchInput: "",
      color: this.props.color ? this.props.color : 'black',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.values !== this.props.values) {
      let params = this.props.values;
      this.setState({
        values: params || '',
      });
    }
  }

  _onSelect = (category, value) => {
    this.props.onSelect(category,value);
  }

  handleChange = (e) =>{
    this.setState({
      searchInput: e.target.value
    })
  }

  render() {
    return (
      <div className="filter-wrapper">
           <ExpansionPanel className="expansion-panel-wrapper">
            <ExpansionPanelSummary className="expansion-panel-summary" expandIcon={<ExpandMore color={this.state.color} />}>
              <Typography>{this.state.title}</Typography>
            </ExpansionPanelSummary>
            <form className="filter-filter-wrapper">
              <input
                placeholder="Search..."
                value={this.state.searchInput}
                onChange={this.handleChange}
              />
            </form>
            <ExpansionPanelDetails className="filter-details">
              <Typography>
                <FormControl component="fieldset" className="field-set">
                  <FormGroup>
                      { this.props.options.filter((option) => {
                         return option.toLowerCase().includes(this.state.searchInput.toLowerCase())
                      }).map((opt, id) => (
                        <FormControlLabel
                          control={
                            <Checkbox disableRipple={true} color={this.state.color} className="checkbox-wrapper" onChange={(e) => this._onSelect(this.state.category, e.target.value)} value={opt} key={id}  checked={(this.state.values.indexOf(opt) > -1) ? true : false}/>
                          }
                          label={opt}
                          className="filter-item"
                        />
                       ))
                      }
                  </FormGroup>
                </FormControl>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
      </div>
    );
  }
}

export default FilterCheckBox;
// export default withStyles(styles)(FilterCheckBox);
