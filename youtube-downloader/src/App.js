import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setDownloading(true);
    setError('');
    try {
      const response = await axios({
        method: 'get',
        url: 'https://video-downloader-be.onrender.com/download',
        params: { url },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'video/mp4' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'video.mp4';
      link.click();
    } catch (error) {
      setError('Error downloading the video. Please check the URL and try again.');
      console.error('Error downloading the video', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">YouTube Video Downloader</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="mb-2 input-url"
          />
        </Form.Group>
        <br></br>
        <Button onClick={handleDownload} disabled={downloading} className="btn-download">
          {downloading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              {' '}Downloading...
            </>
          ) : (
            'Download'
          )}
        </Button>
      </Form>
      <footer>
        <p>
          <big>
            Made with <i className="fas fa-heart text-danger"></i> by Yasantha Mihiran
          </big>

        </p>
        <p>
        <small>
            Disclaimer: This application is for educational purposes only. <br></br>Downloading copyrighted material may be illegal in your country. <br></br>Please use this application responsibly.
          </small>
        </p>
      </footer>
    </Container>
  );
}

export default App;
