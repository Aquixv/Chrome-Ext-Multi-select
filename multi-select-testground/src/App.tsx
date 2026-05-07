import { useMultiSelect } from './hooks/UseMultiSelect';
import './App.css';

interface HistoryEntry {
  id: string;
  time: string;
  title: string;
  url: string;
  domain: string;
}

const mockHistoryData: HistoryEntry[] = [
  { id: '1', time: '10:30 AM', title: 'React Documentation - Hooks', url: 'https://reactjs.org/docs/hooks-intro.html', domain: 'reactjs.org' },
  { id: '2', time: '10:15 AM', title: 'TypeScript: Typed JavaScript at Any Scale', url: 'https://www.typescriptlang.org/', domain: 'typescriptlang.org' },
  { id: '3', time: '09:45 AM', title: 'How to build a Chrome Extension', url: 'https://developer.chrome.com/docs/extensions/', domain: 'developer.chrome.com' },
  { id: '4', time: '09:30 AM', title: 'GitHub - ffxkuro/popcart', url: 'https://github.com/ffxkuro/popcart', domain: 'github.com' },
  { id: '5', time: '09:00 AM', title: 'Stack Overflow - Where Developers Learn', url: 'https://stackoverflow.com/', domain: 'stackoverflow.com' },
];

function App() {
  const historyIds = mockHistoryData.map(entry => entry.id);
  const { selectedIds, toggleItem, isSelected } = useMultiSelect(historyIds);

  const handleDeleteSelected = () => {
    alert(`Deleting ${selectedIds.length} items from history...`);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>History</h2>
        {selectedIds.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedIds.length} selected</span>
            <button className="btn-delete" onClick={handleDeleteSelected}>
              Delete
            </button>
            <button className="btn-cancel" onClick={() => {}}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="history-list">
        <div className="history-date-group">Today - May 7, 2026</div>
        
        <ul>
          {mockHistoryData.map((entry) => (
            <li 
              key={entry.id}
              className={`history-item ${isSelected(entry.id) ? 'selected' : ''}`}
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName !== 'A') {
                  toggleItem(entry.id, e.shiftKey);
                }
              }}
            >
              <div className="item-checkbox">
                <input 
                  type="checkbox" 
                  checked={isSelected(entry.id)}
                  readOnly
                />
              </div>
              <div className="item-time">{entry.time}</div>
              <div className="item-favicon"></div>
              <div className="item-details">
                <a href={entry.url} className="item-title" onClick={(e) => e.preventDefault()}>
                  {entry.title}
                </a>
                <span className="item-domain">{entry.domain}</span>
              </div>
              <button className="item-menu-btn">⋮</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;