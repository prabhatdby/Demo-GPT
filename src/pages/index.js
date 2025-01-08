import ChatAi from './components/chatAi/chatAi'
import FormField from './components/formField/formField';
import { useState } from 'react';

function App() {

  const [selectedTab, setSelectedTab] = useState('tab1'); // Default tab is tab1

  const handleTabChange = (event) => {
    setSelectedTab(event.target.id); // Update the selected tab when clicked
  };
  return (
    <div className="page">
      <div className="pcss3t pcss3t-effect-scale pcss3t-theme-1">
        <input type="radio" name="pcss3t" id="tab1" className="tab-content-first" checked={selectedTab === 'tab1'}
          onChange={handleTabChange} />
        <label for="tab1"><i className="icon-comment"></i>Gev GPT</label>

        <input type="radio" name="pcss3t" id="tab2" className="tab-content-2" checked={selectedTab === 'tab2'}
          onChange={handleTabChange} />
        <label for="tab2"><i className="icon-bar-chart"></i>Risk Analysis</label>

        <input type="radio" name="pcss3t" id="tab3" checked={selectedTab === 'tab3'}
          onChange={handleTabChange} className="tab-content-3" />
        <label for="tab3"><i className="icon-file"></i>Document Analysis</label>

        <ul>
          <li className="tab-content tab-content-first typography">
            <ChatAi></ChatAi>
          </li>

          <li className="tab-content tab-content-2 typography">
              <FormField risk={true}></FormField>
          </li>

          <li className="tab-content tab-content-3 typography">
          <FormField></FormField>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;