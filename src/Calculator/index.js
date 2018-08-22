import React, {Component} from 'react';
import MysticismIcon from '../assets/images/Mysticism.png';
import ConstructionIcon from '../assets/images/Construction.png';
import AdventureIcon from '../assets/images/Adventuring.png';
import InventionIcon from '../assets/images/Invention.png';
import Styled from 'styled-components';

// setter
// localStorage.setItem('myData', data);

// // getter
// localStorage.getItem('myData');

// remove
// localStorage.removeItem(key);

const IconWrap = Styled.div`
    border: 2px solid transparent;
    background-clip: padding-box,border-box;
    background-origin: padding-box,border-box;
    background-image: linear-gradient(#fff,#fff),linear-gradient(#86653c,#8e342c);
    display: inline-block;
    width: 48px;
    height: 48px;
`;

const ResearchHeading = Styled.div`
  text-align: center;
`;

const DefaultResearchSettings = [
  {
    name: 'Mysticism',
    requiredSparks: 5,
    percentPerResearch: 1,
    icon: MysticismIcon,
  },
  {
    name: 'Construction',
    requiredSparks: 10,
    percentPerResearch: 1,
    icon: ConstructionIcon,
  },
  {
    name: 'Adventuring',
    requiredSparks: 5,
    percentPerResearch: 1,
    icon: AdventureIcon,
  },
  {
    name: 'Invention',
    requiredSparks: 8,
    percentPerResearch: 1,
    icon: InventionIcon,
  },
];

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      research: DefaultResearchSettings,
      currentPercent: 0,
      selectedResearch: 0,
      sparksNeeded: null,
      workItemName: '',
      workItems: [],
    };
  }

  render() {
    const {
      research,
      currentPercent,
      selectedResearch,
      sparksNeeded,
      workItemName,
      workItems,
    } = this.state;

    return (
      <div className="workspace">
        {workItems.length ? (
          <div className="workItems">
            <h3>Workspace Items</h3>
            {workItems.map((item, i) => {
              return (
                <div>
                  {item.name}: {item.amount}
                </div>
              );
            })}
          </div>
        ) : null}
        <div className="workingspace">
          <div className="researchSettings">
            {research.map((research, i) => {
              return (
                <div key={i}>
                  <ResearchHeading>
                    <IconWrap>
                      <img src={research.icon} alt="Logo" />
                    </IconWrap>
                    <h3>{research.name}</h3>
                  </ResearchHeading>
                  <div>
                    <label>Required Sparks Per Research</label>
                    <div className="field">
                      <input
                        type="number"
                        name={`${research.name} requiredSparks`}
                        min="0"
                        value={research.requiredSparks}
                        onChange={e => this.updateResearchField(e, research.name, 'requiredSparks')}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Percentage Gained Per Research</label>
                    <div className="field">
                      <input
                        type="number"
                        name={`${research.name} percentPerResearch`}
                        min="0"
                        value={research.percentPerResearch}
                        onChange={e =>
                          this.updateResearchField(e, research.name, 'percentPerResearch')
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr />
          <h3>Select Your Research Type</h3>
          <div className="field">
            <select value={selectedResearch} onChange={e => this.selectResearch(e)}>
              {research.map((research, i) => {
                return (
                  <option key={i} value={i}>
                    {research.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>Current Research Percentage</label>
            <div className="field">
              <input
                type="number"
                name="currentPercent"
                min="0"
                value={currentPercent}
                onChange={e => this.updatePercentField(e)}
              />
            </div>
          </div>

          {sparksNeeded ? (
            <div>
              <h1>{sparksNeeded} Sparks Required</h1>

              <h3>Save to WorkLog</h3>

              <div>
                <label>Work Item Name</label>
                <div className="field">
                  <input
                    type="text"
                    name="workItemName"
                    value={workItemName}
                    onChange={e => this.updateField(e)}
                  />
                </div>
              </div>

              <button type="button" onClick={this.saveWorkItem}>
                Save Work Item
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  updateResearchField = (e, typeOfResearch, field) => {
    const {research} = this.state;
    const cloneResearch = [...research];

    const researchToEdit = cloneResearch.find(research => research.name === typeOfResearch);

    researchToEdit[field] = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

    this.setState({research: cloneResearch, currentPercent: 0, sparksNeeded: null});
  };

  updatePercentField = e => {
    const {selectedResearch, research} = this.state;

    const currentResearch = research[selectedResearch];

    const currentPercentage = e.target.value;

    const sparksNeeded = this.getSparksNeeded(currentPercentage, currentResearch);

    this.setState({[e.target.name]: Number(e.target.value), sparksNeeded});
  };

  updateField = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  selectResearch = e => {
    this.setState({selectedResearch: Number(e.target.value)});
  };

  getSparksNeeded(currentPercentage, currentResearch) {
    const missingPercent = 100 - currentPercentage;
    const percentPerMissing = missingPercent / currentResearch.percentPerResearch;
    const sparksNeeded = Math.ceil(percentPerMissing * currentResearch.requiredSparks);
    return sparksNeeded;
  }

  saveWorkItem = () => {
    const {sparksNeeded, workItemName, workItems} = this.state;
    const workItem = {name: workItemName, amount: sparksNeeded};
    const cloneWorkItems = [...workItems, workItem];
    this.setState({workItems: cloneWorkItems});
  };
}
