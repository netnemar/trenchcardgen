
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [cardImage, setCardImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError('');
    setCardImage('');
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        avatarUrl: `https://unavatar.io/twitter/${username}`
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setCardImage(data.imageUrl);
    } else {
      setError(data.error || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>TrenchCardGen</h1>
      <input
        type="text"
        placeholder="Twitter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate My Ghibli Card</button>
      {loading && <p>Generating...</p>}
      {error && <p>{error}</p>}
      {cardImage && <img src={cardImage} alt="Ghibli Card" style={{ marginTop: 20 }} />}
    </div>
  );
}

export default App;
